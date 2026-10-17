import { useEffect, useState } from 'react';
import './App.css';
import HomeView from './components/HomeView';
import TopicView from './components/TopicView';
import type { Topic } from './data/topics';

/**
 * Tự động vào chế độ toàn màn hình ngay từ cú chạm đầu tiên (trình duyệt
 * chỉ cho phép fullscreen sau thao tác của người dùng). Nếu lỡ thoát ra,
 * chạm tiếp sẽ tự vào lại.
 */
function useAutoFullscreen() {
  useEffect(() => {
    const goFullscreen = () => {
      if (document.fullscreenElement) return;
      const el = document.documentElement as HTMLElement & {
        webkitRequestFullscreen?: () => Promise<void> | void;
      };
      const request =
        el.requestFullscreen?.bind(el) ?? el.webkitRequestFullscreen?.bind(el);
      if (!request) return;
      try {
        const result = request();
        (result as Promise<void> | undefined)?.catch?.(() => {});
      } catch {
        /* thiết bị không hỗ trợ — bỏ qua */
      }
    };
    document.addEventListener('pointerdown', goFullscreen);
    return () => document.removeEventListener('pointerdown', goFullscreen);
  }, []);
}

const DECOR = ['☁️', '🌈', '⭐', '🎈', '☁️', '🦋', '⭐', '☁️'];

function BackgroundDecor() {
  return (
    <div className="decor" aria-hidden="true">
      {DECOR.map((icon, i) => (
        <span key={i} className={`decor__item decor__item--${i}`}>
          {icon}
        </span>
      ))}
    </div>
  );
}

const App = () => {
  const [activeTopic, setActiveTopic] = useState<Topic | null>(null);
  useAutoFullscreen();

  return (
    <div className="app">
      <BackgroundDecor />
      <div className="app__content">
        {activeTopic ? (
          <TopicView
            key={activeTopic.id}
            topic={activeTopic}
            onBack={() => setActiveTopic(null)}
          />
        ) : (
          <HomeView onSelect={setActiveTopic} />
        )}
        <footer className="footer">💛 Bé Học Vui — học mà chơi, chơi mà học</footer>
      </div>
    </div>
  );
};

export default App;
