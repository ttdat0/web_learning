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

function ExpandIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 3H5a2 2 0 0 0-2 2v3" />
      <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
      <path d="M3 16v3a2 2 0 0 0 2 2h3" />
      <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
    </svg>
  );
}

function CompressIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 3v3a2 2 0 0 1-2 2H3" />
      <path d="M21 8h-3a2 2 0 0 1-2-2V3" />
      <path d="M3 16h3a2 2 0 0 1 2 2v3" />
      <path d="M16 21v-3a2 2 0 0 1 2-2h3" />
    </svg>
  );
}

export default function FullscreenButton({ className = '' }: { className?: string }) {
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
    </button>
  );
}
