import { useState } from 'react';
import BounceCards from './BounceCards/BounceCards';
import LearnCard from './LearnCard';
import ItemModal from './ItemModal';
import type { Topic } from '../data/topics';
import { useFanSize } from '../hooks/useFanSize';

export default function TopicView({ topic, onBack }: { topic: Topic; onBack: () => void }) {
  const fan = useFanSize();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
          images={topic.items.map(item => ({
            alt: item.label,
            content: <LearnCard item={item} topic={topic} />
          }))}
          containerWidth={760}
          containerHeight={fan.containerHeight}
          cardSize={fan.cardSize}
          spread={fan.spread}
          rotation={9}
          arc={26}
          animationDelay={0.25}
          animationStagger={0.08}
          bounciness={0.65}
          pushDistance={fan.pushDistance}
          hoverScale={1.1}
          borderWidth={6}
          radius={30}
          onCardClick={setOpenIndex}
          style={{ width: '100%', maxWidth: 760, margin: '0 auto' }}
        />
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
