import BounceCards from './BounceCards/BounceCards';
import TopicCard from './TopicCard';
import { TOPICS, type Topic } from '../data/topics';
import { useFanSize } from '../hooks/useFanSize';

export default function HomeView({ onSelect }: { onSelect: (topic: Topic) => void }) {
  const fan = useFanSize(TOPICS.length);

  return (
    <main className="home">
      <header className="hero">
        <div className="hero__balloon" aria-hidden="true">
          🎈
        </div>
        <h1 className="hero__title">Bé Học Vui</h1>
        <p className="hero__subtitle">Chạm vào một thẻ để bắt đầu khám phá nhé! ✨</p>
      </header>

      <section className="fan-wrap" aria-label="Các chủ đề học tập">
        <BounceCards
          images={TOPICS.map(topic => ({
            alt: topic.name,
            content: <TopicCard topic={topic} />
          }))}
          containerWidth={560}
          containerHeight={fan.containerHeight}
          cardSize={fan.cardSize}
          spread={fan.spread}
          rotation={9}
          arc={26}
          animationDelay={0.35}
          animationStagger={0.09}
          bounciness={0.65}
          pushDistance={fan.pushDistance}
          hoverScale={1.1}
          borderWidth={6}
          radius={30}
          onCardClick={i => onSelect(TOPICS[i])}
          style={{ width: '100%', maxWidth: 560, margin: '0 auto' }}
        />
        <p className="fan-hint">👉 Di chuột hoặc chạm vào thẻ để xem, nhấn để mở</p>
      </section>

      <section className="topic-list" aria-label="Danh sách chủ đề">
        {TOPICS.map(topic => (
          <button
            key={topic.id}
            className="topic-chip"
            style={{ background: topic.gradient }}
            onClick={() => onSelect(topic)}
          >
            <span className="topic-chip__icon">{topic.icon}</span>
            <span className="topic-chip__text">
              <strong>{topic.name}</strong>
              <small>{topic.desc}</small>
            </span>
            <span className="topic-chip__go">▶</span>
          </button>
        ))}
      </section>
    </main>
  );
}
