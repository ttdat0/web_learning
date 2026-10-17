import { useEffect, useState } from 'react';

/**
 * Kích thước quạt thẻ tự co giãn theo số lượng thẻ và màn hình.
 * Tối ưu cho điện thoại / máy tính bảng: app hiển thị trong cột tối đa 560px.
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

  const colW = Math.min(vw, 560) - 24;
  const n = Math.max(1, count);

  // Thẻ to khi ít thẻ, nhỏ dần khi nhiều thẻ để vừa cột màn hình
  let cardSize = n <= 5 ? 160 : n <= 8 ? 124 : 100;
  cardSize = Math.min(cardSize, colW * (n <= 5 ? 0.42 : 0.3));

  const spread = Math.max(30, (colW - cardSize) / Math.max(1, n - 1));

  return {
    cardSize: Math.round(cardSize),
    spread: Math.round(spread),
    containerHeight: Math.round(cardSize * 2.15),
    pushDistance: Math.round(spread * 1.25)
  };
}
