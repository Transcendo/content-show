#!/usr/bin/env python3
"""Lightweight content QA for content-show docs.

Checks:
- thin/blank MDX pages
- duplicate routes
- internal Markdown links that do not resolve to a docs route or local asset
- meta.json page references that do not have a matching .mdx file

This script is intentionally dependency-free so it can run before the JS toolchain is healthy.
"""

from __future__ import annotations

import json
import re
import sys
from dataclasses import dataclass
from pathlib import Path
from urllib.parse import unquote, urlparse

ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / "content" / "docs"
PUBLIC = ROOT / "public"

THIN_CHARS = 600
VERY_THIN_CHARS = 260

LINK_RE = re.compile(r"(?<!!\[)\[[^\]\n]+\]\(([^)\s]+)(?:\s+\"[^\"]*\")?\)")
HTML_HREF_RE = re.compile(r"(?:href|src)=['\"]([^'\"]+)['\"]")
FRONTMATTER_RE = re.compile(r"^---\s*\n(.*?)\n---\s*\n", re.S)
CODEBLOCK_RE = re.compile(r"```.*?```", re.S)
MDX_COMMENT_RE = re.compile(r"\{\/\*.*?\*\/\}", re.S)
MARKUP_RE = re.compile(r"<[^>]+>")
ROUTE_SEGMENT_RE = re.compile(r"^[a-z0-9][a-z0-9-]*$")


@dataclass
class Page:
    path: Path
    rel: Path
    route: str
    body: str
    chars: int


def strip_frontmatter(text: str) -> tuple[dict[str, str], str]:
    match = FRONTMATTER_RE.match(text)
    if not match:
        return {}, text
    raw = match.group(1)
    data: dict[str, str] = {}
    for line in raw.splitlines():
        if ":" not in line:
            continue
        key, value = line.split(":", 1)
        data[key.strip()] = value.strip().strip('"').strip("'")
    return data, text[match.end() :]


def route_for(path: Path) -> str:
    rel = path.relative_to(DOCS).with_suffix("")
    parts = list(rel.parts)
    if parts[-1] == "index":
        parts = parts[:-1]
    if not parts:
        return "/"
    return "/" + "/".join(parts)


def normalize_route(value: str, current_route: str | None = None) -> str | None:
    parsed = urlparse(value)
    if parsed.scheme or parsed.netloc or value.startswith(("mailto:", "tel:", "javascript:")):
        return None
    path = unquote(parsed.path)
    if not path:
        return None
    if path.startswith("/"):
        route = path
    else:
        base_parts = [] if current_route in (None, "/") else current_route.strip("/").split("/")[:-1]
        for part in path.split("/"):
            if part in ("", "."):
                continue
            if part == "..":
                if base_parts:
                    base_parts.pop()
                continue
            base_parts.append(part)
        route = "/" + "/".join(base_parts)
    route = route.replace("\\", "/")
    for suffix in (".mdx", ".md", ".html"):
        if route.endswith(suffix):
            route = route[: -len(suffix)]
    if route != "/":
        route = route.rstrip("/")
    return route or "/"


def local_file_target_exists(raw: str, page_path: Path) -> bool:
    parsed = urlparse(raw)
    if parsed.scheme or parsed.netloc:
        return True
    path = unquote(parsed.path)
    if not path:
        return True
    if path.startswith("/"):
        candidates = [ROOT / path.lstrip("/"), PUBLIC / path.lstrip("/")]
    else:
        candidates = [(page_path.parent / path).resolve()]
    for candidate in candidates:
        try:
            candidate.relative_to(ROOT)
        except ValueError:
            continue
        if candidate.exists():
            return True
    return False


def text_chars(body: str) -> int:
    text = CODEBLOCK_RE.sub("", body)
    text = MDX_COMMENT_RE.sub("", text)
    text = MARKUP_RE.sub("", text)
    # Count CJK chars and latin/digit tokens as meaningful content.
    cjk = re.findall(r"[\u4e00-\u9fff]", text)
    latin_digit_tokens = re.findall(r"[A-Za-z0-9][A-Za-z0-9_+-]*", text)
    return len(cjk) + sum(len(t) for t in latin_digit_tokens)


