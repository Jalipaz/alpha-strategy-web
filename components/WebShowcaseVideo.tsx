'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function WebShowcaseVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => {});
    const onReady = () => setReady(true);
    v.addEventListener('canplaythrough', onReady);
    return () => v.removeEventListener('canplaythrough', onReady);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ type: 'spring', stiffness: 180, damping: 22, mass: 0.8 }}
      style={{
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,119,255,0.15)',
        background: '#0D1B3E',
        opacity: ready ? 1 : 0,
        transition: 'opacity 0.6s ease',
      }}
    >
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        style={{ width: '100%', display: 'block' }}
      >
        <source src="/videos/web-showcase.mp4" type="video/mp4" />
      </video>
    </motion.div>
  );
}
