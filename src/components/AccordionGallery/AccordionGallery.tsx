import { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';

import './AccordionGallery.css';

/*
 * AccordionGallery — vendored từ React Bits (JS + CSS), port sang TS và
 * tùy biến cho Bé Học Vui:
 * - Panel không dùng ảnh <img> mà dùng gradient + icon emoji của chủ đề
 *   (app không có ảnh bìa cho chủ đề, và tránh phụ thuộc ảnh ngoài).
 * - Chiều cao do khung cha quyết định (flex 1 trong trang chủ 100dvh,
 *   không cuộn) thay vì số px cố định.
 * - Hướng dọc/trang ngang tự nhận theo bề rộng màn hình (≤520px = dọc)
 *   để phép tính GSAP (rotateX, drift trục Y) khớp với CSS.
 * - Nhấn vào panel đang mở = mở chủ đề (onOpen); nhấn panel đang thu
 *   = mở rộng panel đó. Phím Enter/Space cũng kích hoạt như nhấn.
 */

export interface AccordionGalleryItem {
  label: string;
  gradient: string;
  icon: string;
  meta?: string;
}

interface AccordionGalleryProps {
  items: AccordionGalleryItem[];
  defaultIndex?: number;
  accentColor?: string;
  overlayColor?: string;
  textColor?: string;
  gap?: number;
  radius?: number;
  expandRatio?: number;
  duration?: number;
  ease?: string;
  parallax?: number;
  tilt?: number;
  stagger?: number;
  trigger?: 'hover' | 'click';
  onOpen?: (index: number) => void;
  className?: string;
}

const AccordionGallery = ({
  items,
  defaultIndex = 0,
  accentColor = '#ffffff',
  overlayColor = '#1e1b4b',
  textColor = '#ffffff',
  gap = 10,
  radius = 24,
  expandRatio = 0.52,
  duration = 0.6,
  ease = 'power3.out',
  parallax = 0.5,
  tilt = 5,
  stagger = 0.06,
  trigger = 'hover',
  onOpen,
  className = ''
}: AccordionGalleryProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<Array<HTMLDivElement | null>>([]);
  const mediaRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const barRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const textRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const firstRunRef = useRef(true);
  const mediaSizeRef = useRef(320);

  const count = items.length;
  const [active, setActive] = useState(() => Math.min(Math.max(defaultIndex, 0), Math.max(count - 1, 0)));

  // Màn hình hẹp (điện thoại dọc) → xếp cột như CSS, để GSAP tính đúng trục.
  const [mqVertical, setMqVertical] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 520px)').matches
  );
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 520px)');
    const onChange = (e: MediaQueryListEvent) => setMqVertical(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  const vertical = mqVertical;

  const prefersReduced =
    typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  const applyLayout = useCallback(
    (animate: boolean) => {
      const panels = panelRefs.current;
      if (!panels.length) return;

      const r = Math.min(Math.max(expandRatio, 0.2), 0.9);
      const grow = count > 1 ? (r * (count - 1)) / (1 - r) : 1;
      const mediaSize = mediaSizeRef.current;

      tlRef.current?.kill();
      const dur = animate && !prefersReduced ? duration : 0;
      const tl = gsap.timeline();

      panels.forEach((panel, i) => {
        if (!panel) return;
        const isActive = i === active;
        const media = mediaRefs.current[i];
        const bar = barRefs.current[i];
        const text = textRefs.current[i];

        const rot = isActive ? 0 : i < active ? tilt : -tilt;
        const rotProp = vertical ? { rotateX: -rot } : { rotateY: rot };

        tl.to(panel, { flexGrow: isActive ? grow : 1, ...rotProp, duration: dur, ease }, 0);

        if (media) {
          const drift = Math.max(-1.5, Math.min(1.5, active - i));
          const shift = drift * parallax * mediaSize * 0.06;
          tl.to(
            media,
            {
              xPercent: -50,
              yPercent: -50,
              x: vertical ? 0 : isActive ? 0 : shift,
              y: vertical ? (isActive ? 0 : shift) : 0,
              '--ag-dim': isActive ? 0 : 0.22,
              duration: dur,
              ease
            },
            0
          );
        }

        if (bar && text) {
          if (isActive) {
            tl.to([bar, text], { opacity: 1, x: 0, duration: dur, ease, stagger: prefersReduced ? 0 : stagger }, 0);
          } else {
            tl.to([bar, text], { opacity: 0, x: -14, duration: dur * 0.6, ease }, 0);
          }
        }
      });

      tlRef.current = tl;
    },
    [active, count, expandRatio, duration, ease, vertical, tilt, parallax, stagger, prefersReduced]
  );

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      const total = vertical ? rect.height : rect.width;
      const usable = Math.max(total - gap * (count - 1), 120);
      const size = Math.max(140, usable * Math.min(Math.max(expandRatio, 0.2), 0.9) * 1.22);
      mediaSizeRef.current = size;
      el.style.setProperty('--ag-media-size', `${size}px`);
      applyLayout(!firstRunRef.current);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [applyLayout, gap, count, expandRatio, vertical]);

  useEffect(() => {
    applyLayout(!firstRunRef.current);
    firstRunRef.current = false;
  }, [applyLayout]);

  useEffect(
    () => () => {
      tlRef.current?.kill();
    },
    []
  );

  const handleEnter = (i: number) => {
    if (trigger === 'hover') setActive(i);
  };

  const handleClick = (i: number) => {
    if (i !== active) {
      setActive(i);
    } else {
      onOpen?.(i);
    }
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i + 1) % count);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i - 1 + count) % count);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick(i);
    }
  };

  return (
    <div
      ref={rootRef}
      className={`accordion-gallery${vertical ? ' accordion-gallery--vertical' : ''}${className ? ` ${className}` : ''}`}
      style={{
        ['--ag-accent' as string]: accentColor,
        ['--ag-overlay' as string]: overlayColor,
        ['--ag-text' as string]: textColor,
        ['--ag-gap' as string]: `${gap}px`,
        ['--ag-radius' as string]: `${radius}px`
      }}
      role="list"
      aria-label="Các chủ đề học tập"
    >
      {items.map((item, i) => {
        const isActive = i === active;
        return (
          <div
            key={item.label}
            ref={el => {
              panelRefs.current[i] = el;
            }}
            className={`ag-panel${isActive ? ' ag-panel--active' : ''}`}
            style={{ borderRadius: `${radius}px` }}
            onClick={() => handleClick(i)}
            onMouseEnter={() => handleEnter(i)}
            onKeyDown={e => handleKeyDown(i, e)}
            role="listitem"
            tabIndex={0}
            aria-current={isActive ? 'true' : undefined}
            aria-label={item.label}
          >
            <span className="ag-panel__frame">
              <span
                className="ag-panel__media"
                ref={el => {
                  mediaRefs.current[i] = el;
                }}
              >
                <span className="ag-panel__media-bg" style={{ background: item.gradient }} />
              </span>
              <span className="ag-panel__overlay" aria-hidden="true" />
            </span>
            <span className="ag-panel__icon" aria-hidden="true">
              {item.icon}
            </span>
            <span className="ag-panel__title" aria-hidden="true">
              {item.label}
            </span>
            <span className="ag-panel__label" aria-hidden="true">
              <span
                className="ag-panel__bar"
                ref={el => {
                  barRefs.current[i] = el;
                }}
              />
              <span
                className="ag-panel__text"
                ref={el => {
                  textRefs.current[i] = el;
                }}
              >
                <span className="ag-panel__name">{item.label}</span>
                {item.meta && <span className="ag-panel__meta">{item.meta}</span>}
              </span>
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default AccordionGallery;
