import { useEffect, useRef, useState } from 'react';
import BounceCards from './BounceCards/BounceCards';
import FullscreenButton from './FullscreenButton';
import { TOPICS, type Topic } from '../data/topics';

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

/** Đo kích thước thật của vùng chứa quạt thẻ để tính cỡ thẻ theo màn hình. */
function useMeasure<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(entries => {
      const rect = entries[0]?.contentRect;
      if (rect) setSize({ w: rect.width, h: rect.height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, size] as const;
}

export default function HomeView({ onSelect }: { onSelect: (topic: Topic) => void }) {
  const [holderRef, size] = useMeasure<HTMLDivElement>();
  const count = TOPICS.length;

  // Quạt dọc khi vùng chứa hẹp (điện thoại đứng), quạt ngang khi rộng.
  const axis: 'x' | 'y' = size.w > 0 && size.w < 560 ? 'y' : 'x';
  let cardSize = 200;
  let spread = 70;
  if (size.w > 0) {
    if (axis === 'x') {
      cardSize = clamp(Math.min(size.h * 0.74, 250), 120, 250);
      spread = clamp((size.w - cardSize) / (count - 1), 40, cardSize * 0.58);
    } else {
      cardSize = clamp(Math.min(size.w * 0.56, size.h * 0.44, 236), 120, 236);
      spread = clamp((size.h - cardSize) / (count - 1), 36, cardSize * 0.55);
    }
  }
  const pushDistance = Math.round(spread * 0.85);

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
        <div className="fan-holder" ref={holderRef}>
          {size.w > 0 && (
            <BounceCards
              images={TOPICS.map(topic => ({
                alt: topic.name,
                content: (
                  <div className="bc-face" style={{ background: topic.gradient }}>
                    <div className="bc-face__main">
                      <span className="bc-face__icon" aria-hidden="true">
                        {topic.icon}
                      </span>
                      <span className="bc-face__label">{topic.name}</span>
                    </div>
                    <span className="bc-face__ghost" aria-hidden="true">
                      {topic.icon}
                    </span>
                  </div>
                )
              }))}
              containerWidth={Math.round(size.w)}
              containerHeight={Math.round(size.h)}
              cardSize={Math.round(cardSize)}
              spread={Math.round(spread)}
              axis={axis}
              rotation={9}
              arc={0}
              pushDistance={pushDistance}
              hoverScale={1.05}
              bounciness={0.65}
              animationDelay={0.35}
              animationStagger={0.07}
              borderWidth={5}
              borderColor="#ffffff"
              radius={26}
              onCardClick={i => {
                const topic = TOPICS[i];
                if (topic) onSelect(topic);
              }}
            />
          )}
        </div>
        <p className="fan-hint">👉 Chạm vào một thẻ để học chủ đề đó nhé!</p>
      </section>

      <footer className="footer">💛 Bé Học Vui — học mà chơi, chơi mà học</footer>
    </main>
  );
}
