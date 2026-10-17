import Carousel from './Carousel/Carousel';
import TopicCard from './TopicCard';
import { TOPICS, type Topic } from '../data/topics';

export default function HomeView({ onSelect }: { onSelect: (topic: Topic) => void }) {
  return (
    <main className="home">
      <header className="hero">
        <div className="hero__balloon" aria-hidden="true">
          🎈
        </div>
        <h1 className="hero__title">Bé Học Vui</h1>
        <p className="hero__subtitle">Chạm vào một thẻ để bắt đầu khám phá nhé! ✨</p>
      </header>

      <section className="carousel-wrap" aria-label="Các chủ đề học tập">
        <Carousel
          items={TOPICS.map(topic => (
            <TopicCard key={topic.id} topic={topic} />
          ))}
          onCardClick={i => {
            const topic = TOPICS[i];
            if (topic) onSelect(topic);
          }}
          baseWidth={560}
          aspectRatio={0.95}
          peek={44}
          gap={18}
          radius={30}
          frame={false}
          effect="tilt"
          indicator="dots"
          arrows={false}
          loop
          theme="light"
          style={{ width: '100%', maxWidth: 560, margin: '0 auto' }}
        />
        <p className="fan-hint">👉 Vuốt để xem các chủ đề, nhấn vào thẻ để mở</p>
      </section>
    </main>
  );
}
