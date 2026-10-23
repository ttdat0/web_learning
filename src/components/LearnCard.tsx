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
      {shape === 'rectangle' && <rect x="6" y="27" width="88" height="46" rx="7" fill={color} />}
      {shape === 'oval' && <ellipse cx="50" cy="50" rx="43" ry="28" fill={color} />}
      {shape === 'rhombus' && (
        <polygon points="50,7 89,50 50,93 11,50" fill={color} strokeLinejoin="round" />
      )}
      {shape === 'hexagon' && (
        <polygon points="50,6 88,28 88,72 50,94 12,72 12,28" fill={color} strokeLinejoin="round" />
      )}
      {shape === 'semicircle' && <path d="M8 60 A42 42 0 0 1 92 60 Z" fill={color} />}
      {shape === 'trapezoid' && (
        <polygon points="31,22 69,22 89,78 11,78" fill={color} strokeLinejoin="round" />
      )}
      {shape === 'crescent' && <path d="M52 6 A44 44 0 0 0 52 94 A48 48 0 0 1 52 6 Z" fill={color} />}
      {shape === 'droplet' && (
        <path
          d="M50 5 C50 5 19 45 19 63 A31 31 0 0 0 81 63 C81 45 50 5 50 5 Z"
          fill={color}
        />
      )}
      {shape === 'cloud' && (
        <g fill={color}>
          <circle cx="34" cy="63" r="15" />
          <circle cx="53" cy="49" r="20" />
          <circle cx="71" cy="62" r="14" />
          <rect x="34" y="56" width="37" height="22" rx="6" />
        </g>
      )}
      {shape === 'arrow' && (
        <polygon
          points="8,37 56,37 56,22 92,50 56,78 56,63 8,63"
          fill={color}
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}

export function LearnVisual({ item }: { item: LearnItem; big?: boolean }) {
  const v = item.visual;
  return (
    <div className="learn-visual">
      {v.kind === 'text' && (
        <span
          className={`learn-visual__text${v.text.length > 2 ? ' learn-visual__text--long' : ''}`}
        >
          {v.text}
        </span>
      )}
      {v.kind === 'emoji' && <span className="learn-visual__emoji">{v.emoji}</span>}
      {v.kind === 'image' && (
        <img className="learn-visual__img" src={v.src} alt={item.label} draggable={false} loading="lazy" decoding="async" />
      )}
      {v.kind === 'color' && (
        <span className="learn-visual__swatch" style={{ background: v.hex }} aria-hidden="true" />
      )}
      {v.kind === 'shape' && <ShapeSvg shape={v.shape} color={v.color} />}
    </div>
  );
}

/** Mặt thẻ học: hiển thị bên trong Stack (bọc thêm hiệu ứng HoloCard). */
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
  const isColor = item.visual.kind === 'color';
  // Thẻ chữ cái: chữ in hoa ở góc, chữ thường to ở giữa → không cần nhãn nữa.
  // Ẩn nhãn khi nó trùng với chữ/số đã hiển thị to (vd: thẻ "6" không cần thêm nhãn "6")
  const showLabel =
    !item.corner && !(item.visual.kind === 'text' && item.visual.text === item.label);
  return (
    <div
      className={`learn-card${big ? ' learn-card--big' : ''}${dark ? ' learn-card--dark' : ''}${
        item.corner ? ' learn-card--abc' : ''
      }${isColor ? ' learn-card--color' : ''}`}
      style={{ background: bg }}
    >
      {item.corner && (
        <div className="learn-card__corner" aria-hidden="true">
          {item.corner}
        </div>
      )}
      <LearnVisual item={item} big={big} />
      {showLabel && <div className="learn-card__label">{item.label}</div>}
      {item.sub && (
        <div className="learn-card__sub">
          <span className="learn-card__pill">
            {item.sub} {item.subEmoji ?? ''}
          </span>
        </div>
      )}
    </div>
  );
}
