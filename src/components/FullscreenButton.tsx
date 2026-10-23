import { useEffect, useState } from 'react';
import './FullscreenButton.css';

/*
 * Nút bật/tắt toàn màn hình thủ công (thay cho tự động).
 * Tương thích nhiều máy: dùng Fullscreen API chuẩn, fallback sang
 * webkit (iPad Safari); tự ẩn nút khi thiết bị không hỗ trợ (vd: iPhone).
 */

interface FsApi {
  supported: boolean;
  enter: () => void;
  exit: () => void;
  isActive: () => boolean;
}

const noopApi: FsApi = {
  supported: false,
  enter: () => {},
  exit: () => {},
  isActive: () => false
};

function detectApi(): FsApi {
  if (typeof document === 'undefined') return noopApi;
  const el = document.documentElement as HTMLElement & {
    webkitRequestFullscreen?: () => void;
  };
  const doc = document as Document & {
    webkitExitFullscreen?: () => void;
    webkitFullscreenElement?: Element | null;
  };

  if (typeof el.requestFullscreen === 'function') {
    return {
      supported: true,
      enter: () => {
        try {
          const p = el.requestFullscreen() as unknown as Promise<void> | undefined;
          p?.catch?.(() => {});
        } catch {
          /* thiết bị từ chối — bỏ qua */
        }
      },
      exit: () => {
        try {
          const p = document.exitFullscreen() as unknown as Promise<void> | undefined;
          p?.catch?.(() => {});
        } catch {
          /* bỏ qua */
        }
      },
      isActive: () => document.fullscreenElement != null
    };
  }

  if (typeof el.webkitRequestFullscreen === 'function') {
    return {
      supported: true,
      enter: () => {
        try {
          el.webkitRequestFullscreen?.();
        } catch {
          /* bỏ qua */
        }
      },
      exit: () => {
        try {
          doc.webkitExitFullscreen?.();
        } catch {
          /* bỏ qua */
        }
      },
      isActive: () => doc.webkitFullscreenElement != null
    };
  }

  return noopApi;
}

/* Icon phóng to: 4 mũi tên chéo hướng ra ngoài (phong cách Lucide). */
function ExpandIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 3h6v6" />
      <path d="M9 21H3v-6" />
      <path d="M21 3l-7 7" />
      <path d="M3 21l7-7" />
    </svg>
  );
}

/* Icon thu nhỏ: 4 mũi tên chéo hướng vào trong. */
function CompressIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 14h6v6" />
      <path d="M20 10h-6V4" />
      <path d="M14 10l7-7" />
      <path d="M3 21l7-7" />
    </svg>
  );
}

export default function FullscreenButton({ className = '', showText = false }: { className?: string; showText?: boolean }) {
  const [api] = useState<FsApi>(detectApi);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!api.supported) return;
    const sync = () => setActive(api.isActive());
    sync();
    document.addEventListener('fullscreenchange', sync);
    document.addEventListener('webkitfullscreenchange', sync);
    return () => {
      document.removeEventListener('fullscreenchange', sync);
      document.removeEventListener('webkitfullscreenchange', sync);
    };
  }, [api]);

  // Thiết bị không hỗ trợ fullscreen (vd: iPhone Safari) → ẩn nút.
  if (!api.supported) return null;

  const label = active ? 'Thoát toàn màn hình' : 'Xem toàn màn hình';
  return (
    <button
      type="button"
      className={`fs-btn${className ? ` ${className}` : ''}`}
      onClick={() => (active ? api.exit() : api.enter())}
      aria-label={label}
      title={label}
    >
      {active ? <CompressIcon /> : <ExpandIcon />}
      {showText && <span className="fs-btn__text">{active ? 'Thu nhỏ' : 'Phóng lớn'}</span>}
    </button>
  );
}
