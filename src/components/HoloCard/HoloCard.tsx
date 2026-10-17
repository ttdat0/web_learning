import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import './HoloCard.css';

/*
 * HoloCard — hiệu ứng "thẻ holo" cho thẻ học: nghiêng 3D nhẹ + ánh cầu vồng
 * và điểm sáng chạy theo ngón tay/chuột.
 *
 * Vì sao không dùng bản gốc react-bits HoloCard:
 * - Bản gốc là shader WebGL2 và CHỈ nhận ảnh (prop `image`), không nhận
 *   nội dung chữ/JSX như thẻ học của app.
 * - Mỗi thẻ gốc mở một WebGL context riêng — với 29 thẻ sẽ vượt giới hạn
 *   context của trình duyệt và dễ gây lỗi render trên GPU điện thoại
 *   (đúng lỗi "bị đen, bể hình" đã gặp với Depth Carousel).
 * Bản này tái hiện vẻ ngoài holo bằng CSS thuần (transform + gradient),
 * không dùng WebGL/filter/blend-mode nên an toàn cho điện thoại.
 */

const TILT_MAX = 12; // độ nghiêng tối đa

interface HoloCardProps {
  children: ReactNode;
}

export default function HoloCard({ children }: HoloCardProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);

  const setPose = (px: number, py: number, active: boolean) => {
    const tilt = tiltRef.current;
    if (!tilt) return;
    tilt.style.setProperty('--rx', `${((0.5 - py) * 2 * TILT_MAX).toFixed(2)}deg`);
    tilt.style.setProperty('--ry', `${((px - 0.5) * 2 * TILT_MAX).toFixed(2)}deg`);
    tilt.style.setProperty('--mx', `${(px * 100).toFixed(1)}%`);
    tilt.style.setProperty('--my', `${(py * 100).toFixed(1)}%`);
    tilt.style.setProperty('--holo-o', active ? '0.9' : '0');
    tilt.classList.toggle('is-active', active);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const rect = rootRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;
    const px = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    const py = Math.min(1, Math.max(0, (e.clientY - rect.top) / rect.height));
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => setPose(px, py, true));
  };

  const reset = () => {
    cancelAnimationFrame(rafRef.current);
    setPose(0.5, 0.5, false);
  };

  // Stack đặt pointer capture lên thẻ của nó khi vuốt, nên pointerup có thể
  // không tới được thẻ holo → hiệu ứng trắng bị kẹt lại. Nghe ở window để
  // luôn reset khi nhấc tay, tránh thẻ bị "trắng" sau khi vuốt nhanh.
  useEffect(() => {
    const onUp = () => {
      cancelAnimationFrame(rafRef.current);
      const tilt = tiltRef.current;
      if (!tilt) return;
      tilt.style.setProperty('--holo-o', '0');
      tilt.classList.remove('is-active');
    };
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    return () => {
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="holo-card"
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      onPointerUp={reset}
    >
      <div ref={tiltRef} className="holo-card__tilt">
        {children}
        <div className="holo-card__shine" aria-hidden="true" />
        <div className="holo-card__glare" aria-hidden="true" />
      </div>
    </div>
  );
}
