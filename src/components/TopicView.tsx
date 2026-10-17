import { useMemo, useState } from 'react';
import BounceCards from './BounceCards/BounceCards';
import LearnCard from './LearnCard';
import ItemModal from './ItemModal';
import type { LearnItem, Topic } from '../data/topics';
import { useFanSize } from '../hooks/useFanSize';

/** Số thẻ tối đa trên một trang quạt (để thẻ luôn đủ to, dễ chạm). */
const PAGE_SIZE = 5;

function paginate<T>(items: T[], size: number): T[][] {
  const pages: T[][] = [];
  for (let i = 0; i < items.length; i += size) pages.push(items.slice(i, i + size));
  return pages;
}

export default function TopicView({ topic, onBack }: { topic: Topic; onBack: () => void }) {
  const pages = useMemo(() => paginate<LearnItem>(topic.items, PAGE_SIZE), [topic]);
  const [page, setPage] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const pageItems = pages[page] ?? [];
  const fan = useFanSize(pageItems.length);
  const goPage = (dir: 1 | -1) =>
    setPage(p => (p + dir + pages.length) % pages.length);

  return (
    <main className="topic-view">
      <div className="topic-view__topbar">
        <button className="back-btn" onClick={onBack} aria-label="Về trang chủ">
          ← Trang chủ
        </button>
      </div>

      <header className="topic-hero">
        <div className="topic-hero__badge" style={{ background: topic.gradient }}>
          {topic.icon}
        </div>
        <h2 className="topic-hero__title">{topic.name}</h2>
        <p className="topic-hero__desc">{topic.desc} — nhấn vào thẻ để nghe phát âm 🔊</p>
      </header>

      <section className="fan-wrap" aria-label={`Thẻ học chủ đề ${topic.name}`}>
        <BounceCards
          key={`${topic.id}-p${page}`}
          images={pageItems.map(item => ({
            alt: item.label,
            content: <LearnCard item={item} topic={topic} />
          }))}
          containerWidth={560}
          containerHeight={fan.containerHeight}
          cardSize={fan.cardSize}
          spread={fan.spread}
          rotation={9}
          arc={22}
          animationDelay={0.2}
          animationStagger={0.07}
          bounciness={0.65}
          pushDistance={fan.pushDistance}
          hoverScale={1.12}
          borderWidth={6}
          radius={30}
          onCardClick={i => setOpenIndex(page * PAGE_SIZE + i)}
          style={{ width: '100%', maxWidth: 560, margin: '0 auto' }}
        />
      </section>

      {pages.length > 1 && (
        <nav className="pager" aria-label="Chuyển trang thẻ">
          <button className="nav-btn nav-btn--sm" onClick={() => goPage(-1)} aria-label="Trang trước">
            ◀
          </button>
          <div className="pager__dots">
            {pages.map((_, i) => (
              <button
                key={i}
                className={`pager__dot${i === page ? ' pager__dot--active' : ''}`}
                onClick={() => setPage(i)}
                aria-label={`Trang ${i + 1}`}
              />
            ))}
          </div>
          <span className="pager__label">
            {page + 1} / {pages.length}
          </span>
          <button className="nav-btn nav-btn--sm" onClick={() => goPage(1)} aria-label="Trang tiếp">
            ▶
          </button>
        </nav>
      )}

      {openIndex !== null && (
        <ItemModal
          topic={topic}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onNavigate={setOpenIndex}
        />
      )}
    </main>
  );
}
