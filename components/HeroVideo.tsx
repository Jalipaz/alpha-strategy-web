'use client';

import { useEffect, useRef, useState } from 'react';

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => {});
    const onCanPlay = () => setVisible(true);
    v.addEventListener('canplaythrough', onCanPlay);
    return () => v.removeEventListener('canplaythrough', onCanPlay);
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        opacity: visible ? 0.18 : 0,
        transition: 'opacity 1.2s ease',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      <source src="/videos/brand-loop.mp4" type="video/mp4" />
    </video>
  );
}
