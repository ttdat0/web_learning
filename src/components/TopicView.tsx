import { useMemo, useRef, useState, type SyntheticEvent, type TouchEvent } from 'react';
import BounceCards from './BounceCards/BounceCards';
import LearnCard from './LearnCard';
import ItemModal from './ItemModal';
import type { LearnItem, Topic } from '../data/topics';
import { useFanSize } from '../hooks/useFanSize';

/** Số thẻ tối đa trên một trang quạt (để thẻ luôn đủ to, dễ chạm). */
const PAGE_SIZE = 5;

/** Vuốt ngang tối thiểu bao nhiêu px thì tính là chuyển trang. */
const SWIPE_MIN_PX = 60;

function paginate<T>(items: T[], size: number): T[][] {
  const pages: T[][] = [];
  for (let i = 0; i < items.length; i += size) pages.push(items.slice(i, i + size));
  return pages;
}

export default function TopicView({ topic, onBack }: { topic: Topic; onBack: () => void }) {
  const pages = useMemo(() => paginate<LearnItem>(topic.items, PAGE_SIZE), [topic]);
  const [page, setPage] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const gestureRef = useRef<{ x: number; y: number; swiped: boolean } | null>(null);
  const lastSwipeAt = useRef(0);

  const pageItems = pages[page] ?? [];
  const fan = useFanSize(pageItems.length);
  const goPage = (dir: 1 | -1) =>
    setPage(p => (p + dir + pages.length) % pages.length);

  const beginGesture = (x: number, y: number) => {
    gestureRef.current = { x, y, swiped: false };
  };

  const moveGesture = (x: number, y: number) => {
    const g = gestureRef.current;
    if (!g || g.swiped || pages.length <= 1) return;
    const dx = x - g.x;
    const dy = y - g.y;
    // Vuốt ngang đủ dài và chủ yếu theo chiều ngang → chuyển trang
    if (Math.abs(dx) > SWIPE_MIN_PX && Math.abs(dx) > Math.abs(dy) * 1.4) {
      g.swiped = true;
      lastSwipeAt.current = Date.now();
      goPage(dx < 0 ? 1 : -1);
    }
  };

  const endGesture = () => {
    gestureRef.current = null;
  };

  const onTouchStart = (e: TouchEvent<HTMLElement>) => {
    const t = e.touches[0];
    if (t) beginGesture(t.clientX, t.clientY);
  };

  const onTouchMove = (e: TouchEvent<HTMLElement>) => {
    const t = e.touches[0];
    if (t) moveGesture(t.clientX, t.clientY);
  };

  // Vuốt xong thường kéo theo một cú click — chặn nó để không vô tình mở thẻ
  const suppressClickAfterSwipe = (e: SyntheticEvent) => {
    if (Date.now() - lastSwipeAt.current < 400) {
      e.stopPropagation();
      e.preventDefault();
    }
  };

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
        <p className="topic-hero__desc">
          {topic.desc} — vuốt qua lại để xem thêm, nhấn vào thẻ để nghe phát âm 🔊
        </p>
      </header>

      <section
        className="fan-wrap"
        aria-label={`Thẻ học chủ đề ${topic.name} — trang ${page + 1} trong ${pages.length}`}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={endGesture}
        onTouchCancel={endGesture}
        onMouseDown={e => beginGesture(e.clientX, e.clientY)}
        onMouseMove={e => {
          if (gestureRef.current) moveGesture(e.clientX, e.clientY);
        }}
        onMouseUp={endGesture}
        onMouseLeave={endGesture}
        onClickCapture={suppressClickAfterSwipe}
      >
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
        {pages.length > 1 && (
          <div className="page-dots" aria-hidden="true">
            {pages.map((_, i) => (
              <span
                key={i}
                className={`page-dots__dot${i === page ? ' page-dots__dot--active' : ''}`}
              />
            ))}
          </div>
        )}
      </section>

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
