'use client';

import { motion, useInView, type Variants } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useRef } from 'react';
import FlipStat from '../../components/FlipStat';
import {
  ArrowRight,
  ArrowUpRight,
  MapPin,
  CheckCircle2,
  Mail,
} from 'lucide-react';

const AnimatedHeroBg = dynamic(() => import('../../components/AnimatedHeroBg'), { ssr: false });
const HeroVideo = dynamic(() => import('../../components/HeroVideo'), { ssr: false });

const CONTACT_EMAIL = 'info@alphastrategygroupusa.com';
const EASE_OUT = [0.23, 1, 0.32, 1] as const;

const SERVICE_CODES = ['IBD', 'EXP', 'GRW', 'MKT', 'INT'];

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

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

// Signature hero entrance — per-word reveal, used once.
function KineticWords({ text, style }: { text: string; style?: React.CSSProperties }) {
  const words = text.split(' ');
  return (
    <span style={{ display: 'inline', ...style }}>
      {words.map((word, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', marginRight: '0.26em' }}>
          <motion.span
            style={{ display: 'inline-block' }}
            variants={{
              hidden: { y: '108%', opacity: 0 },
              show: {
                y: '0%',
                opacity: 1,
                transition: { duration: 0.6, ease: EASE_OUT, delay: i * 0.045 },
              },
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

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

export default function HomePage() {
  const t = useTranslations();
  const locale = useLocale();
  const services = t.raw('services.items') as Array<{ icon: string; title: string; desc: string; tags: string[] }>;
  const markets = t.raw('markets.items') as Array<{ code: string; name: string; desc: string }>;
  const pillars = t.raw('about.pillars') as Array<{ label: string; value: string }>;
  const steps = t.raw('about.methodology.steps') as string[];

  return (
    <>
      {/* Hero */}
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', background: 'var(--bg)' }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            backgroundImage: 'radial-gradient(rgba(245,241,232,0.035) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        />
        <HeroVideo />
        <AnimatedHeroBg />

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '140px 24px 80px', position: 'relative', zIndex: 1, width: '100%' }}>
          <motion.div variants={stagger} initial="hidden" animate="show">
            <motion.h1
              variants={fadeUp}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(38px, 6vw, 68px)',
                fontWeight: 700,
                lineHeight: 1.12,
                letterSpacing: '-0.02em',
                marginBottom: '28px',
                maxWidth: '820px',
                color: 'var(--ink)',
              }}
            >
              <KineticWords text={t('hero.headline1')} style={{ display: 'block' }} />
              <KineticWords text={t('hero.headline2')} style={{ display: 'block', color: 'var(--accent)' }} />
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="measure"
              style={{
                fontSize: 'clamp(16px, 2vw, 19px)',
                color: 'var(--ink-dim)',
                lineHeight: 1.7,
                marginBottom: '20px',
              }}
            >
              {t('hero.sub')}
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="tabular"
              style={{ color: 'var(--ink-faint)', fontSize: '13px', letterSpacing: '0.04em', marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <MapPin size={14} strokeWidth={1.8} style={{ color: 'var(--accent)' }} />
              {t('hero.tagline')} · Miami, USA
            </motion.p>

            <motion.div variants={fadeUp} style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '72px' }}>
              <motion.div whileTap={{ scale: 0.97 }}>
                <Link
                  href={`/${locale}/services`}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    background: 'var(--accent)',
                    color: 'var(--accent-ink)',
                    padding: '15px 28px',
                    borderRadius: '100px',
                    fontWeight: 700,
                    fontSize: '15px',
                    textDecoration: 'none',
                  }}
                >
                  {t('hero.cta1')} <ArrowRight size={17} />
                </Link>
              </motion.div>
              <motion.div whileTap={{ scale: 0.97 }}>
                <Link
                  href={`/${locale}/contact`}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    background: 'transparent',
                    border: '1px solid var(--line)',
                    color: 'var(--ink)',
                    padding: '15px 28px',
                    borderRadius: '100px',
                    fontWeight: 600,
                    fontSize: '15px',
                    textDecoration: 'none',
                  }}
                >
                  {t('hero.cta2')}
                </Link>
              </motion.div>
            </motion.div>

            {/* Stats — split-flap board */}
            <motion.div
              variants={stagger}
              className="hero-stats"
              style={{
                display: 'flex',
                border: '1px solid var(--line)',
                borderRadius: '14px',
                maxWidth: '680px',
              }}
            >
              {[
                { to: '4+', label: 'Markets' },
                { to: '100+', label: 'Clients' },
                { to: '5', label: 'Service Pillars' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  variants={fadeUp}
                  className="hero-stat-cell"
                  style={{
                    flex: '1 1 0',
                    textAlign: 'left',
                    padding: '28px',
                    borderRight: i < 2 ? '1px solid var(--line)' : 'none',
                  }}
                >
                  <FlipStat value={stat.to} label={stat.label} size={44} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        <style>{`
          @media (max-width: 560px) {
            .hero-stats { flex-direction: column !important; }
            .hero-stat-cell {
              border-right: none !important;
              border-bottom: 1px solid var(--line);
            }
            .hero-stat-cell:last-child { border-bottom: none; }
          }
        `}</style>
      </section>

      {/* Trust strip */}
      <section style={{ background: 'var(--bg-elevated)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', padding: '18px 24px' }}>
        <div
          style={{
            maxWidth: '1200px', margin: '0 auto',
            display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
            gap: '10px 36px', alignItems: 'center',
          }}
        >
          {['Business Development', 'Market Expansion', 'Commercial Strategy', 'Market Intelligence', 'EN / ES / PT'].map((item, i, arr) => (
            <span key={item} style={{ display: 'flex', alignItems: 'center', gap: '36px' }}>
              <span style={{ color: 'var(--ink-dim)', fontSize: '13px', fontWeight: 500, letterSpacing: '0.03em', whiteSpace: 'nowrap' }}>
                {item}
              </span>
              {i < arr.length - 1 && <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--accent)' }} />}
            </span>
          ))}
        </div>
      </section>

      {/* Services — departures manifest */}
      <section id="services" style={{ padding: '110px 24px', background: 'var(--bg)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <Reveal>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px', marginBottom: '48px' }}>
              <div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: '12px' }}>
                  {t('services.title')}
                </h2>
                <p className="measure" style={{ color: 'var(--ink-dim)', fontSize: '16px' }}>
                  {t('services.subtitle')}
                </p>
              </div>
              <span className="tabular" style={{ color: 'var(--ink-faint)', fontSize: '12px', letterSpacing: '0.08em' }}>
                {services.length.toString().padStart(2, '0')} ACTIVE
              </span>
            </div>
          </Reveal>

          <div style={{ borderTop: '1px solid var(--line)' }}>
            {services.map((service, i) => (
              <Reveal key={i} margin="-40px">
                <motion.div
                  whileHover="hover"
                  style={{
                    borderBottom: '1px solid var(--line)',
                    padding: '26px 4px',
                    display: 'grid',
                    gridTemplateColumns: 'auto 1fr auto',
                    alignItems: 'center',
                    gap: '24px',
                    position: 'relative',
                  }}
                >
                  <motion.div
                    variants={{ hover: { backgroundColor: 'var(--surface)' } }}
                    initial={{ backgroundColor: 'rgba(0,0,0,0)' }}
                    transition={{ duration: 0.18 }}
                    style={{ position: 'absolute', inset: 0, borderRadius: '10px', pointerEvents: 'none' }}
                  />
                  <div
                    className="tabular"
                    style={{
                      position: 'relative',
                      color: 'var(--accent)',
                      fontSize: '14px',
                      fontWeight: 700,
                      whiteSpace: 'nowrap',
                      minWidth: '72px',
                    }}
                  >
                    {(i + 1).toString().padStart(2, '0')} / {SERVICE_CODES[i]}
                  </div>

                  <div style={{ position: 'relative' }}>
                    <h3 style={{ color: 'var(--ink)', fontSize: 'clamp(17px, 2vw, 20px)', fontWeight: 700, marginBottom: '6px', fontFamily: 'var(--font-display)' }}>
                      {service.title}
                    </h3>
                    <p className="measure" style={{ color: 'var(--ink-dim)', fontSize: '14px', lineHeight: 1.7, marginBottom: '10px' }}>
                      {service.desc}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            color: 'var(--ink-faint)',
                            fontSize: '12px',
                            fontWeight: 500,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <motion.div
                    variants={{ hover: { x: 4, color: 'var(--accent)' } }}
                    style={{ position: 'relative', color: 'var(--ink-faint)', flexShrink: 0 }}
                  >
                    <ArrowUpRight size={20} strokeWidth={1.8} />
                  </motion.div>
                </motion.div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div style={{ textAlign: 'center', marginTop: '40px' }}>
              <motion.div whileTap={{ scale: 0.97 }} style={{ display: 'inline-block' }}>
                <Link
                  href={`/${locale}/services`}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    border: '1px solid var(--line)',
                    color: 'var(--ink)',
                    padding: '13px 28px',
                    borderRadius: '100px',
                    fontWeight: 600,
                    fontSize: '14px',
                    textDecoration: 'none',
                  }}
                >
                  {t('nav.services')} <ArrowRight size={16} />
                </Link>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Markets — destinations strip, reusing the departures system */}
      <section style={{ padding: '110px 24px', background: 'var(--bg-elevated)', borderTop: '1px solid var(--line)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <Reveal>
            <div style={{ marginBottom: '48px', maxWidth: '620px' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: '14px' }}>
                {t('markets.title')}
              </h2>
              <p className="measure" style={{ color: 'var(--ink-dim)', fontSize: '16px', lineHeight: 1.7 }}>
                {t('markets.subtitle')}
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="markets-strip" style={{ display: 'flex', border: '1px solid var(--line)', borderRadius: '14px' }}>
              {markets.map((market, i) => (
                <div
                  key={market.code}
                  className="markets-cell"
                  style={{
                    flex: '1 1 0',
                    padding: '28px',
                    borderRight: i < markets.length - 1 ? '1px solid var(--line)' : 'none',
                  }}
                >
                  <div className="tabular" style={{ color: 'var(--accent)', fontSize: '13px', fontWeight: 700, marginBottom: '10px' }}>
                    {market.code}
                  </div>
                  <h3 style={{ color: 'var(--ink)', fontSize: '17px', fontWeight: 700, marginBottom: '8px', fontFamily: 'var(--font-display)' }}>
                    {market.name}
                  </h3>
                  <p style={{ color: 'var(--ink-dim)', fontSize: '13.5px', lineHeight: 1.65 }}>{market.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <style>{`
          @media (max-width: 720px) {
            .markets-strip { flex-direction: column !important; }
            .markets-cell {
              border-right: none !important;
              border-bottom: 1px solid var(--line);
            }
            .markets-cell:last-child { border-bottom: none; }
          }
        `}</style>
      </section>

      {/* About preview */}
      <section style={{ padding: '110px 24px', background: 'var(--bg)', borderTop: '1px solid var(--line)' }}>
        <div style={{ maxWidth: '1150px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '64px', alignItems: 'start' }}>
          <Reveal variants={fadeLeft} margin="-80px">
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: '14px' }}>
                {t('about.title')}
              </h2>
              <p style={{ fontSize: '17px', fontWeight: 600, color: 'var(--accent)', marginBottom: '18px' }}>
                {t('about.subtitle')}
              </p>
              <p className="measure" style={{ color: 'var(--ink-dim)', fontSize: '15.5px', lineHeight: 1.8, marginBottom: '28px' }}>
                {t('about.body')}
              </p>
              <motion.div whileTap={{ scale: 0.97 }} style={{ display: 'inline-block' }}>
                <Link
                  href={`/${locale}/about`}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    border: '1px solid var(--line)',
                    color: 'var(--ink)',
                    padding: '13px 26px',
                    borderRadius: '100px',
                    fontWeight: 600,
                    fontSize: '14px',
                    textDecoration: 'none',
                  }}
                >
                  {t('nav.about')} <ArrowRight size={16} />
                </Link>
              </motion.div>
            </div>
          </Reveal>

          <Reveal variants={fadeRight} margin="-80px">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {pillars.map((pillar, i) => (
                <div
                  key={i}
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--line)',
                    borderRadius: '14px',
                    padding: '22px',
                    display: 'flex',
                    gap: '14px',
                    alignItems: 'flex-start',
                  }}
                >
                  <CheckCircle2 size={19} strokeWidth={1.6} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <div style={{ color: 'var(--ink)', fontWeight: 700, fontSize: '15px', marginBottom: '4px' }}>{pillar.label}</div>
                    <div style={{ color: 'var(--ink-dim)', fontSize: '13.5px' }}>{pillar.value}</div>
                  </div>
                </div>
              ))}

              <div
                style={{
                  border: '1px solid var(--line)',
                  borderRadius: '14px',
                  padding: '22px',
                }}
              >
                <div style={{ color: 'var(--ink)', fontWeight: 700, marginBottom: '14px', fontSize: '14px' }}>{t('about.methodology.title')}</div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center' }}>
                  {steps.map((step, i) => (
                    <div key={step} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span
                        className="tabular"
                        style={{
                          border: '1px solid var(--accent-line)',
                          color: 'var(--accent)',
                          borderRadius: '100px',
                          padding: '4px 12px',
                          fontSize: '12px',
                          fontWeight: 700,
                        }}
                      >
                        {step}
                      </span>
                      {i < steps.length - 1 && <ArrowRight size={13} style={{ color: 'var(--ink-faint)' }} />}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{ padding: '90px 24px', background: 'var(--accent)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <Reveal>
          <div style={{ maxWidth: '680px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px, 4vw, 44px)', fontWeight: 700, color: 'var(--accent-ink)', letterSpacing: '-0.02em', marginBottom: '14px' }}>
              {t('contact.title')}
            </h2>
            <p style={{ color: 'rgba(28,19,4,0.72)', fontSize: '17px', marginBottom: '34px' }}>
              {t('contact.subtitle')}
            </p>
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <motion.div whileTap={{ scale: 0.97 }}>
                <Link
                  href={`/${locale}/contact`}
                  style={{
                    background: 'var(--accent-ink)',
                    color: 'var(--accent)',
                    padding: '16px 32px',
                    borderRadius: '100px',
                    fontWeight: 700,
                    fontSize: '15px',
                    textDecoration: 'none',
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                  }}
                >
                  {t('nav.contact')}
                </Link>
              </motion.div>
              <motion.div whileTap={{ scale: 0.97 }}>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  style={{
                    background: 'transparent',
                    border: '1.5px solid rgba(28,19,4,0.3)',
                    color: 'var(--accent-ink)',
                    padding: '16px 32px',
                    borderRadius: '100px',
                    fontWeight: 600,
                    fontSize: '15px',
                    textDecoration: 'none',
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                  }}
                >
                  <Mail size={17} strokeWidth={1.8} /> {t('contact.emailCta')}
                </a>
              </motion.div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
