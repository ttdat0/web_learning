import { useEffect, useState } from 'react';
import DepthCarousel from './DepthCarousel/DepthCarousel';
import LearnCard from './LearnCard';
import type { Topic } from '../data/topics';
import { speak } from '../lib/speak';

/** Cỡ thẻ theo màn hình: điện thoại thẻ vừa, tablet/máy tính thẻ bự. */
function useDepthSize() {
  const [vw, setVw] = useState(() =>
    typeof window === 'undefined' ? 424 : window.innerWidth
  );
  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return vw < 600
    ? { cardWidth: 340, cardHeight: 400, spread: 40 }
    : { cardWidth: 460, cardHeight: 540, spread: 55 };
}

export default function TopicView({ topic, onBack }: { topic: Topic; onBack: () => void }) {
  const size = useDepthSize();

  return (
    <main className="topic-view">
      <header className="topic-topbar">
        <button className="back-btn back-btn--fresh" onClick={onBack} aria-label="Về trang chủ">
          <span className="back-btn__arrow" aria-hidden="true">
            ←
          </span>
          Trang chủ
        </button>
        <h2 className="topic-topbar__name" style={{ backgroundImage: topic.gradient }}>
          {topic.name}
        </h2>
      </header>

      <section
        className="depth-wrap"
        style={{ height: size.cardHeight + 24 }}
        aria-label={`Thẻ học chủ đề ${topic.name}`}
      >
        <DepthCarousel
          items={topic.items.map(item => ({
            content: <LearnCard key={item.id} item={item} topic={topic} />
          }))}
          onCardClick={i => {
            const item = topic.items[i];
            if (item) speak(item.speak);
          }}
          cardWidth={size.cardWidth}
          cardHeight={size.cardHeight}
          radius={30}
          depth={240}
          spread={size.spread}
          tilt={20}
          visibleCards={3}
          blur={5}
          loop
          showControls={false}
          showIndicators={false}
        />
      </section>
      <p className="depth-hint">👉 Vuốt để lật thẻ, nhấn vào thẻ để nghe phát âm 🔊</p>
    </main>
  );
}
