import { useEffect, useState } from 'react';

/** Kích thước quạt thẻ co giãn theo màn hình (desktop / mobile). */
export function useFanSize() {
  const [width, setWidth] = useState(() =>
    typeof window === 'undefined' ? 1024 : window.innerWidth
  );

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const mobile = width < 600;
  return {
    cardSize: mobile ? 128 : 188,
    spread: mobile ? 62 : 106,
    containerHeight: mobile ? 350 : 450,
    pushDistance: mobile ? 84 : 148,
    mobile
  };
}
