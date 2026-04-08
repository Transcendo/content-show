import Link from 'next/link';
import { AsiStoryCardView } from '@/components/asi-export/asi-story-card';
import { ExportActions } from '@/components/asi-export/export-actions';
import { asiStoryCards } from '@/lib/asi-export/cards';

export default function AsiExportPage() {
  return (
    <main className="min-h-screen bg-neutral-100 text-black">
      <div className="mx-auto max-w-[1320px] px-6 py-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.22em] text-black/50">AI Card Export Lab</p>
            <h1 className="text-3xl font-semibold tracking-[-0.03em]">ASI Story Cards</h1>
            <p className="max-w-2xl text-sm text-black/65">
              这是 ASI 页面专用的 curated 导出模式。每张卡固定 600×800，可单独下载，也可按顺序连续发布。
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link className="rounded-md border px-3 py-2 text-sm hover:bg-white" href="/docs/ai-card/asi">
              返回正文页
            </Link>
            <ExportActions />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-2 justify-items-center">
          {asiStoryCards.map((card, index) => (
            <AsiStoryCardView key={card.id} card={card} index={index} total={asiStoryCards.length} />
          ))}
        </div>
      </div>
    </main>
  );
}
