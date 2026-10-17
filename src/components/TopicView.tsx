import { useState } from 'react';
import Carousel from './Carousel/Carousel';
import LearnCard from './LearnCard';
import ItemModal from './ItemModal';
import type { Topic } from '../data/topics';

export default function TopicView({ topic, onBack }: { topic: Topic; onBack: () => void }) {
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
        <p className="topic-hero__desc">
          {topic.desc} — vuốt để lật thẻ, nhấn vào thẻ để nghe phát âm 🔊
        </p>
      </header>

      <section className="carousel-wrap" aria-label={`Thẻ học chủ đề ${topic.name}`}>
        <Carousel
          items={topic.items.map(item => (
            <LearnCard key={item.id} item={item} topic={topic} />
          ))}
          onCardClick={i => setOpenIndex(i)}
          baseWidth={560}
          aspectRatio={1.05}
          peek={44}
          gap={18}
          radius={30}
          frame={false}
          effect="tilt"
          indicator="counter"
          arrows={false}
          loop
          theme="light"
          style={{ width: '100%', maxWidth: 560, margin: '0 auto' }}
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
