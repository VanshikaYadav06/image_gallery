import React, { useEffect, useRef, useState } from 'react';
import { ThemeMode } from '../types/prism';

interface LiquidAuraCursorProps {
  theme: ThemeMode;
}

export const LiquidAuraCursor: React.FC<LiquidAuraCursorProps> = ({ theme }) => {
  const [enabled, setEnabled] = useState(false);
  const auraRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLSpanElement | null>(null);
  const rippleContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasTouch = 'ontouchstart' in window && navigator.maxTouchPoints > 0 && !finePointer;

    if (!finePointer || reducedMotion || hasTouch) {
      setEnabled(false);
      return;
    }

    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const aura = auraRef.current;
    const label = labelRef.current;
    const rippleContainer = rippleContainerRef.current;
    if (!aura || !label || !rippleContainer) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;
    let prevX = mouseX;
    let prevY = mouseY;
    let isHoveringImage = false;
    let isVisible = false;
    let rafId = 0;

    const updateHoverState = (target: EventTarget | null) => {
      if (!(target instanceof HTMLElement)) {
        isHoveringImage = false;
        return;
      }
      const imageCard = target.closest('[data-cursor="image"]');
      isHoveringImage = Boolean(imageCard);

      if (isHoveringImage && imageCard) {
        const rect = imageCard.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        // Subtle magnetic pull toward card center
        mouseX = mouseX + (centerX - mouseX) * 0.06;
        mouseY = mouseY + (centerY - mouseY) * 0.06;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) {
        isVisible = true;
        aura.style.opacity = '1';
      }
      updateHoverState(e.target);
    };

    const handleMouseLeave = () => {
      isVisible = false;
      aura.style.opacity = '0';
    };

    const handleMouseDown = (e: MouseEvent) => {
      const ripple = document.createElement('div');
      ripple.className = 'prism-click-ripple pointer-events-none fixed rounded-full';
      ripple.style.left = `${e.clientX}px`;
      ripple.style.top = `${e.clientY}px`;
      ripple.style.width = '46px';
      ripple.style.height = '46px';
      ripple.style.border = theme === 'dark'
        ? '1.5px solid rgba(165, 161, 133, 0.72)'
        : '1.5px solid rgba(146, 144, 120, 0.75)';
      ripple.style.background = theme === 'dark'
        ? 'radial-gradient(circle, rgba(193,139,112,0.28) 0%, rgba(165,161,133,0.12) 60%, transparent 100%)'
        : 'radial-gradient(circle, rgba(185,130,104,0.24) 0%, rgba(146,144,120,0.12) 60%, transparent 100%)';

      rippleContainer.appendChild(ripple);
      window.setTimeout(() => {
        ripple.remove();
      }, 600);
    };

    const tick = () => {
      // Smooth floating lag
      const ease = isHoveringImage ? 0.16 : 0.13;
      currentX += (mouseX - currentX) * ease;
      currentY += (mouseY - currentY) * ease;

      const vx = currentX - prevX;
      const vy = currentY - prevY;
      const speed = Math.min(Math.hypot(vx, vy), 32);
      const angle = Math.atan2(vy, vx) * (180 / Math.PI);

      // Gentle deformation based on velocity, settles smoothly when stationary
      const stretchX = isHoveringImage ? 1 : 1 + speed * 0.008;
      const stretchY = isHoveringImage ? 1 : 1 - speed * 0.004;
      const scale = isHoveringImage ? 2.15 : 1;

      aura.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%) rotate(${speed > 0.6 ? angle : 0}deg) scale(${scale * stretchX}, ${scale * stretchY})`;

      if (isHoveringImage) {
        aura.dataset.active = 'true';
        label.style.opacity = '1';
        label.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%) scale(1)`;
      } else {
        aura.dataset.active = 'false';
        label.style.opacity = '0';
        label.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%) scale(0.85)`;
      }

      prevX = currentX;
      prevY = currentY;
      rafId = window.requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    rafId = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mousedown', handleMouseDown);
      window.cancelAnimationFrame(rafId);
    };
  }, [enabled, theme]);

  if (!enabled) return null;

  const gradientLight =
    'radial-gradient(circle at 32% 32%, rgba(248,244,236,0.72) 0%, rgba(217,200,172,0.52) 42%, rgba(146,144,120,0.42) 72%, rgba(185,130,104,0.36) 100%)';
  const gradientDark =
    'radial-gradient(circle at 32% 32%, rgba(243,235,221,0.28) 0%, rgba(198,181,157,0.24) 42%, rgba(165,161,133,0.32) 72%, rgba(193,139,112,0.34) 100%)';

  return (
    <>
      <div
        ref={auraRef}
        aria-hidden="true"
        className="prism-aura-blob pointer-events-none fixed top-0 left-0 z-[70] w-11 h-11 opacity-0 transition-[opacity,filter,border-color] duration-200 backdrop-blur-[2px]"
        style={{
          background: theme === 'dark' ? gradientDark : gradientLight,
          boxShadow:
            theme === 'dark'
              ? '0 0 28px rgba(193, 139, 112, 0.22), inset 0 0 12px rgba(243, 235, 221, 0.16)'
              : '0 0 26px rgba(121, 92, 69, 0.18), inset 0 0 12px rgba(248, 244, 236, 0.55)',
          border:
            theme === 'dark'
              ? '1px solid rgba(243, 235, 221, 0.22)'
              : '1px solid rgba(121, 92, 69, 0.2)',
          willChange: 'transform, opacity',
        }}
      />
      <span
        ref={labelRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[71] opacity-0 px-2.5 py-1 rounded-full text-[11px] font-medium tracking-wider uppercase whitespace-nowrap transition-opacity duration-200 bg-[#302B26]/88 text-[#F3EBDD] dark:bg-[#F3EBDD]/92 dark:text-[#25231F] shadow-sm"
        style={{ willChange: 'transform, opacity' }}
      >
        View Image
      </span>
      <div ref={rippleContainerRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[69]" />
    </>
  );
};
