/**
 * Subtle 3D tilt for any element marked `data-tilt`: it leans toward the cursor and a soft
 * light sheen follows the pointer (see `[data-tilt]` rules in index.css).
 *
 * One delegated listener drives every card, so components only need the attribute.
 * Off on touch screens and for visitors who prefer reduced motion.
 */
export function initTilt(): () => void {
  if (typeof window === 'undefined') return () => {};
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!finePointer || reduced) return () => {};

  let active: HTMLElement | null = null;
  let last: PointerEvent | null = null;
  let raf = 0;

  const apply = () => {
    raf = 0;
    if (!active || !last) return;
    const r = active.getBoundingClientRect();
    const px = (last.clientX - r.left) / r.width;
    const py = (last.clientY - r.top) / r.height;
    // big cards tilt less, so they never feel like they're flipping
    const maxDeg = Math.min(7, 2200 / Math.max(r.width, r.height));
    const rx = (0.5 - py) * 2 * maxDeg;
    const ry = (px - 0.5) * 2 * maxDeg;
    active.style.transform = `perspective(1000px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
    active.style.setProperty('--tilt-x', `${(px * 100).toFixed(1)}%`);
    active.style.setProperty('--tilt-y', `${(py * 100).toFixed(1)}%`);
  };

  const release = (el: HTMLElement) => {
    el.style.transition = 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)';
    el.style.transform = '';
    el.classList.remove('is-tilting');
  };

  const onMove = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    const el = (e.target as Element | null)?.closest?.('[data-tilt]') as HTMLElement | null;
    if (el !== active) {
      if (active) release(active);
      active = el;
      if (el) {
        el.style.transition = 'transform 0.15s ease-out';
        el.classList.add('is-tilting');
      }
    }
    last = e;
    if (active && !raf) raf = requestAnimationFrame(apply);
  };
  const onOut = (e: MouseEvent) => {
    if (!e.relatedTarget && active) {
      release(active);
      active = null;
    }
  };

  document.addEventListener('pointermove', onMove, { passive: true });
  document.addEventListener('mouseout', onOut);
  return () => {
    document.removeEventListener('pointermove', onMove);
    document.removeEventListener('mouseout', onOut);
    if (raf) cancelAnimationFrame(raf);
    if (active) release(active);
  };
}
