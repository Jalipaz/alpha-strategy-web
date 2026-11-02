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
    // A cached video may already be ready before this effect runs, so its
    // events have fired and would never reveal it.
    if (v.readyState >= 3) setVisible(true);
    v.addEventListener('canplay', onCanPlay);
    v.addEventListener('playing', onCanPlay);
    return () => {
      v.removeEventListener('canplay', onCanPlay);
      v.removeEventListener('playing', onCanPlay);
    };
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
        opacity: visible ? 0.45 : 0,
        transition: 'opacity 1.2s ease',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      <source src="/videos/hero-atmosphere.mp4" type="video/mp4" />
    </video>
  );
}
