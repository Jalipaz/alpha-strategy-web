'use client';

import { motion, useInView } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useRef } from 'react';
import { Handshake, Globe, LineChart, Megaphone, Radar, ArrowRight, ArrowUpRight } from 'lucide-react';

const AnimatedHeroBg = dynamic(() => import('../../../components/AnimatedHeroBg'), { ssr: false });

const iconMap: Record<string, React.ElementType> = {
  Handshake, Globe, LineChart, Megaphone, Radar,
};

const SERVICE_CODES = ['IBD', 'EXP', 'GRW', 'MKT', 'INT'];

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

function Reveal({ children, margin = '-60px' }: { children: React.ReactNode; margin?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: margin as `${number}px` });
  return (
    <motion.div ref={ref} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}>
      {children}
    </motion.div>
  );
}

export default function ServicesPage() {
  const t = useTranslations();
  const locale = useLocale();
  const services = t.raw('services.items') as Array<{ icon: string; title: string; desc: string; tags: string[] }>;

  return (
    <>
      {/* Page header */}
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
                maxWidth: '650px',
              }}
            >
              {t('services.title')}
            </h1>
            <p className="measure" style={{ color: 'var(--ink-dim)', fontSize: '18px', lineHeight: 1.7 }}>
              {t('services.subtitle')}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Services manifest */}
      <section style={{ padding: '20px 24px 110px', background: 'var(--bg)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ borderTop: '1px solid var(--line)' }}>
            {services.map((service, i) => {
              const Icon = iconMap[service.icon];
              return (
                <Reveal key={i}>
                  <motion.div
                    whileHover="hover"
                    className="service-row"
                    style={{
                      borderBottom: '1px solid var(--line)',
                      padding: '36px 4px',
                      display: 'grid',
                      gridTemplateColumns: 'auto auto 1fr auto',
                      alignItems: 'flex-start',
                      gap: '24px',
                    }}
                  >
                    <div
                      className="tabular"
                      style={{ color: 'var(--accent)', fontSize: '14px', fontWeight: 700, paddingTop: '4px', whiteSpace: 'nowrap' }}
                    >
                      {(i + 1).toString().padStart(2, '0')} / {SERVICE_CODES[i]}
                    </div>

                    <div
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '12px',
                        border: '1px solid var(--line)',
                        background: 'var(--surface)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      {Icon && <Icon size={21} strokeWidth={1.6} color="var(--accent)" />}
                    </div>

                    <div className="service-row-content">
                      <h3 style={{ color: 'var(--ink)', fontSize: 'clamp(19px, 2.4vw, 24px)', fontWeight: 700, marginBottom: '10px', fontFamily: 'var(--font-display)' }}>
                        {service.title}
                      </h3>
                      <p className="measure" style={{ color: 'var(--ink-dim)', fontSize: '15px', lineHeight: 1.75, marginBottom: '14px' }}>
                        {service.desc}
                      </p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                        {service.tags.map((tag) => (
                          <span key={tag} style={{ color: 'var(--ink-faint)', fontSize: '12.5px', fontWeight: 500 }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <motion.div variants={{ hover: { x: 4 } }} className="service-row-cta" style={{ paddingTop: '6px' }}>
                      <Link
                        href={`/${locale}/contact`}
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: '6px',
                          color: 'var(--ink)',
                          fontSize: '14px',
                          fontWeight: 600,
                          textDecoration: 'none',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {t('hero.cta2')} <ArrowUpRight size={16} />
                      </Link>
                    </motion.div>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>

        <style>{`
          @media (max-width: 640px) {
            .service-row {
              grid-template-columns: auto 1fr !important;
              grid-template-rows: auto auto;
              row-gap: 16px !important;
            }
            .service-row-content { grid-column: 1 / -1; }
            .service-row-cta { grid-column: 1 / -1; padding-top: 0 !important; }
          }
        `}</style>
      </section>

      {/* Bottom CTA */}
      <section style={{ padding: '90px 24px', background: 'var(--bg-elevated)', borderTop: '1px solid var(--line)', textAlign: 'center' }}>
        <Reveal>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 3vw, 38px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: '14px' }}>
            {t('contact.title')}
          </h2>
          <p style={{ color: 'var(--ink-dim)', fontSize: '16px', marginBottom: '32px' }}>{t('contact.subtitle')}</p>
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
