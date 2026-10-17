import { useCallback, useEffect, useRef, type SyntheticEvent, type TouchEvent } from 'react';
import LearnCard from './LearnCard';
import { speak, stopSpeak } from '../lib/speak';
import type { Topic } from '../data/topics';

interface Props {
  topic: Topic;
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

/** Vuốt ngang tối thiểu bao nhiêu px thì tính là chuyển thẻ. */
const SWIPE_MIN_PX = 60;

export default function ItemModal({ topic, index, onClose, onNavigate }: Props) {
  const item = topic.items[index];
  const total = topic.items.length;
  const gestureRef = useRef<{ x: number; y: number; swiped: boolean } | null>(null);
  const lastSwipeAt = useRef(0);

  const go = useCallback(
    (dir: 1 | -1) => onNavigate((index + dir + total) % total),
    [index, total, onNavigate]
  );

  // Tự động đọc phát âm khi mở / chuyển thẻ
  useEffect(() => {
    speak(item.speak);
    return () => stopSpeak();
  }, [item]);

  // Khóa cuộn nền + phím tắt
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose, go]);

  const beginGesture = (x: number, y: number) => {
    gestureRef.current = { x, y, swiped: false };
  };

  const moveGesture = (x: number, y: number) => {
    const g = gestureRef.current;
    if (!g || g.swiped) return;
    const dx = x - g.x;
    const dy = y - g.y;
    // Vuốt ngang đủ dài và chủ yếu theo chiều ngang → qua thẻ khác
    if (Math.abs(dx) > SWIPE_MIN_PX && Math.abs(dx) > Math.abs(dy) * 1.4) {
      g.swiped = true;
      lastSwipeAt.current = Date.now();
      go(dx < 0 ? 1 : -1);
    }
  };

  const endGesture = () => {
    gestureRef.current = null;
  };

  const onTouchStart = (e: TouchEvent<HTMLElement>) => {
    const t = e.touches[0];
    if (t) beginGesture(t.clientX, t.clientY);
  };

  const onTouchMove = (e: TouchEvent<HTMLElement>) => {
    const t = e.touches[0];
    if (t) moveGesture(t.clientX, t.clientY);
  };

  // Vuốt xong thường kéo theo một cú click — chặn để không bấm nhầm nút
  const suppressClickAfterSwipe = (e: SyntheticEvent) => {
    if (Date.now() - lastSwipeAt.current < 400) {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={item.label}
    >
      <div
        className="modal"
        onClick={e => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={endGesture}
        onTouchCancel={endGesture}
        onMouseDown={e => beginGesture(e.clientX, e.clientY)}
        onMouseMove={e => {
          if (gestureRef.current) moveGesture(e.clientX, e.clientY);
        }}
        onMouseUp={endGesture}
        onMouseLeave={endGesture}
        onClickCapture={suppressClickAfterSwipe}
      >
        <button className="modal__close" onClick={onClose} aria-label="Đóng">
          ✕
        </button>

        <div className="modal__card">
          <LearnCard item={item} topic={topic} big />
        </div>

        <h3 className="modal__word">{item.label}</h3>
        {item.sub && (
          <p className="modal__sub">
            {item.sub} {item.subEmoji ?? ''}
          </p>
        )}

        <div className="modal__actions">
          <button className="speak-btn" onClick={() => speak(item.speak)}>
            🔊 Nghe lại
          </button>
        </div>
        <p className="modal__swipe-hint">👈 Vuốt qua lại để chuyển thẻ 👉</p>

        <div className="modal__dots" aria-hidden="true">
          {topic.items.map((_, i) => (
            <span key={i} className={`dot${i === index ? ' dot--active' : ''}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
