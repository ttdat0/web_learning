import { useCallback, useEffect } from 'react';
import LearnCard from './LearnCard';
import { speak, stopSpeak } from '../lib/speak';
import type { Topic } from '../data/topics';

interface Props {
  topic: Topic;
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function ItemModal({ topic, index, onClose, onNavigate }: Props) {
  const item = topic.items[index];
  const total = topic.items.length;

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

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={item.label}
    >
      <div className="modal" onClick={e => e.stopPropagation()}>
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
          <button className="nav-btn" onClick={() => go(-1)} aria-label="Thẻ trước">
            ◀
          </button>
          <button className="speak-btn" onClick={() => speak(item.speak)}>
            🔊 Nghe lại
          </button>
          <button className="nav-btn" onClick={() => go(1)} aria-label="Thẻ tiếp">
            ▶
          </button>
        </div>

        <div className="modal__dots" aria-hidden="true">
          {topic.items.map((_, i) => (
            <span key={i} className={`dot${i === index ? ' dot--active' : ''}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
