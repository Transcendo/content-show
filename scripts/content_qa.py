#!/usr/bin/env python3
"""Lightweight content QA for content-show docs.

Checks:
- thin/blank MDX pages
- duplicate routes
- internal Markdown links that do not resolve to a docs route or local asset
- meta.json page references that do not have a matching .mdx file
- glossary detail-page, slug, meta.json, and relatedTerms consistency

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
GLOSSARY = ROOT / "lib" / "ai-glossary.ts"


def extract_balanced_block(text: str, marker: str, opener: str = "{") -> str:
    start = text.find(marker)
    if start < 0:
        raise ValueError(f"missing marker: {marker}")
    equal_at = text.find("=", start)
    search_from = equal_at if equal_at >= 0 else start
    open_at = text.find(opener, search_from)
    if open_at < 0:
        raise ValueError(f"missing opener after marker: {marker}")
    closer = "}" if opener == "{" else "]"
    depth = 0
    quote: str | None = None
    escaped = False
    for index in range(open_at, len(text)):
        char = text[index]
        if quote:
            if escaped:
                escaped = False
            elif char == "\\":
                escaped = True
            elif char == quote:
                quote = None
            continue
        if char in ('"', "'", "`"):
            quote = char
        elif char == opener:
            depth += 1
        elif char == closer:
            depth -= 1
            if depth == 0:
                return text[open_at + 1 : index]
    raise ValueError(f"unterminated block after marker: {marker}")


def split_top_level_objects(block: str) -> list[str]:
    objects: list[str] = []
    depth = 0
    start: int | None = None
    quote: str | None = None
    escaped = False
    for index, char in enumerate(block):
        if quote:
            if escaped:
                escaped = False
            elif char == "\\":
                escaped = True
            elif char == quote:
                quote = None
            continue
        if char in ('"', "'", "`"):
            quote = char
        elif char == "{":
            if depth == 0:
                start = index
            depth += 1
        elif char == "}":
            depth -= 1
            if depth == 0 and start is not None:
                objects.append(block[start : index + 1])
                start = None
    return objects




def split_top_level_map_objects(block: str) -> list[tuple[str, str]]:
    entries: list[tuple[str, str]] = []
    index = 0
    while index < len(block):
        key_match = re.search(r"(?:([A-Za-z0-9_./+-]+)|([\"`])(.+?)\2)\s*:\s*\{", block[index:], re.S)
        if not key_match:
            break
        key = key_match.group(1) or key_match.group(3)
        open_at = index + key_match.end() - 1
        depth = 0
        quote: str | None = None
        escaped = False
        for cursor in range(open_at, len(block)):
            char = block[cursor]
            if quote:
                if escaped:
                    escaped = False
                elif char == "\\":
                    escaped = True
                elif char == quote:
                    quote = None
                continue
            if char in ('"', "'", "`"):
                quote = char
            elif char == "{":
                depth += 1
            elif char == "}":
                depth -= 1
                if depth == 0:
                    entries.append((key, block[open_at + 1 : cursor]))
                    index = cursor + 1
                    break
        else:
            break
    return entries

def parse_string_array(raw: str) -> list[str]:
    return re.findall(r'["`]([^"`]+)["`]', raw)


def parse_object_string_prop(block: str, prop: str) -> str | None:
    match = re.search(rf"\b{re.escape(prop)}\s*:\s*([\"`])(.+?)\1", block, re.S)
    if not match:
        return None
    return match.group(2)


def parse_object_array_prop(block: str, prop: str) -> list[str]:
    match = re.search(rf"\b{re.escape(prop)}\s*:\s*\[(.*?)\]", block, re.S)
    if not match:
        return []
    return parse_string_array(match.group(1))


def slugify_glossary_term(term: str, overrides: dict[str, str]) -> str:
    if term in overrides:
        return overrides[term]
    slug = re.sub(r"[^a-z0-9]+", "-", term.lower())
    return slug.strip("-")


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



def check_glossary_consistency() -> list[str]:
    problems: list[str] = []
    if not GLOSSARY.exists():
        return [f"missing glossary source: {GLOSSARY.relative_to(ROOT)}"]

    try:
        source = GLOSSARY.read_text(encoding="utf-8")
        categories_block = extract_balanced_block(source, "export const glossaryCategories", "[")
        overrides_block = extract_balanced_block(source, "const glossarySlugOverrides")
        core_config_block = extract_balanced_block(source, "const coreTermConfig")
        terms_block = extract_balanced_block(source, "export const glossaryTerms", "[")
    except Exception as exc:
        return [f"{GLOSSARY.relative_to(ROOT)}: cannot parse glossary data: {exc}"]

    categories = {
        category
        for category in re.findall(r"\bid\s*:\s*([\"`])(.+?)\1", categories_block, re.S)
        for category in [category[1]]
    }

    overrides = {}
    for match in re.finditer(
        r"(?:([A-Za-z0-9_./+-]+)|([\"`])(.+?)\2)\s*:\s*([\"`])(.+?)\4",
        overrides_block,
        re.S,
    ):
        overrides[match.group(1) or match.group(3)] = match.group(5)

    detail_config_terms = set()
    for term, body in split_top_level_map_objects(core_config_block):
        if re.search(r"\bhasDetailPage\s*:\s*true\b", body):
            detail_config_terms.add(term)

    term_objects = split_top_level_objects(terms_block)
    terms: dict[str, dict[str, object]] = {}
    slugs: dict[str, str] = {}
    for item in term_objects:
        term = parse_object_string_prop(item, "term")
        if not term:
            problems.append(f"{GLOSSARY.relative_to(ROOT)}: glossary item missing term")
            continue
        if term in terms:
            problems.append(f"{GLOSSARY.relative_to(ROOT)}: duplicate glossary term '{term}'")
            continue
        category = parse_object_string_prop(item, "category")
        explicit_slug = parse_object_string_prop(item, "slug")
        slug = explicit_slug or slugify_glossary_term(term, overrides)
        inline_has_detail = re.search(r"\bhasDetailPage\s*:\s*true\b", item) is not None
        has_detail = inline_has_detail or term in detail_config_terms
        related = parse_object_array_prop(item, "relatedTerms")
        terms[term] = {
            "category": category,
            "slug": slug,
            "has_detail": has_detail,
            "related": related,
        }

        if not category or category not in categories:
            problems.append(f"{GLOSSARY.relative_to(ROOT)}: term '{term}' has unknown category '{category}'")
        if slug in slugs:
            problems.append(
                f"{GLOSSARY.relative_to(ROOT)}: duplicate glossary slug '{slug}' for '{slugs[slug]}' and '{term}'"
            )
        slugs[slug] = term

    for term, data in terms.items():
        for related in data["related"]:  # type: ignore[index]
            if related not in terms:
                problems.append(f"{GLOSSARY.relative_to(ROOT)}: '{term}' relatedTerms references missing term '{related}'")

    glossary_dir = DOCS / "glossary"
    meta_path = glossary_dir / "meta.json"
    try:
        meta_pages = json.loads(meta_path.read_text(encoding="utf-8")).get("pages", [])
    except Exception as exc:
        problems.append(f"{meta_path.relative_to(ROOT)}: invalid JSON: {exc}")
        meta_pages = []
    meta_slugs = {page for page in meta_pages if isinstance(page, str) and page != "index"}
    detail_slugs = {data["slug"] for data in terms.values() if data["has_detail"]}  # type: ignore[misc]
    file_slugs = {path.stem for path in glossary_dir.glob("*.mdx") if path.stem != "index"}

    for slug in sorted(detail_slugs):
        if slug not in file_slugs:
            problems.append(f"{GLOSSARY.relative_to(ROOT)}: hasDetailPage slug '{slug}' has no content/docs/glossary/{slug}.mdx")
        if slug not in meta_slugs:
            problems.append(f"{meta_path.relative_to(ROOT)}: missing detail slug '{slug}'")
    for slug in sorted(meta_slugs - detail_slugs):
        problems.append(f"{meta_path.relative_to(ROOT)}: slug '{slug}' is listed but no glossary term hasDetailPage=true")
    for slug in sorted(file_slugs - detail_slugs):
        problems.append(f"content/docs/glossary/{slug}.mdx exists but no glossary term hasDetailPage=true")

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
    glossary_problems = check_glossary_consistency()

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
        ("Glossary consistency problems", glossary_problems),
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
    print("\nPASS: no duplicate routes, broken internal links, bad route slugs, broken meta references, or glossary consistency problems.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
