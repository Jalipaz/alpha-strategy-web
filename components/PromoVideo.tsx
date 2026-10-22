'use client';

import { useEffect, useRef } from 'react';

// Silent promo: plays automatically (muted, as browsers require) while it is
// on screen, pauses when scrolled away, and stays still for reduced-motion users.
export default function PromoVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.4 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      controls
      preload="metadata"
      poster="/videos/alpha-promo-poster.jpg"
      style={{ display: 'block', width: '100%', aspectRatio: '16 / 9', borderRadius: '10px', background: 'var(--bg)' }}
    >
      <source src="/videos/alpha-promo.mp4" type="video/mp4" />
    </video>
  );
}
