import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import Stack from './Stack/Stack';
import HoloCard from './HoloCard/HoloCard';
import LearnCard, { LearnVisual } from './LearnCard';
import ChromaGrid from './ChromaGrid/ChromaGrid';
import FullscreenButton from './FullscreenButton';
import type { Topic } from '../data/topics';
import { speak } from '../lib/speak';

/** Kích thước khung hình hiện tại — dùng để tính cỡ chữ cho thẻ học. */
function useViewportSize() {
  const [size, setSize] = useState(() => ({
    w: typeof window === 'undefined' ? 424 : window.innerWidth,
    h: typeof window === 'undefined' ? 924 : window.innerHeight
  }));
  useEffect(() => {
    const onResize = () => setSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return size;
}

type ViewMode = 'deck' | 'grid';

export default function TopicView({ topic, onBack }: { topic: Topic; onBack: () => void }) {
  const { w: vw, h: vh } = useViewportSize();
  const [topIndex, setTopIndex] = useState(0);
  // Hai chế độ xem và "đường về" của nút Quay lại theo đúng luồng sử dụng:
  // lưới → chạm thẻ/từ lưới sang thẻ: Back quay về lưới; đang ở lưới hoặc ở
  // thẻ mở thẳng từ trang chủ: Back về trang chủ.
  const [mode, setMode] = useState<ViewMode>('deck');
  const [deckFromGrid, setDeckFromGrid] = useState(false);
  // Thẻ trên cùng khi (re)mount bộ bài — lưới nhảy tới thẻ nào thì đặt ở đây.
  const [deckStart, setDeckStart] = useState(0);
  const [backMenu, setBackMenu] = useState(false);
  const pressTimer = useRef<number | null>(null);
  const longPressed = useRef(false);
  // Mốc nhả tay sau nhấn giữ: cú click "dội" mà trình duyệt tự bắn vào phần
  // tử dưới ngón tay ngay khi nhả phải bị bỏ qua; lần chạm thật luôn muộn hơn.
  const releasedAt = useRef(0);
  const count = topic.items.length;

  // Thẻ học bọc hiệu ứng holo — vuốt thẻ trên cùng để lật sang thẻ tiếp theo.
  const cards = topic.items.map(item => (
    <HoloCard key={item.id}>
      <LearnCard item={item} topic={topic} />
    </HoloCard>
  ));

  // Thẻ lấp đầy khung Stack → cỡ chữ tính theo khung thẻ thực tế: bị chặn
  // bởi chiều rộng màn hình, chiều cao còn lại sau topbar/phần dưới, và
  // trần 780px cho màn hình rất lớn.
  const cardSize = Math.min(vw - 16, vh - 235, 780);

  const handleTap = (index: number) => {
    const item = topic.items[index];
    if (!item) return;
    setTopIndex(index);
    speak(item.speak, item.id);
  };

  /** Quay lại: ở lưới hoặc ở thẻ không qua lưới thì về trang chủ;
      ở thẻ được mở từ lưới thì quay về lưới. */
  const goBack = () => {
    setBackMenu(false);
    if (mode === 'deck' && deckFromGrid) {
      setMode('grid');
      return;
    }
    onBack();
  };

  const goHome = () => {
    setBackMenu(false);
    onBack();
  };

  const openGrid = () => setMode('grid');

  const openDeck = () => {
    setDeckStart(topIndex);
    setDeckFromGrid(true);
    setMode('deck');
  };

  // Từ lưới: nhảy thẳng tới thẻ được chọn ở dạng từng thẻ và đọc luôn thẻ đó.
  const jumpTo = (index: number) => {
    const item = topic.items[index];
    if (!item) return;
    setDeckStart(index);
    setTopIndex(index);
    setDeckFromGrid(true);
    setMode('deck');
    speak(item.speak, item.id);
  };

  // Nhấn giữ nút Quay lại ~0.55s → mở menu chọn nơi quay về; nhả tay sớm =
  // nhấn thường (lùi một tầng). longPressed chặn cú nhả tay sau khi menu mở
  // khỏi bị tính thành một lần nhấn nữa.
  const startPress = () => {
    longPressed.current = false;
    pressTimer.current = window.setTimeout(() => {
      longPressed.current = true;
      setBackMenu(true);
    }, 550);
  };
  const endPress = () => {
    if (pressTimer.current !== null) {
      window.clearTimeout(pressTimer.current);
      pressTimer.current = null;
    }
    if (longPressed.current) {
      longPressed.current = false;
      releasedAt.current = Date.now();
      return;
    }
    goBack();
  };
  const cancelPress = () => {
    if (pressTimer.current !== null) {
      window.clearTimeout(pressTimer.current);
      pressTimer.current = null;
    }
  };

  return (
    <main className="topic-view">
      <header className="topic-topbar">
        <div className="topic-topbar__left">
          <button
            className="back-btn--icon"
            aria-label="Quay lại — nhấn giữ để chọn về trang chủ hoặc trang trước đó"
            onPointerDown={startPress}
            onPointerUp={endPress}
            onPointerLeave={cancelPress}
            onPointerCancel={cancelPress}
            onContextMenu={e => e.preventDefault()}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
          </button>
          {mode === 'deck' ? (
            <button type="button" className="back-btn--icon view-toggle" onClick={openGrid} aria-label="Xem tất cả thẻ" title="Xem tất cả thẻ">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3.5" y="3.5" width="7" height="7" rx="1.8" />
                <rect x="13.5" y="3.5" width="7" height="7" rx="1.8" />
                <rect x="3.5" y="13.5" width="7" height="7" rx="1.8" />
                <rect x="13.5" y="13.5" width="7" height="7" rx="1.8" />
              </svg>
            </button>
          ) : (
            <button type="button" className="back-btn--icon view-toggle" onClick={openDeck} aria-label="Xem từng thẻ" title="Xem từng thẻ">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3.5" y="5" width="17" height="14" rx="2.5" />
              </svg>
            </button>
          )}
        </div>
        <h2 className="topic-topbar__name" style={{ backgroundImage: topic.gradient }}>
          {topic.name}
        </h2>
        <FullscreenButton />
      </header>

      {mode === 'deck' ? (
        <section
          className="stack-wrap"
          style={{ '--stack-card-size': `${cardSize}px` } as CSSProperties}
          aria-label={`Thẻ học chủ đề ${topic.name}`}
        >
          <Stack
            key={`${topic.id}:${deckStart}`}
            className="topic-stack"
            cards={cards}
            layout="deck"
            visible={3}
            spread={0.35}
            depth={0.6}
            radius={36}
            frame={5}
            frameColor="#ffffff"
            threshold={90}
            initialIndex={deckStart}
            onCardClick={handleTap}
            onChange={setTopIndex}
          />
        </section>
      ) : (
        <section className="grid-wrap" aria-label={`Tất cả thẻ chủ đề ${topic.name}`}>
          <ChromaGrid
            items={topic.items.map(item => ({
              title: item.label,
              subtitle: item.sub ? `${item.sub}${item.subEmoji ? ` ${item.subEmoji}` : ''}` : undefined,
              accent: topic.gradient.match(/#[0-9a-fA-F]{6}/)?.[0] ?? '#38bdf8',
              mediaBackground: topic.gradient,
              content: <LearnVisual item={item} />
            }))}
            columns={vw >= 1100 ? 6 : vw >= 700 ? 5 : 4}
            minCardWidth={100}
            gap={10}
            radius={230}
            grayscale={0.3}
            dim={0.04}
            glow={0.55}
            borderGlow={0.9}
            aspectRatio={vw >= 900 ? '4 / 3' : '1 / 1'}
            cardRadius={20}
            theme="light"
            currentIndex={topIndex}
            onCardClick={jumpTo}
          />
        </section>
      )}

      <footer className="footer">💛 Bé Học Vui — học mà chơi, chơi mà học</footer>
      {mode === 'deck' ? (
        <>
          <p className="stack-counter">
            Thẻ {topIndex + 1} / {count}
          </p>
          <p className="stack-hint stack-hint--below">
            👆 Chạm vào thẻ để nghe · 👉 Vuốt để lật thẻ tiếp theo
          </p>
        </>
      ) : (
        <>
          <p className="stack-counter">Tất cả {count} thẻ</p>
          <p className="stack-hint stack-hint--below">
            👆 Chạm vào một thẻ để học thẻ đó
          </p>
        </>
      )}

      {backMenu && (
        <>
          <div
            className="back-menu-backdrop"
            onClick={() => {
              if (Date.now() - releasedAt.current < 250) return;
              setBackMenu(false);
            }}
            aria-hidden="true"
          />
          <div className="back-menu" role="menu" aria-label="Chọn nơi quay về">
            <button
              type="button"
              className="back-menu__item"
              onClick={() => {
                if (Date.now() - releasedAt.current < 250) return;
                goHome();
              }}
            >
              <span aria-hidden="true">🏠</span> Về trang chủ
            </button>
            <button
              type="button"
              className="back-menu__item"
              onClick={() => {
                if (Date.now() - releasedAt.current < 250) return;
                goBack();
              }}
            >
              <span aria-hidden="true">↩️</span> Về trang trước đó
            </button>
          </div>
        </>
      )}
    </main>
  );
}
