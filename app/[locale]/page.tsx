'use client';

import { motion, useInView } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useRef, useEffect, useState } from 'react';

const AnimatedHeroBg = dynamic(() => import('../../components/AnimatedHeroBg'), { ssr: false });

function CountUp({ to, suffix = '', duration = 1600 }: { to: number; suffix?: string; duration?: number }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    const total = Math.round(duration / 16);
    const timer = setInterval(() => {
      frame++;
      setVal(Math.round((frame / total) * to));
      if (frame >= total) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, to, duration]);

  return <span ref={ref}>{val}{suffix}</span>;
}
import { BarChart3, Megaphone, Zap, Globe, GraduationCap, Languages, ArrowRight, MapPin, CheckCircle, Monitor, Smartphone, Search, ShieldCheck, Settings2, Languages as Lang } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  BarChart3, Megaphone, Zap, Globe, GraduationCap, Languages,
};

const serviceColors = [
  { from: '#FF6B35', to: '#E91E8C' },
  { from: '#E91E8C', to: '#9C27B0' },
  { from: '#00B4D8', to: '#0077FF' },
  { from: '#0077FF', to: '#00B4D8' },
  { from: '#FF6B35', to: '#FF9800' },
  { from: '#00D4FF', to: '#00B4D8' },
];

// Crisp ease-out spring — matches Remotion's bezier(0.16, 1, 0.3, 1)
const SPRING_ENTER = { type: 'spring' as const, stiffness: 300, damping: 28, mass: 0.6 };
// Slower editorial spring for large elements
const SPRING_SLOW = { type: 'spring' as const, stiffness: 180, damping: 22, mass: 0.8 };

