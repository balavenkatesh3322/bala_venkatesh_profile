import React, { useEffect, useRef } from 'react';

export type WaveVariant =
  | 'top'
  | 'bottom'
  | 'full'
  | 'dual'
  | 'center'
  | 'top-right'
  | 'bottom-left'
  | 'subtle';

interface WaterWaveEffectProps {
  /** Variant/position of the primary sea wave layer */
  variant?: WaveVariant;
  /** Color theme palette for the ocean water */
  color?: 'cyan' | 'indigo' | 'emerald' | 'purple';
  /** Enable interactive click/mouse drop ripples */
  interactive?: boolean;
}

interface InteractiveRipple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  speed: number;
}

interface ParticleBubble {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  speedX: number;
  alpha: number;
  maxAlpha: number;
}

export default function WaterWaveEffect({
  variant = 'bottom',
  color = 'cyan',
  interactive = true,
}: WaterWaveEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ripplesRef = useRef<InteractiveRipple[]>([]);
  const bubblesRef = useRef<ParticleBubble[]>([]);

  // Get color configuration based on theme prop
  const getColorRGBs = () => {
    switch (color) {
      case 'purple':
        return {
          c1: '147, 51, 234', // Purple 600
          c2: '168, 85, 247', // Purple 500
          c3: '192, 132, 252', // Purple 400
        };
      case 'indigo':
        return {
          c1: '79, 70, 229', // Indigo 600
          c2: '99, 102, 241', // Indigo 500
          c3: '129, 140, 248', // Indigo 400
        };
      case 'emerald':
        return {
          c1: '5, 150, 105', // Emerald 600
          c2: '16, 185, 129', // Emerald 500
          c3: '52, 211, 153', // Emerald 400
        };
      case 'cyan':
      default:
        return {
          c1: '8, 145, 178', // Cyan 600
          c2: '6, 182, 212', // Cyan 500
          c3: '34, 211, 238', // Cyan 400
        };
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    // Responsive Canvas Resize Observer
    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
      initBubbles();
    };

    const resizeObserver = new ResizeObserver(handleResize);
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    // Initialize floating sea foam / water bubbles
    const initBubbles = () => {
      const bubbleCount = Math.floor(width / 60);
      const newBubbles: ParticleBubble[] = [];
      for (let i = 0; i < bubbleCount; i++) {
        newBubbles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: 1.5 + Math.random() * 3.5,
          speedY: 0.3 + Math.random() * 0.7,
          speedX: (Math.random() - 0.5) * 0.4,
          alpha: Math.random() * 0.5 + 0.1,
          maxAlpha: 0.4 + Math.random() * 0.4,
        });
      }
      bubblesRef.current = newBubbles;
    };

    initBubbles();

    // Wave physics time parameter
    let step = 0;

    const colors = getColorRGBs();

    // Main animation render loop
    const render = () => {
      step += 0.018;
      ctx.clearRect(0, 0, width, height);

      // Detect if user has light theme active
      const isLightTheme = document.documentElement.classList.contains('light');

      // Alpha multipliers for dark vs light theme
      const bgOpacity = isLightTheme ? 0.09 : 0.06;
      const midOpacity = isLightTheme ? 0.15 : 0.11;
      const frontOpacity = isLightTheme ? 0.24 : 0.16;

      // Base heights for ocean sea wave layers
      let baseLineY = height * 0.82; // Default bottom sea wave
      if (variant === 'top' || variant === 'top-right') baseLineY = height * 0.22;
      else if (variant === 'full' || variant === 'center') baseLineY = height * 0.5;
      else if (variant === 'bottom-left' || variant === 'bottom') baseLineY = height * 0.82;

      // -------------------------------------------------------------
      // 1. LAYER 1: Deep Ocean Swell (Back Wave Layer)
      // -------------------------------------------------------------
      ctx.beginPath();
      ctx.moveTo(0, height);

      const wave1Amplitude = 24;
      const wave1Frequency = 0.008;

      for (let x = 0; x <= width; x += 10) {
        const y =
          baseLineY +
          Math.sin(x * wave1Frequency + step) * wave1Amplitude +
          Math.cos(x * 0.004 + step * 0.8) * 12;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();

      const grad1 = ctx.createLinearGradient(0, baseLineY - wave1Amplitude, 0, height);
      grad1.addColorStop(0, `rgba(${colors.c1}, ${bgOpacity})`);
      grad1.addColorStop(1, `rgba(${colors.c2}, 0.02)`);
      ctx.fillStyle = grad1;
      ctx.fill();

      // -------------------------------------------------------------
      // 2. LAYER 2: Midground Ocean Water Wave (Mid Layer)
      // -------------------------------------------------------------
      ctx.beginPath();
      const wave2Amplitude = 18;
      const wave2Frequency = 0.012;

      for (let x = 0; x <= width; x += 8) {
        const y =
          baseLineY +
          Math.sin(x * wave2Frequency - step * 1.2) * wave2Amplitude +
          Math.sin(x * 0.006 + step * 0.5) * 8;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();

      const grad2 = ctx.createLinearGradient(0, baseLineY - wave2Amplitude, 0, height);
      grad2.addColorStop(0, `rgba(${colors.c2}, ${midOpacity})`);
      grad2.addColorStop(1, `rgba(${colors.c1}, 0.03)`);
      ctx.fillStyle = grad2;
      ctx.fill();

      // -------------------------------------------------------------
      // 3. LAYER 3: Foreground Surface Water Wave with Crest Shimmer
      // -------------------------------------------------------------
      ctx.beginPath();
      const wave3Amplitude = 14;
      const wave3Frequency = 0.015;

      const wavePoints: { x: number; y: number }[] = [];

      for (let x = 0; x <= width; x += 6) {
        const y =
          baseLineY +
          Math.sin(x * wave3Frequency + step * 1.5) * wave3Amplitude +
          Math.cos(x * 0.009 - step) * 6;
        wavePoints.push({ x, y });
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();

      const grad3 = ctx.createLinearGradient(0, baseLineY - wave3Amplitude, 0, height);
      grad3.addColorStop(0, `rgba(${colors.c3}, ${frontOpacity})`);
      grad3.addColorStop(0.5, `rgba(${colors.c2}, ${midOpacity})`);
      grad3.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = grad3;
      ctx.fill();

      // Draw Foam Crest Line
      ctx.beginPath();
      for (let i = 0; i < wavePoints.length; i++) {
        if (i === 0) ctx.moveTo(wavePoints[i].x, wavePoints[i].y);
        else ctx.lineTo(wavePoints[i].x, wavePoints[i].y);
      }
      ctx.strokeStyle = isLightTheme
        ? `rgba(${colors.c3}, 0.5)`
        : `rgba(${colors.c3}, 0.4)`;
      ctx.lineWidth = 1.8;
      ctx.stroke();

      // -------------------------------------------------------------
      // 4. LAYER 4: Secondary Counter-Wave (If variant is 'dual', 'full', 'top-right', or 'bottom-left')
      // -------------------------------------------------------------
      if (variant === 'dual' || variant === 'full' || variant === 'top-right' || variant === 'bottom-left') {
        const topBaseLine = height * 0.18;
        ctx.beginPath();
        for (let x = 0; x <= width; x += 8) {
          const y =
            topBaseLine +
            Math.cos(x * 0.011 + step * 1.3) * 16 +
            Math.sin(x * 0.005 - step) * 8;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.lineTo(width, 0);
        ctx.lineTo(0, 0);
        ctx.closePath();

        const topGrad = ctx.createLinearGradient(0, 0, 0, topBaseLine + 25);
        topGrad.addColorStop(0, `rgba(${colors.c2}, ${midOpacity})`);
        topGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = topGrad;
        ctx.fill();
      }

      // -------------------------------------------------------------
      // 5. Floating Water Bubbles / Foam Drops
      // -------------------------------------------------------------
      bubblesRef.current.forEach((b) => {
        b.y -= b.speedY;
        b.x += Math.sin(step + b.y * 0.01) * b.speedX;

        // Reset bubble when it floats off top
        if (b.y < -10) {
          b.y = height + 10;
          b.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = isLightTheme
          ? `rgba(${colors.c3}, ${b.alpha * 0.85})`
          : `rgba(${colors.c3}, ${b.alpha})`;
        ctx.fill();

        // Specular highlight dot on bubble
        ctx.beginPath();
        ctx.arc(b.x - b.radius * 0.3, b.y - b.radius * 0.3, b.radius * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
        ctx.fill();
      });

      // -------------------------------------------------------------
      // 6. Interactive Liquid Water Drop Ripples
      // -------------------------------------------------------------
      ripplesRef.current.forEach((r, idx) => {
        r.radius += r.speed;
        r.alpha *= 0.96; // Smooth fade out

        if (r.radius < r.maxRadius && r.alpha > 0.01) {
          // Inner core water drop ring
          ctx.beginPath();
          ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${colors.c3}, ${r.alpha})`;
          ctx.lineWidth = 2.5;
          ctx.stroke();

          // Outer secondary displacement wave
          if (r.radius > 12) {
            ctx.beginPath();
            ctx.arc(r.x, r.y, r.radius * 0.65, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(${colors.c2}, ${r.alpha * 0.7})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }

          // Liquid splash glow
          ctx.beginPath();
          ctx.arc(r.x, r.y, r.radius * 1.1, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${colors.c3}, ${r.alpha * 0.08})`;
          ctx.fill();
        } else {
          ripplesRef.current.splice(idx, 1);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (canvas.parentElement) {
        resizeObserver.unobserve(canvas.parentElement);
      }
    };
  }, [variant, color]);

  // Handle pointer click/touch drops into water
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!interactive || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const maxRadius = Math.min(rect.width, rect.height) * 0.45;

    ripplesRef.current.push({
      x,
      y,
      radius: 4,
      maxRadius: Math.max(120, maxRadius),
      alpha: 0.85,
      speed: 3.2,
    });
  };

  return (
    <div
      onPointerDown={handlePointerDown}
      className="absolute inset-0 pointer-events-auto overflow-hidden z-0 select-none"
      style={{ touchAction: 'pan-y' }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block pointer-events-none"
      />
    </div>
  );
}
