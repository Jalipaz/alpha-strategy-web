'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

function scramble(value: string) {
  return value.replace(/[0-9]/g, () => String(Math.floor(Math.random() * 10)));
}

export default function FlipStat({
  value,
  label,
  size = 48,
  color = 'var(--accent)',
}: {
  value: string;
  label: string;
  size?: number;
  color?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const hasDigits = /[0-9]/.test(value);
  const [display, setDisplay] = useState(hasDigits ? value.replace(/[0-9]/g, '0') : value);

  useEffect(() => {
    if (!inView || !hasDigits) return;
    const steps = [scramble(value), scramble(value), value];
    let i = 0;
    const timer = setInterval(() => {
      setDisplay(steps[i]);
      i++;
      if (i >= steps.length) clearInterval(timer);
    }, 90);
    return () => clearInterval(timer);
  }, [inView, value, hasDigits]);

  return (
    <div ref={ref}>
      <div style={{ perspective: '420px', overflow: 'hidden' }}>
        <AnimatePresence mode="popLayout">
          <motion.div
            key={display}
            initial={{ rotateX: -90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
            className="tabular"
            style={{
              fontSize: `${size}px`,
              fontWeight: 700,
              color,
              lineHeight: 1,
              transformOrigin: '50% 100%',
              transformStyle: 'preserve-3d',
            }}
          >
            {display}
          </motion.div>
        </AnimatePresence>
      </div>
      <div
        style={{
          color: 'var(--ink-dim)',
          fontSize: '13px',
          fontWeight: 500,
          letterSpacing: '0.03em',
          marginTop: '8px',
        }}
      >
        {label}
      </div>
    </div>
  );
}