def is_local_asset(route: str) -> bool:
    if route.startswith("/_next"):
        return True
    candidate = PUBLIC / route.lstrip("/")
    return candidate.exists()


def collect_pages() -> list[Page]:
    pages: list[Page] = []
    for path in sorted(DOCS.rglob("*.mdx")):
        raw = path.read_text(encoding="utf-8")
        _, body = strip_frontmatter(raw)
        pages.append(
            Page(
                path=path,
                rel=path.relative_to(ROOT),
                route=route_for(path),
                body=body,
                chars=text_chars(body),
            )
        )
    return pages


def check_meta_references() -> list[str]:
    problems: list[str] = []
    for meta_path in sorted(DOCS.rglob("meta.json")):
        try:
            data = json.loads(meta_path.read_text(encoding="utf-8"))
        except Exception as exc:
            problems.append(f"{meta_path.relative_to(ROOT)}: invalid JSON: {exc}")
            continue
        pages = data.get("pages", [])
        if not isinstance(pages, list):
            problems.append(f"{meta_path.relative_to(ROOT)}: pages must be a list")
            continue
        for item in pages:
            if not isinstance(item, str) or item.startswith("---"):
                continue
            if item in ("index", "README"):
                candidates = [meta_path.parent / "index.mdx"]
            else:
                candidates = [meta_path.parent / f"{item}.mdx", meta_path.parent / item / "index.mdx"]
            if not any(candidate.exists() for candidate in candidates):
                expected = " or ".join(str(candidate.relative_to(ROOT)) for candidate in candidates)
                problems.append(
                    f"{meta_path.relative_to(ROOT)}: pages item '{item}' has no {expected}"
                )
    return problems


def main() -> int:
    if not DOCS.exists():
        print(f"ERROR: missing docs dir: {DOCS}")
        return 2

    pages = collect_pages()
    routes: dict[str, Path] = {}
    duplicate_routes: list[str] = []
    for page in pages:
        if page.route in routes:
            duplicate_routes.append(
                f"{page.route}: {routes[page.route].relative_to(ROOT)} and {page.rel}"
            )
        routes[page.route] = page.path

    thin = [p for p in pages if p.chars < THIN_CHARS]
    very_thin = [p for p in pages if p.chars < VERY_THIN_CHARS]

    broken_links: list[str] = []
    for page in pages:
        links = [m.group(1) for m in LINK_RE.finditer(page.body)]
        links += [m.group(1) for m in HTML_HREF_RE.finditer(page.body)]
        for raw in links:
            route = normalize_route(raw, page.route)
            if route is None:
                continue
            if local_file_target_exists(raw, page.path):
                continue
            if route.startswith("#"):
                continue
            if route in routes or is_local_asset(route):
                continue
            broken_links.append(f"{page.rel}: {raw} -> {route}")

    bad_segments: list[str] = []
    for page in pages:
        for segment in page.route.strip("/").split("/"):
            if segment and not ROUTE_SEGMENT_RE.match(segment):
                bad_segments.append(f"{page.rel}: route segment '{segment}' is not lowercase-kebab")

    meta_problems = check_meta_references()

    print("content-show docs QA")
    print(f"pages: {len(pages)}")
    print(f"thin pages < {THIN_CHARS} chars: {len(thin)}")
    print(f"very thin pages < {VERY_THIN_CHARS} chars: {len(very_thin)}")
    if thin:
        print("\nTop thin pages:")
        for page in sorted(thin, key=lambda p: p.chars)[:30]:
            print(f"- {page.chars:4d} {page.rel} -> {page.route}")

    sections = [
        ("Duplicate routes", duplicate_routes),
        ("Broken internal links/assets", broken_links),
        ("Bad route segments", bad_segments),
        ("meta.json problems", meta_problems),
    ]
    failed = False
    for title, items in sections:
        if not items:
            continue
        print(f"\n{title} ({len(items)}):")
        for item in items[:80]:
            print(f"- {item}")
        if len(items) > 80:
            print(f"... {len(items) - 80} more")
        failed = True

    if failed:
        print("\nFAIL: fix structural QA problems above.")
        return 1

    if very_thin:
        print("\nWARN: very thin pages remain. This does not fail the build yet, but it is content debt.")
    print("\nPASS: no duplicate routes, broken internal links, bad route slugs, or broken meta references.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