const fadeUp = {
  hidden: { opacity: 0, y: 36, filter: 'blur(4px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: SPRING_ENTER },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -40, filter: 'blur(4px)' },
  show: { opacity: 1, x: 0, filter: 'blur(0px)', transition: SPRING_SLOW },
};

const fadeRight = {
  hidden: { opacity: 0, x: 40, filter: 'blur(4px)' },
  show: { opacity: 1, x: 0, filter: 'blur(0px)', transition: SPRING_SLOW },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const staggerFast = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

const featureIcons = [Monitor, Smartphone, Search, ShieldCheck, Settings2, Lang];

// Kinetic per-word animation — each word slides up with a spring
function KineticWords({ text, style }: { text: string; style?: React.CSSProperties }) {
  const words = text.split(' ');
  return (
    <span style={{ display: 'inline', ...style }}>
      {words.map((word, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', marginRight: '0.25em' }}>
          <motion.span
            style={{ display: 'inline-block' }}
            variants={{
              hidden: { y: '110%', opacity: 0 },
              show: {
                y: '0%',
                opacity: 1,
                transition: { type: 'spring', stiffness: 260, damping: 22, mass: 0.6, delay: i * 0.06 },
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

export default function HomePage() {
  const t = useTranslations();
  const locale = useLocale();
  const services = t.raw('services.items') as Array<{ icon: string; title: string; desc: string; tags: string[] }>;
  const pillars = t.raw('about.pillars') as Array<{ label: string; value: string }>;
  const steps = t.raw('about.methodology.steps') as string[];
  const webFeatures = t.raw('webDesign.features') as Array<{ title: string; desc: string }>;
  const webTypes = t.raw('webDesign.types') as string[];

  return (
    <>
      {/* Hero */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #060D26 0%, #0B1130 50%, #0A1A3E 100%)',
      }}>
        {/* Dot grid */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />

        {/* Canvas orb background — Remotion BrandLoop-style */}
        <AnimatedHeroBg />

        {/* Animated orbs */}
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: [1, 1.05, 1], opacity: [0.7, 1, 0.7], y: [0, -24, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', top: '10%', left: '3%', width: '560px', height: '560px',
            background: 'radial-gradient(circle, rgba(233,30,140,0.14) 0%, transparent 70%)',
            borderRadius: '50%', pointerEvents: 'none',
          }}
        />
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6], y: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
          style={{
            position: 'absolute', bottom: '5%', right: '3%', width: '640px', height: '640px',
            background: 'radial-gradient(circle, rgba(0,180,216,0.12) 0%, transparent 70%)',
            borderRadius: '50%', pointerEvents: 'none',
          }}
        />
        <motion.div
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.9, 0.5], y: [0, -12, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
          style={{
            position: 'absolute', top: '50%', right: '20%', width: '300px', height: '300px',
            background: 'radial-gradient(circle, rgba(255,107,53,0.09) 0%, transparent 70%)',
            borderRadius: '50%', pointerEvents: 'none',
          }}
        />

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '120px 24px 80px', position: 'relative', zIndex: 1 }}>
          <motion.div variants={stagger} initial="hidden" animate="show">
            {/* Badge */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 16, scale: 0.92 },
                show: { opacity: 1, y: 0, scale: 1, transition: { ...SPRING_ENTER, delay: 0 } },
              }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: 'rgba(0,212,255,0.08)',
                border: '1px solid rgba(0,212,255,0.2)',
                borderRadius: '100px',
                padding: '8px 18px',
                marginBottom: '32px',
              }}>
              <MapPin size={14} style={{ color: '#00D4FF' }} />
              <span style={{ color: '#00D4FF', fontSize: '13px', fontWeight: 600, letterSpacing: '0.06em' }}>
                {t('hero.tagline')} · Miami, USA
              </span>
            </motion.div>

            {/* Headline — kinetic per-word spring entrance */}
            <motion.h1
              variants={staggerFast}
              style={{ fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 800, lineHeight: 1.15, marginBottom: '24px', maxWidth: '820px' }}
            >
              <KineticWords text={t('hero.headline1')} style={{ color: '#fff', display: 'block' }} />
              <KineticWords
                text={t('hero.headline2')}
                style={{
                  background: 'linear-gradient(135deg, #FF6B35, #E91E8C, #00B4D8)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  display: 'block',
                }}
              />
            </motion.h1>

            <motion.p variants={fadeUp} style={{
              fontSize: 'clamp(16px, 2vw, 20px)',
              color: '#8892B0',
              lineHeight: 1.7,
              maxWidth: '620px',
              marginBottom: '40px',
            }}>
              {t('hero.sub')}
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp}
              style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.96 }} transition={SPRING_ENTER}>
                <Link
                  href={`/${locale}/services`}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    background: 'linear-gradient(135deg, #FF6B35, #E91E8C)',
                    color: '#fff',
                    padding: '16px 32px',
                    borderRadius: '10px',
                    fontWeight: 700,
                    fontSize: '16px',
                    textDecoration: 'none',
                    boxShadow: '0 8px 32px rgba(255,107,53,0.3)',
                  }}
                >
                  {t('hero.cta1')} <ArrowRight size={18} />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.96 }} transition={SPRING_ENTER}>
                <Link
                  href={`/${locale}/contact`}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    color: '#fff',
                    padding: '16px 32px',
                    borderRadius: '10px',
                    fontWeight: 600,
                    fontSize: '16px',
                    textDecoration: 'none',
                  }}
                >
                  {t('hero.cta2')}
                </Link>
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={stagger}
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '0',
                marginTop: '72px',
                flexWrap: 'wrap',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '20px',
                overflow: 'hidden',
                maxWidth: '680px',
              }}
            >
              {[
                { to: 4, suffix: '+', label: 'Markets', color: { from: '#00D4FF', to: '#0077FF' } },
                { to: 100, suffix: '+', label: 'Clients', color: { from: '#FF6B35', to: '#E91E8C' } },
                { to: 5, suffix: '', label: 'Service Pillars', color: { from: '#E91E8C', to: '#9C27B0' } },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  variants={fadeUp}
                  transition={{ duration: 0.6 }}
                  style={{
                    flex: '1 1 160px',
                    textAlign: 'center',
                    padding: '36px 24px',
                    borderRight: i < 2 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <div style={{
                    position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
                    width: '60%', height: '2px',
                    background: `linear-gradient(90deg, ${stat.color.from}, ${stat.color.to})`,
                    borderRadius: '2px',
                  }} />
                  <div style={{
                    fontSize: '64px',
                    fontWeight: 800,
                    lineHeight: 1,
                    background: `linear-gradient(135deg, ${stat.color.from}, ${stat.color.to})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    marginBottom: '10px',
                  }}>
                    <CountUp to={stat.to} suffix={stat.suffix} />
                  </div>
                  <div style={{ color: '#8892B0', fontSize: '15px', fontWeight: 500, letterSpacing: '0.02em' }}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trust strip */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        style={{
          background: 'rgba(255,255,255,0.02)',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          padding: '20px 24px',
        }}
      >
        <div style={{
          maxWidth: '1200px', margin: '0 auto',
          display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
          gap: '12px 40px', alignItems: 'center',
        }}>
          {[
            '✦ Business Strategy',
            '✦ Digital Marketing',
            '✦ Web Design',
            '✦ Business Training',
            '✦ EN / ES / PT',
          ].map((item) => (
            <span key={item} style={{
              color: '#8892B0',
              fontSize: '13px',
              fontWeight: 500,
              letterSpacing: '0.04em',
              whiteSpace: 'nowrap',
            }}>
              {item}
            </span>
          ))}
        </div>
      </motion.section>

      {/* Services */}
      <section id="services" style={{ padding: '100px 24px', background: '#0B1130' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', marginBottom: '64px' }}
          >
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, color: '#fff', marginBottom: '16px' }}>
              {t('services.title')}
            </h2>
            <p style={{ color: '#8892B0', fontSize: '18px', maxWidth: '600px', margin: '0 auto' }}>
              {t('services.subtitle')}
            </p>
          </motion.div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
          }}>
            {services.map((service, i) => {
              const Icon = iconMap[service.icon];
              const color = serviceColors[i];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 48, filter: 'blur(6px)' }}
                  whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ type: 'spring', stiffness: 260, damping: 24, mass: 0.7, delay: i * 0.07 }}
                  whileHover={{ y: -8, scale: 1.02, transition: SPRING_ENTER }}
                  style={{
                    background: 'rgba(15, 26, 62, 0.7)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '16px',
                    padding: '32px',
                    cursor: 'default',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Glow on card top */}
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                    background: `linear-gradient(90deg, ${color.from}, ${color.to})`,
                    opacity: 0.7,
                  }} />

                  <div style={{
                    width: '52px', height: '52px',
                    background: `linear-gradient(135deg, ${color.from}, ${color.to})`,
                    borderRadius: '12px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '20px',
                    boxShadow: `0 8px 24px ${color.from}40`,
                  }}>
                    {Icon && <Icon size={24} color="#fff" />}
                  </div>
                  <h3 style={{ color: '#fff', fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>
                    {service.title}
                  </h3>
                  <p style={{ color: '#8892B0', fontSize: '15px', lineHeight: 1.7, marginBottom: '20px' }}>
                    {service.desc}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          background: `linear-gradient(135deg, ${color.from}15, ${color.to}15)`,
                          border: `1px solid ${color.from}30`,
                          color: color.from,
                          padding: '4px 10px',
                          borderRadius: '100px',
                          fontSize: '12px',
                          fontWeight: 600,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ textAlign: 'center', marginTop: '48px' }}
          >
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} style={{ display: 'inline-block' }}>
              <Link
                href={`/${locale}/services`}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  border: '1px solid rgba(0,212,255,0.3)',
                  color: '#00D4FF',
                  padding: '14px 32px',
                  borderRadius: '10px',
                  fontWeight: 600,
                  fontSize: '15px',
                  textDecoration: 'none',
                }}
              >
                {t('nav.services')} <ArrowRight size={16} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Web Design Showcase */}
      <section style={{ padding: '100px 24px', background: '#060D26', position: 'relative', overflow: 'hidden' }}>
        {/* Background grid */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(rgba(0,212,255,0.04) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
        {/* Glow */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', top: '50%', left: '-10%', transform: 'translateY(-50%)',
            width: '500px', height: '500px',
            background: 'radial-gradient(circle, rgba(0,119,255,0.12) 0%, transparent 70%)',
            borderRadius: '50%', pointerEvents: 'none',
          }}
        />

        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', marginBottom: '72px' }}
          >
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'rgba(0,119,255,0.08)',
              border: '1px solid rgba(0,119,255,0.25)',
              borderRadius: '100px',
              padding: '8px 18px',
              marginBottom: '24px',
            }}>
              <Monitor size={14} style={{ color: '#0077FF' }} />
              <span style={{ color: '#0077FF', fontSize: '13px', fontWeight: 600, letterSpacing: '0.06em' }}>
                {t('webDesign.badge')}
              </span>
            </div>
            <h2 style={{ fontSize: 'clamp(30px, 4.5vw, 54px)', fontWeight: 800, color: '#fff', marginBottom: '16px' }}>
              {t('webDesign.title')}
            </h2>
            <p style={{ color: '#8892B0', fontSize: '18px', maxWidth: '620px', margin: '0 auto', lineHeight: 1.7 }}>
              {t('webDesign.subtitle')}
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '48px', alignItems: 'center' }}>
            {/* Browser Mockup */}
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              style={{ order: 0 }}
            >
              {/* Browser chrome */}
              <div style={{
                background: '#0D1B3E',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,119,255,0.1)',
              }}>
                {/* Browser bar */}
                <div style={{
                  background: 'rgba(255,255,255,0.04)',
                  borderBottom: '1px solid rgba(255,255,255,0.07)',
                  padding: '12px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {['#FF5F57', '#FFBD2E', '#28CA41'].map((c) => (
                      <div key={c} style={{ width: '12px', height: '12px', borderRadius: '50%', background: c }} />
                    ))}
                  </div>
                  <div style={{
                    flex: 1,
                    background: 'rgba(255,255,255,0.06)',
                    borderRadius: '6px',
                    padding: '6px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}>
                    <ShieldCheck size={12} style={{ color: '#28CA41' }} />
                    <span style={{ color: '#8892B0', fontSize: '12px' }}>yourclient.com</span>
                  </div>
                </div>
                {/* Website preview */}
                <div style={{ padding: '0', background: '#060D26' }}>
                  {/* Fake hero */}
                  <div style={{
                    padding: '32px 24px 24px',
                    background: 'linear-gradient(135deg, #060D26, #0B1130)',
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                  }}>
                    <motion.div
                      animate={{ opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      style={{
                        height: '12px', width: '70%', borderRadius: '6px',
                        background: 'linear-gradient(90deg, #FF6B35, #E91E8C)',
                        marginBottom: '10px',
                      }}
                    />
                    <div style={{ height: '8px', width: '90%', borderRadius: '4px', background: 'rgba(255,255,255,0.08)', marginBottom: '6px' }} />
                    <div style={{ height: '8px', width: '60%', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', marginBottom: '18px' }} />
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <div style={{ height: '28px', width: '90px', borderRadius: '6px', background: 'linear-gradient(90deg, #FF6B35, #E91E8C)' }} />
                      <div style={{ height: '28px', width: '80px', borderRadius: '6px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }} />
                    </div>
                  </div>
                  {/* Fake service cards row */}
                  <div style={{ padding: '20px 24px', display: 'flex', gap: '10px' }}>
                    {[
                      { from: '#FF6B35', to: '#E91E8C' },
                      { from: '#00B4D8', to: '#0077FF' },
                      { from: '#9C27B0', to: '#E91E8C' },
                    ].map((c, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + i * 0.15, duration: 0.4 }}
                        style={{
                          flex: 1,
                          background: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(255,255,255,0.07)',
                          borderRadius: '8px',
                          padding: '12px 10px',
                        }}
                      >
                        <div style={{ width: '20px', height: '20px', borderRadius: '4px', background: `linear-gradient(135deg, ${c.from}, ${c.to})`, marginBottom: '8px' }} />
                        <div style={{ height: '6px', width: '80%', borderRadius: '3px', background: 'rgba(255,255,255,0.12)', marginBottom: '5px' }} />
                        <div style={{ height: '5px', width: '60%', borderRadius: '3px', background: 'rgba(255,255,255,0.06)' }} />
                      </motion.div>
                    ))}
                  </div>
                  {/* Fake CTA bar */}
                  <div style={{
                    margin: '0 24px 20px',
                    padding: '14px',
                    background: 'linear-gradient(135deg, rgba(255,107,53,0.15), rgba(0,119,255,0.15))',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                    <div>
                      <div style={{ height: '7px', width: '120px', borderRadius: '3px', background: 'rgba(255,255,255,0.2)', marginBottom: '5px' }} />
                      <div style={{ height: '5px', width: '80px', borderRadius: '3px', background: 'rgba(255,255,255,0.08)' }} />
                    </div>
                    <motion.div
                      animate={{ scale: [1, 1.04, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      style={{ height: '26px', width: '72px', borderRadius: '6px', background: 'linear-gradient(90deg, #FF6B35, #E91E8C)' }}
                    />
                  </div>
                </div>
              </div>

              {/* Site types pill row */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '20px', justifyContent: 'center' }}>
                {webTypes.map((type) => (
                  <span key={type} style={{
                    background: 'rgba(0,119,255,0.08)',
                    border: '1px solid rgba(0,119,255,0.2)',
                    color: '#00D4FF',
                    padding: '5px 12px',
                    borderRadius: '100px',
                    fontSize: '12px',
                    fontWeight: 600,
                  }}>{type}</span>
                ))}
              </div>
            </motion.div>

            {/* Feature grid */}
            <motion.div
              variants={fadeRight}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}
            >
              {webFeatures.map((feature, i) => {
                const FeatureIcon = featureIcons[i];
                const colors = [
                  { from: '#FF6B35', to: '#E91E8C' },
                  { from: '#00B4D8', to: '#0077FF' },
                  { from: '#E91E8C', to: '#9C27B0' },
                  { from: '#28CA41', to: '#00B4D8' },
                  { from: '#9C27B0', to: '#0077FF' },
                  { from: '#FF9800', to: '#FF6B35' },
                ];
                const c = colors[i];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 28, filter: 'blur(4px)' }}
                    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 300, damping: 26, mass: 0.6, delay: i * 0.06 }}
                    whileHover={{ y: -6, scale: 1.03, transition: SPRING_ENTER }}
                    style={{
                      background: 'rgba(15,26,62,0.7)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      borderRadius: '14px',
                      padding: '22px 18px',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    <div style={{
                      position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                      background: `linear-gradient(90deg, ${c.from}, ${c.to})`,
                    }} />
                    <div style={{
                      width: '40px', height: '40px',
                      background: `linear-gradient(135deg, ${c.from}20, ${c.to}20)`,
                      border: `1px solid ${c.from}30`,
                      borderRadius: '10px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginBottom: '12px',
                    }}>
                      <FeatureIcon size={18} style={{ color: c.from }} />
                    </div>
                    <div style={{ color: '#fff', fontWeight: 700, fontSize: '14px', marginBottom: '6px' }}>{feature.title}</div>
                    <div style={{ color: '#8892B0', fontSize: '13px', lineHeight: 1.6 }}>{feature.desc}</div>
                  </motion.div>
                );
              })}

              {/* CTA card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 }}
                style={{ gridColumn: '1 / -1' }}
              >
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <a
                    href="https://wa.me/59175025505"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                      background: 'linear-gradient(135deg, #0077FF, #00B4D8)',
                      color: '#fff',
                      padding: '18px 32px',
                      borderRadius: '12px',
                      fontWeight: 700,
                      fontSize: '16px',
                      textDecoration: 'none',
                      boxShadow: '0 12px 40px rgba(0,119,255,0.3)',
                    }}
                  >
                    {t('webDesign.cta')} <ArrowRight size={18} />
                  </a>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About preview */}
      <section style={{ padding: '100px 24px', background: 'linear-gradient(135deg, #060D26, #0B1130)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '64px', alignItems: 'center' }}>
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
          >
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: '#fff', marginBottom: '16px' }}>
              {t('about.title')}
            </h2>
            <p style={{
              fontSize: '20px', fontWeight: 600, marginBottom: '20px',
              background: 'linear-gradient(135deg, #FF6B35, #E91E8C)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              {t('about.subtitle')}
            </p>
            <p style={{ color: '#8892B0', fontSize: '16px', lineHeight: 1.8, marginBottom: '32px' }}>
              {t('about.body')}
            </p>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} style={{ display: 'inline-block' }}>
              <Link
                href={`/${locale}/about`}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  background: 'linear-gradient(135deg, #00B4D8, #0077FF)',
                  color: '#fff',
                  padding: '14px 28px',
                  borderRadius: '10px',
                  fontWeight: 600,
                  fontSize: '15px',
                  textDecoration: 'none',
                  boxShadow: '0 8px 24px rgba(0,180,216,0.25)',
                }}
              >
                {t('nav.about')} <ArrowRight size={16} />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          >
            {pillars.map((pillar, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ x: 6, scale: 1.01, transition: SPRING_ENTER }}
                style={{
                  background: 'rgba(15,26,62,0.7)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '12px',
                  padding: '24px',
                  display: 'flex',
                  gap: '16px',
                  alignItems: 'flex-start',
                }}
              >
                <CheckCircle size={20} style={{ color: '#00D4FF', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ color: '#fff', fontWeight: 700, fontSize: '16px', marginBottom: '4px' }}>{pillar.label}</div>
                  <div style={{ color: '#8892B0', fontSize: '14px' }}>{pillar.value}</div>
                </div>
              </motion.div>
            ))}

            {/* Methodology */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              style={{
                background: 'linear-gradient(135deg, rgba(255,107,53,0.08), rgba(0,119,255,0.08))',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '12px',
                padding: '24px',
                marginTop: '8px',
              }}
            >
              <div style={{ color: '#fff', fontWeight: 700, marginBottom: '16px', fontSize: '15px' }}>{t('about.methodology.title')}</div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {steps.map((step, i) => (
                  <div key={step} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{
                      background: 'linear-gradient(135deg, #FF6B35, #E91E8C)',
                      color: '#fff',
                      borderRadius: '100px',
                      padding: '4px 12px',
                      fontSize: '13px',
                      fontWeight: 600,
                    }}>{step}</span>
                    {i < steps.length - 1 && <ArrowRight size={14} style={{ color: '#8892B0' }} />}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Banner */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{
          padding: '80px 24px',
          background: 'linear-gradient(135deg, #FF6B35, #E91E8C, #9C27B0, #0077FF)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }} />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ maxWidth: '700px', margin: '0 auto', position: 'relative', zIndex: 1 }}
        >
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, color: '#fff', marginBottom: '16px' }}>
            {t('contact.title')}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '18px', marginBottom: '36px' }}>
            {t('contact.subtitle')}
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link
                href={`/${locale}/contact`}
                style={{
                  background: 'rgba(255,255,255,0.95)',
                  color: '#0B1130',
                  padding: '16px 32px',
                  borderRadius: '10px',
                  fontWeight: 700,
                  fontSize: '16px',
                  textDecoration: 'none',
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                }}
              >
                {t('nav.contact')}
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <a
                href="https://wa.me/59175025505"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  border: '2px solid rgba(255,255,255,0.3)',
                  color: '#fff',
                  padding: '16px 32px',
                  borderRadius: '10px',
                  fontWeight: 600,
                  fontSize: '16px',
                  textDecoration: 'none',
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                }}
              >
                {t('contact.whatsapp')}
              </a>
            </motion.div>
          </div>
        </motion.div>
      </motion.section>
    </>
  );
}
