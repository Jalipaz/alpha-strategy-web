'use client';

import { motion, useReducedMotion } from 'framer-motion';

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

// Impact point sits upper-right of the 1000x700 viewBox; cracks radiate from it.
const ORIGIN = '780,190';
const CRACKS = [
  'M780,190 L640,120 L520,40 L430,0',
  'M780,190 L900,70 L960,0',
  'M780,190 L1000,230',
  'M780,190 L930,330 L1000,420',
  'M780,190 L700,330 L610,470 L560,700',
  'M780,190 L560,250 L380,230 L180,300 L0,280',
  'M640,120 L690,30 L700,0',
  'M700,330 L840,430 L860,700',
  'M380,230 L330,360 L220,500',
  'M930,330 L850,230',
];

// Facets fill a few of the shards so the glass catches light.
const SHARDS = [
  '780,190 640,120 560,250',
  '780,190 560,250 700,330',
  '780,190 930,330 850,230',
  '780,190 900,70 1000,230',
  '640,120 520,40 430,0 690,30',
];

export default function GlassShatter() {
  const reduce = useReducedMotion();

  return (
    <svg
      aria-hidden
      viewBox="0 0 1000 700"
      preserveAspectRatio="xMaxYMin slice"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      <defs>
        <linearGradient id="shard-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(245,241,232,0.09)" />
          <stop offset="100%" stopColor="rgba(232,163,61,0.02)" />
        </linearGradient>
        <radialGradient id="impact-glow" cx="78%" cy="27%" r="40%">
          <stop offset="0%" stopColor="rgba(232,163,61,0.22)" />
          <stop offset="100%" stopColor="rgba(232,163,61,0)" />
        </radialGradient>
      </defs>

      <rect width="1000" height="700" fill="url(#impact-glow)" />

      {SHARDS.map((points, i) => (
        <motion.polygon
          key={points}
          points={points}
          fill="url(#shard-fill)"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.5 + i * 0.08 }}
        />
      ))}

      {CRACKS.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          fill="none"
          stroke="rgba(245,241,232,0.28)"
          strokeWidth={1}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          initial={reduce ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.25 + i * 0.05 }}
        />
      ))}

      <circle cx={ORIGIN.split(',')[0]} cy={ORIGIN.split(',')[1]} r="4" fill="var(--accent)" opacity="0.9" />
    </svg>
  );
}
