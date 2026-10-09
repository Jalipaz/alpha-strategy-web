'use client';

import { useEffect, useRef } from 'react';

interface Node {
  id: string;
  rx: number;
  ry: number;
}

function quadPoint(p0: { x: number; y: number }, p1: { x: number; y: number }, p2: { x: number; y: number }, t: number) {
  const x = (1 - t) * (1 - t) * p0.x + 2 * (1 - t) * t * p1.x + t * t * p2.x;
  const y = (1 - t) * (1 - t) * p0.y + 2 * (1 - t) * t * p1.y + t * t * p2.y;
  return { x, y };
}

// Hub-and-spoke route map: Miami (HQ) to the three markets it serves.
const NODES: Node[] = [
  { id: 'MIA', rx: 0.15, ry: 0.66 },
  { id: 'MAD', rx: 0.6, ry: 0.2 },
  { id: 'SAO', rx: 0.84, ry: 0.72 },
  { id: 'BOG', rx: 0.33, ry: 0.86 },
];

export default function AnimatedHeroBg({ style }: { style?: React.CSSProperties }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let W = 0;
    let H = 0;
    let raf: number;

    const hub = NODES[0];
    const spokes = NODES.slice(1);

    function pos(n: Node) {
      return { x: n.rx * W, y: n.ry * H };
    }

    function control(a: Node, b: Node) {
      const p0 = pos(a);
      const p1 = pos(b);
      const mx = (p0.x + p1.x) / 2;
      const my = (p0.y + p1.y) / 2;
      return { x: mx, y: my - H * 0.14 };
    }

    function resize() {
      W = canvas!.offsetWidth;
      H = canvas!.offsetHeight;
      canvas!.width = W;
      canvas!.height = H;
    }

    const ROUTE_DURATION = 5200;
    const ROUTE_GAP = 900;
    const CYCLE = ROUTE_DURATION + ROUTE_GAP;

    function draw(t: number) {
      ctx!.clearRect(0, 0, W, H);

      // Route lines, quiet
      for (const node of spokes) {
        const p0 = pos(hub);
        const p2 = pos(node);
        const p1 = control(hub, node);
        ctx!.beginPath();
        ctx!.moveTo(p0.x, p0.y);
        ctx!.quadraticCurveTo(p1.x, p1.y, p2.x, p2.y);
        ctx!.strokeStyle = 'rgba(245, 241, 232, 0.1)';
        ctx!.lineWidth = 1;
        ctx!.stroke();
      }

      // Nodes
      for (const node of NODES) {
        const p = pos(node);
        const isHub = node.id === 'MIA';
        const pulse = reduceMotion ? 1 : 1 + Math.sin(t * 0.0012 + node.rx * 10) * 0.08;
        const r = (isHub ? 4.5 : 3) * pulse;

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx!.fillStyle = isHub ? 'rgba(232, 163, 61, 0.9)' : 'rgba(167, 174, 189, 0.55)';
        ctx!.fill();

        if (isHub) {
          const glow = ctx!.createRadialGradient(p.x, p.y, 0, p.x, p.y, 22);
          glow.addColorStop(0, 'rgba(232, 163, 61, 0.18)');
          glow.addColorStop(1, 'rgba(232, 163, 61, 0)');
          ctx!.beginPath();
          ctx!.arc(p.x, p.y, 22, 0, Math.PI * 2);
          ctx!.fillStyle = glow;
          ctx!.fill();
        }
      }

      // Traveling flight dot — cycles through each route in turn
      if (!reduceMotion && spokes.length) {
        const cycleT = t % (CYCLE * spokes.length);
        const routeIndex = Math.floor(cycleT / CYCLE);
        const localT = cycleT - routeIndex * CYCLE;
        if (localT < ROUTE_DURATION) {
          const progress = localT / ROUTE_DURATION;
          const eased = 1 - Math.pow(1 - progress, 3);
          const target = spokes[routeIndex % spokes.length];
          const p0 = pos(hub);
          const p2 = pos(target);
          const p1 = control(hub, target);
          const p = quadPoint(p0, p1, p2, eased);

          const glow = ctx!.createRadialGradient(p.x, p.y, 0, p.x, p.y, 10);
          glow.addColorStop(0, 'rgba(232, 163, 61, 0.9)');
          glow.addColorStop(1, 'rgba(232, 163, 61, 0)');
          ctx!.beginPath();
          ctx!.arc(p.x, p.y, 10, 0, Math.PI * 2);
          ctx!.fillStyle = glow;
          ctx!.fill();

          ctx!.beginPath();
          ctx!.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
          ctx!.fillStyle = '#F5F1E8';
          ctx!.fill();
        }
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
