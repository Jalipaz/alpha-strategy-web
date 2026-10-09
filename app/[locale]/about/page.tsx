'use client';

import { motion, useInView, type Variants } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useRef } from 'react';
import { MapPin, Globe, ArrowRight, TrendingUp, Users, Target } from 'lucide-react';
import FlipStat from '../../../components/FlipStat';

const AnimatedHeroBg = dynamic(() => import('../../../components/AnimatedHeroBg'), { ssr: false });

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

const pillarIcons = [TrendingUp, Users, Target];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};
const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};
const fadeRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

function Reveal({
  children,
  variants = fadeUp,
  margin = '-80px',
}: {
  children: React.ReactNode;
  variants?: Variants;
  margin?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: margin as `${number}px` });
  return (
    <motion.div ref={ref} variants={variants} initial="hidden" animate={inView ? 'show' : 'hidden'}>
      {children}
    </motion.div>
  );
}

export default function AboutPage() {
  const t = useTranslations();
  const locale = useLocale();
  const pillars = t.raw('about.pillars') as Array<{ label: string; value: string }>;
  const steps = t.raw('about.methodology.steps') as string[];

  return (
    <>
      {/* Header */}
      <section
        style={{
          paddingTop: '150px',
          paddingBottom: '88px',
          paddingLeft: '24px',
          paddingRight: '24px',
          background: 'var(--bg)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <AnimatedHeroBg />
        <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <Reveal>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(32px, 5vw, 58px)',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: 'var(--ink)',
                marginBottom: '16px',
                maxWidth: '700px',
              }}
            >
              {t('about.title')}
            </h1>
            <p style={{ fontSize: '19px', fontWeight: 600, color: 'var(--accent)' }}>{t('about.subtitle')}</p>
          </Reveal>
        </div>
      </section>

      {/* Story + Stats */}
      <section style={{ padding: '80px 24px', background: 'var(--bg)', borderTop: '1px solid var(--line)' }}>
        <div
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '64px',
            alignItems: 'start',
          }}
        >
          <Reveal variants={fadeLeft} margin="-80px">
            <div>
              <p className="measure" style={{ color: 'var(--ink-dim)', fontSize: '17px', lineHeight: 1.9 }}>
                {t('about.body')}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '32px' }}>
                {[
                  { icon: MapPin, text: 'Headquarters: Miami, Florida, USA' },
                  { icon: Globe, text: t('contact.info.reach') },
                ].map(({ icon: Icon, text }, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Icon size={17} strokeWidth={1.6} style={{ color: 'var(--accent)' }} />
                    <span style={{ color: 'var(--ink)', fontSize: '15px' }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Stats */}
          <Reveal variants={fadeRight} margin="-80px">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                border: '1px solid var(--line)',
                borderRadius: '14px',
                overflow: 'hidden',
              }}
            >
              {[
                { num: '4+', label: 'Markets' },
                { num: '100+', label: 'Clients' },
                { num: '5', label: 'Service Pillars' },
                { num: '3', label: 'Languages' },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  style={{
                    padding: '26px 22px',
                    borderRight: i % 2 === 0 ? '1px solid var(--line)' : 'none',
                    borderBottom: i < 2 ? '1px solid var(--line)' : 'none',
                  }}
                >
                  <FlipStat value={stat.num} label={stat.label} size={34} />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Three Pillars */}
      <section style={{ padding: '96px 24px', background: 'var(--bg-elevated)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <Reveal>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(24px, 3vw, 38px)',
                fontWeight: 700,
                color: 'var(--ink)',
                letterSpacing: '-0.02em',
                marginBottom: '48px',
                maxWidth: '600px',
              }}
            >
              Our Three Strategic Dimensions
            </h2>
          </Reveal>

          <div className="pillar-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
            {pillars.map((pillar, i) => {
              const Icon = pillarIcons[i];
              return (
                <Reveal key={i} margin="-40px">
                  <div
                    className="pillar-item"
                    style={{
                      borderLeft: i > 0 ? '1px solid var(--line)' : 'none',
                      padding: '0 32px',
                      height: '100%',
                    }}
                  >
                    <Icon size={24} strokeWidth={1.5} style={{ color: 'var(--accent)', marginBottom: '18px' }} />
                    <h3 style={{ color: 'var(--ink)', fontSize: '19px', fontWeight: 700, marginBottom: '10px', fontFamily: 'var(--font-display)' }}>
                      {pillar.label}
                    </h3>
                    <p style={{ color: 'var(--ink-dim)', fontSize: '14.5px', lineHeight: 1.7 }}>{pillar.value}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        <style>{`
          @media (max-width: 560px) {
            .pillar-grid { grid-template-columns: 1fr !important; }
            .pillar-item {
              border-left: none !important;
              padding: 24px 0 !important;
              border-top: 1px solid var(--line);
            }
            .pillar-item:first-child { border-top: none; padding-top: 0 !important; }
          }
        `}</style>
      </section>

      {/* Methodology */}
      <section style={{ padding: '96px 24px', background: 'var(--bg)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <Reveal>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(24px, 3vw, 38px)',
                fontWeight: 700,
                color: 'var(--ink)',
                letterSpacing: '-0.02em',
                marginBottom: '48px',
                textAlign: 'center',
              }}
            >
              {t('about.methodology.title')}
            </h2>
          </Reveal>
          <Reveal>
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0' }}>
              {steps.map((step, i) => (
                <div key={step} style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ textAlign: 'center', padding: '0 10px' }}>
                    <div
                      className="tabular"
                      style={{
                        width: '52px',
                        height: '52px',
                        borderRadius: '50%',
                        margin: '0 auto 12px',
                        border: '1.5px solid var(--accent-line)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        color: 'var(--accent)',
                        fontSize: '16px',
                      }}
                    >
                      {i + 1}
                    </div>
                    <div style={{ color: 'var(--ink)', fontWeight: 600, fontSize: '13.5px', whiteSpace: 'nowrap' }}>{step}</div>
                  </div>
                  {i < steps.length - 1 && <div style={{ width: '36px', height: '1px', background: 'var(--line)', marginBottom: '28px', flexShrink: 0 }} />}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '90px 24px', textAlign: 'center', background: 'var(--bg-elevated)', borderTop: '1px solid var(--line)' }}>
        <Reveal>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 3vw, 40px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: '32px' }}>
            {t('contact.title')}
          </h2>
          <motion.div whileTap={{ scale: 0.97 }} style={{ display: 'inline-block' }}>
            <Link
              href={`/${locale}/contact`}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: 'var(--accent)',
                color: 'var(--accent-ink)',
                padding: '16px 34px',
                borderRadius: '100px',
                fontWeight: 700,
                fontSize: '15px',
                textDecoration: 'none',
              }}
            >
              {t('nav.contact')} <ArrowRight size={17} />
            </Link>
          </motion.div>
        </Reveal>
      </section>
    </>
  );
}
