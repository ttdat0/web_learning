import AccordionGallery from './AccordionGallery/AccordionGallery';
import FullscreenButton from './FullscreenButton';
import { TOPICS, type Topic } from '../data/topics';

export default function HomeView({ onSelect }: { onSelect: (topic: Topic) => void }) {
  return (
    <main className="home">
      <FullscreenButton className="fs-btn--float" />
      <header className="hero">
        <div className="hero__balloon" aria-hidden="true">
          🎈
        </div>
        <h1 className="hero__title">Bé Học Vui</h1>
        <p className="hero__subtitle">Chạm vào một thẻ để bắt đầu khám phá nhé! ✨</p>
      </header>

      <section className="gallery-wrap" aria-label="Các chủ đề học tập">
        <AccordionGallery
          items={TOPICS.map(topic => ({
            label: topic.name,
            gradient: topic.gradient,
            icon: topic.icon,
            meta: `${topic.desc} · ${topic.items.length} thẻ`
          }))}
          defaultIndex={0}
          expandRatio={0.52}
          trigger="hover"
          onOpen={i => {
            const topic = TOPICS[i];
            if (topic) onSelect(topic);
          }}
        />
        <p className="fan-hint">👉 Chạm vào một chủ đề để mở rộng, chạm lần nữa để học</p>
      </section>

      <footer className="footer">💛 Bé Học Vui — học mà chơi, chơi mà học</footer>
    </main>
  );
}
