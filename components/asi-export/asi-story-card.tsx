import type { AsiStoryCard } from '@/lib/asi-export/cards';

export function AsiStoryCardView({ card, index, total }: { card: AsiStoryCard; index: number; total: number }) {
  return (
    <section
      data-export-card
      className="relative w-[600px] h-[800px] shrink-0 overflow-hidden rounded-[28px] border bg-white text-black shadow-xl"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.14),transparent_35%),linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)]" />
      <div className="relative flex h-full flex-col p-10">
        <div className="mb-6 flex items-center justify-between text-xs uppercase tracking-[0.22em] text-black/55">
          <span>{card.kicker || 'AI CARD'}</span>
          <span>{String(index + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}</span>
        </div>

        <div className="space-y-5">
          <h2 className="text-[34px] leading-[1.15] font-semibold tracking-[-0.03em]">{card.title}</h2>
          {card.subtitle ? <p className="text-[18px] leading-8 text-black/72">{card.subtitle}</p> : null}
          {card.body ? <p className="text-[18px] leading-8 text-black/78">{card.body}</p> : null}
        </div>

        {card.bullets?.length ? (
          <div className="mt-8 grid gap-4">
            {card.bullets.map((item) => (
              <div key={item} className="rounded-2xl border border-black/10 bg-white/88 p-4">
                <p className="text-[17px] leading-7 text-black/82">{item}</p>
              </div>
            ))}
          </div>
        ) : null}

        <div className="mt-auto flex items-center justify-between pt-8 text-sm text-black/50">
          <span>{card.footer || 'Generated for AI Card export'}</span>
          <span>ASI</span>
        </div>
      </div>
    </section>
  );
}
