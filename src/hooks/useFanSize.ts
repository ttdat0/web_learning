import { useEffect, useState } from 'react';

/**
 * Kích thước quạt thẻ tự co giãn theo số lượng thẻ và màn hình.
 * Tối ưu cho điện thoại / máy tính bảng: cột app full màn hình điện thoại,
 * tối đa 720px trên máy tính bảng.
 */
export function useFanSize(count: number) {
  const [vw, setVw] = useState(() =>
    typeof window === 'undefined' ? 390 : window.innerWidth
  );

  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const maxCol = vw < 600 ? vw : 720;
  const colW = Math.min(vw, maxCol) - 24;
  const n = Math.max(1, count);

  // Trên cảm ứng không có hover để xòe thẻ, nên mỗi thẻ lộ ~70% cho dễ nhìn
  const visibleFrac = 0.7;
  const cardSize = Math.min(175, colW / (1 + (n - 1) * visibleFrac));
  const spread = cardSize * visibleFrac;

  return {
    cardSize: Math.round(cardSize),
    spread: Math.round(spread),
    containerHeight: Math.round(cardSize * 2.1),
    pushDistance: Math.round(spread * 1.3)
  };
}
