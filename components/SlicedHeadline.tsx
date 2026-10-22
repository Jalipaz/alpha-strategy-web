'use client';

import { motion, useReducedMotion } from 'framer-motion';

const EASE_OUT = [0.23, 1, 0.32, 1] as const;
const SLICES = 5;

type Props = {
  text: string;
  color?: string;
  delay?: number;
};

// Code-slice headline: the line is cut into horizontal bands that slide in from
// alternating sides and lock into place. The real text stays in the DOM (hidden
// visually) so layout, wrapping and screen readers are unaffected.
export default function SlicedHeadline({ text, color, delay = 0 }: Props) {
  const reduce = useReducedMotion();

  return (
    <span style={{ display: 'block', position: 'relative', color }}>
      <span style={{ opacity: reduce ? 1 : 0 }}>{text}</span>
      {!reduce &&
        Array.from({ length: SLICES }).map((_, i) => {
          const top = (i / SLICES) * 100;
          const bottom = 100 - ((i + 1) / SLICES) * 100;
          const dir = i % 2 === 0 ? -1 : 1;
          return (
            <motion.span
              key={i}
              aria-hidden
              initial={{ x: dir * 90, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: EASE_OUT, delay: delay + i * 0.07 }}
              style={{
                position: 'absolute',
                inset: 0,
                clipPath: `inset(${top}% 0 ${bottom}% 0)`,
                willChange: 'transform',
              }}
            >
              {text}
            </motion.span>
          );
        })}
    </span>
  );
}
