import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import Stack from './Stack/Stack';
import HoloCard from './HoloCard/HoloCard';
import LearnCard from './LearnCard';
import FullscreenButton from './FullscreenButton';
import type { Topic } from '../data/topics';
import { speak } from '../lib/speak';

/** Chiều rộng khung hình hiện tại — dùng để tính cỡ chữ cho thẻ học. */
function useViewportWidth() {
  const [vw, setVw] = useState(() =>
    typeof window === 'undefined' ? 424 : window.innerWidth
  );
  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return vw;
}

export default function TopicView({ topic, onBack }: { topic: Topic; onBack: () => void }) {
  const vw = useViewportWidth();
  const [topIndex, setTopIndex] = useState(0);
  const count = topic.items.length;

  // Thẻ học bọc hiệu ứng holo — vuốt thẻ trên cùng để lật sang thẻ tiếp theo.
  const cards = topic.items.map(item => (
    <HoloCard key={item.id}>
      <LearnCard item={item} topic={topic} />
    </HoloCard>
  ));

  // Thẻ lấp đầy khung Stack → cỡ chữ tính theo chiều rộng khung.
  const cardSize = Math.min(vw, 720) - 16;

  const handleTap = (index: number) => {
    const item = topic.items[index];
    if (!item) return;
    setTopIndex(index);
    speak(item.speak);
  };

  return (
    <main className="topic-view">
      <header className="topic-topbar">
        <button className="back-btn back-btn--fresh" onClick={onBack} aria-label="Về trang chủ">
          <span className="back-btn__arrow" aria-hidden="true">
            ←
          </span>
          Trang chủ
        </button>
        <div className="topic-topbar__right">
          <h2 className="topic-topbar__name" style={{ backgroundImage: topic.gradient }}>
            {topic.name}
          </h2>
          <FullscreenButton />
        </div>
      </header>

      <section
        className="stack-wrap"
        style={{ '--stack-card-size': `${cardSize}px` } as CSSProperties}
        aria-label={`Thẻ học chủ đề ${topic.name}`}
      >
        <Stack
          key={topic.id}
          className="topic-stack"
          cards={cards}
          layout="deck"
          visible={3}
          spread={0.6}
          depth={0.6}
          radius={36}
          threshold={90}
          onCardClick={handleTap}
          onChange={setTopIndex}
        />
        <p className="stack-counter">
          Thẻ {topIndex + 1} / {count}
        </p>
        <p className="stack-hint">👆 Chạm vào thẻ để nghe · 👉 Vuốt để lật thẻ tiếp theo</p>
      </section>
    </main>
  );
}
