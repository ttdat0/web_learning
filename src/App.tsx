import { useState } from 'react';
import './App.css';
import HomeView from './components/HomeView';
import TopicView from './components/TopicView';
import type { Topic } from './data/topics';

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
