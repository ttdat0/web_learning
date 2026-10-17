import type { LearnItem, ShapeKind, Topic } from '../data/topics';

function ShapeSvg({ shape, color }: { shape: ShapeKind; color: string }) {
  return (
    <svg viewBox="0 0 100 100" className="learn-visual__svg" aria-hidden="true">
      {shape === 'circle' && <circle cx="50" cy="50" r="40" fill={color} />}
      {shape === 'square' && <rect x="12" y="12" width="76" height="76" rx="14" fill={color} />}
      {shape === 'triangle' && <polygon points="50,10 90,86 10,86" fill={color} strokeLinejoin="round" />}
      {shape === 'star' && (
        <polygon
          points="50,6 61,36 92,36 67,55 76,86 50,68 24,86 33,55 8,36 39,36"
          fill={color}
          strokeLinejoin="round"
        />
      )}
      {shape === 'heart' && (
        <path
          d="M50 88 C20 62 8 44 8 30 C8 16 18 8 28 8 C38 8 46 14 50 24 C54 14 62 8 72 8 C82 8 92 16 92 30 C92 44 80 62 50 88 Z"
          fill={color}
        />
      )}
    </svg>
  );
}

export function LearnVisual({ item, big }: { item: LearnItem; big?: boolean }) {
  const v = item.visual;
  return (
    <div className={`learn-visual${big ? ' learn-visual--big' : ''}`}>
      {v.kind === 'text' && <span className="learn-visual__text">{v.text}</span>}
      {v.kind === 'emoji' && <span className="learn-visual__emoji">{v.emoji}</span>}
      {v.kind === 'color' && (
        <span className="learn-visual__swatch" style={{ background: v.hex }} aria-hidden="true" />
      )}
      {v.kind === 'shape' && <ShapeSvg shape={v.shape} color={v.color} />}
    </div>
  );
}

/** Mặt thẻ học: dùng chung cho thẻ trong quạt BounceCards và thẻ lớn trong modal. */
export default function LearnCard({
  item,
  topic,
  big
}: {
  item: LearnItem;
  topic: Topic;
  big?: boolean;
}) {
  const bg = item.cardBg ?? topic.gradient;
  const dark = !!item.darkText;
  return (
    <div
      className={`learn-card${big ? ' learn-card--big' : ''}${dark ? ' learn-card--dark' : ''}`}
      style={{ background: bg }}
    >
      <LearnVisual item={item} big={big} />
      <div className="learn-card__label">{item.label}</div>
      {(item.sub || item.count) && (
        <div className="learn-card__sub">
          {item.sub && (
            <span className="learn-card__pill">
              {item.sub} {item.subEmoji ?? ''}
            </span>
          )}
          {item.count && item.countEmoji && (
            <span className="learn-card__count" aria-label={`${item.count} ${item.countEmoji}`}>
              {Array.from({ length: Math.min(item.count, 10) }).map((_, i) => (
                <span key={i}>{item.countEmoji}</span>
              ))}
              {item.count > 10 && <span className="learn-card__more">+{item.count - 10}</span>}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
