'use client';

import { useEffect, useRef } from 'react';

interface Orb {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  color: [number, number, number];
  alpha: number;
  phase: number;
  speed: number;
}

export default function AnimatedHeroBg({ style }: { style?: React.CSSProperties }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const colors: [number, number, number][] = [
      [233, 30, 140],   // magenta
      [0, 180, 216],    // cyan
      [255, 107, 53],   // orange
      [0, 119, 255],    // blue
      [156, 39, 176],   // purple
    ];

    let W = 0, H = 0;
    let orbs: Orb[] = [];
    let raf: number;

    function resize() {
      W = canvas!.offsetWidth;
      H = canvas!.offsetHeight;
      canvas!.width = W;
      canvas!.height = H;
      orbs = Array.from({ length: 6 }, (_, i) => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: 200 + Math.random() * 260,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        color: colors[i % colors.length],
        alpha: 0.07 + Math.random() * 0.06,
        phase: Math.random() * Math.PI * 2,
        speed: 0.3 + Math.random() * 0.4,
      }));
    }

    function draw(t: number) {
      ctx!.clearRect(0, 0, W, H);

      for (const orb of orbs) {
        const pulse = 1 + Math.sin(t * 0.001 * orb.speed + orb.phase) * 0.12;
        const r = orb.r * pulse;

        const grd = ctx!.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, r);
        grd.addColorStop(0, `rgba(${orb.color[0]},${orb.color[1]},${orb.color[2]},${orb.alpha})`);
        grd.addColorStop(1, `rgba(${orb.color[0]},${orb.color[1]},${orb.color[2]},0)`);

        ctx!.beginPath();
        ctx!.arc(orb.x, orb.y, r, 0, Math.PI * 2);
        ctx!.fillStyle = grd;
        ctx!.fill();

        orb.x += orb.vx;
        orb.y += orb.vy;

        if (orb.x < -orb.r) orb.x = W + orb.r;
        if (orb.x > W + orb.r) orb.x = -orb.r;
        if (orb.y < -orb.r) orb.y = H + orb.r;
        if (orb.y > H + orb.r) orb.y = -orb.r;
      }

      raf = requestAnimationFrame(draw);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    raf = requestAnimationFrame(draw);

    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        ...style,
      }}
    />
  );
}
