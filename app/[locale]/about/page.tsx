'use client';

import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { MapPin, Globe, CheckCircle, ArrowRight, Target, Users, TrendingUp } from 'lucide-react';

const AnimatedHeroBg = dynamic(() => import('../../../components/AnimatedHeroBg'), { ssr: false });

const SPRING = { type: 'spring' as const, stiffness: 280, damping: 26, mass: 0.65 };
const SPRING_SLOW = { type: 'spring' as const, stiffness: 180, damping: 22, mass: 0.8 };

const fadeUp = {
  hidden: { opacity: 0, y: 36, filter: 'blur(4px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: SPRING },
};
const fadeLeft = {
  hidden: { opacity: 0, x: -44, filter: 'blur(4px)' },
  show: { opacity: 1, x: 0, filter: 'blur(0px)', transition: SPRING_SLOW },
};
const fadeRight = {
  hidden: { opacity: 0, x: 44, filter: 'blur(4px)' },
  show: { opacity: 1, x: 0, filter: 'blur(0px)', transition: SPRING_SLOW },
};

export default function AboutPage() {
  const t = useTranslations();
  const locale = useLocale();
  const pillars = t.raw('about.pillars') as Array<{ label: string; value: string }>;
  const steps = t.raw('about.methodology.steps') as string[];

  const pillarIcons = [TrendingUp, Users, Target];
  const pillarColors = ['#FF6B35', '#E91E8C', '#00B4D8'];

  return (
    <>
      {/* Header */}
      <section style={{
        paddingTop: '140px',
        paddingBottom: '80px',
        paddingLeft: '24px',
        paddingRight: '24px',
        background: 'linear-gradient(135deg, #060D26 0%, #0B1130 100%)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
        <AnimatedHeroBg />

        <motion.div
          initial={{ opacity: 0, y: 40, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={SPRING_SLOW}
          style={{ maxWidth: '700px', margin: '0 auto', position: 'relative', zIndex: 1 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ ...SPRING, delay: 0.05 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'rgba(0,212,255,0.08)',
              border: '1px solid rgba(0,212,255,0.25)',
              borderRadius: '100px',
              padding: '8px 18px',
              marginBottom: '24px',
            }}
          >
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#00D4FF', boxShadow: '0 0 8px #00D4FF' }} />
            <span style={{ color: '#00D4FF', fontSize: '13px', fontWeight: 600, letterSpacing: '0.06em' }}>
              About Us
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ ...SPRING, delay: 0.1 }}
            style={{ fontSize: 'clamp(32px, 5vw, 60px)', fontWeight: 800, color: '#fff', marginBottom: '20px' }}
          >
            {t('about.title')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...SPRING, delay: 0.18 }}
            style={{
              fontSize: '22px', fontWeight: 600,
              background: 'linear-gradient(135deg, #FF6B35, #E91E8C)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {t('about.subtitle')}
          </motion.p>
        </motion.div>
      </section>

      {/* Story + Stats */}
      <section style={{ padding: '80px 24px', background: '#0B1130' }}>
        <div style={{
          maxWidth: '1100px', margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '64px', alignItems: 'start',
        }}>
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
          >
            <p style={{ color: '#8892B0', fontSize: '17px', lineHeight: 1.9 }}>
              {t('about.body')}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '32px' }}>
              {[
                { icon: MapPin, text: 'Headquarters: Miami, Florida, USA' },
                { icon: Globe, text: t('contact.info.reach') },
              ].map(({ icon: Icon, text }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -24, filter: 'blur(4px)' }}
                  whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true }}
                  transition={{ ...SPRING, delay: 0.3 + i * 0.1 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
                >
                  <Icon size={18} style={{ color: '#00D4FF' }} />
                  <span style={{ color: '#fff', fontSize: '15px' }}>{text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}
          >
            {[
              { num: '3+', label: 'Markets', color: '#FF6B35' },
              { num: '100+', label: 'Clients', color: '#E91E8C' },
              { num: '5', label: 'Service Pillars', color: '#00B4D8' },
              { num: '3', label: 'Languages', color: '#0077FF' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.82, filter: 'blur(4px)' }}
                whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 300, damping: 24, mass: 0.65, delay: i * 0.09 }}
                whileHover={{ y: -6, scale: 1.04, transition: SPRING }}
                style={{
                  background: 'rgba(15,26,62,0.8)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '16px',
                  padding: '28px 24px',
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div style={{
                  position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
                  width: '50%', height: '2px',
                  background: `linear-gradient(90deg, ${stat.color}, ${stat.color}60)`,
                }} />
                <div style={{
                  fontSize: '40px', fontWeight: 800,
                  background: `linear-gradient(135deg, ${stat.color}, ${stat.color}99)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  {stat.num}
                </div>
                <div style={{ color: '#8892B0', fontSize: '14px', marginTop: '6px' }}>{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Three Pillars */}
      <section style={{ padding: '80px 24px', background: 'linear-gradient(135deg, #060D26, #0A1A3E)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            style={{ fontSize: 'clamp(24px, 3vw, 40px)', fontWeight: 800, color: '#fff', marginBottom: '48px', textAlign: 'center' }}
          >
            Our Three Strategic Dimensions
          </motion.h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {pillars.map((pillar, i) => {
              const Icon = pillarIcons[i];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 44, filter: 'blur(5px)' }}
                  whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ type: 'spring', stiffness: 260, damping: 24, mass: 0.7, delay: i * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02, transition: SPRING }}
                  style={{
                    background: 'rgba(15,26,62,0.8)',
                    border: `1px solid ${pillarColors[i]}28`,
                    borderRadius: '20px',
                    padding: '36px',
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                    background: `linear-gradient(90deg, ${pillarColors[i]}, ${pillarColors[i]}60)`,
                  }} />
                  <motion.div
                    whileHover={{ scale: 1.12, rotate: 5, transition: SPRING }}
                    style={{
                      width: '64px', height: '64px', borderRadius: '16px', margin: '0 auto 20px',
                      background: `${pillarColors[i]}15`,
                      border: `1px solid ${pillarColors[i]}30`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >
                    <Icon size={28} style={{ color: pillarColors[i] }} />
                  </motion.div>
                  <h3 style={{ color: '#fff', fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>{pillar.label}</h3>
                  <p style={{ color: '#8892B0', fontSize: '15px', lineHeight: 1.7 }}>{pillar.value}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section style={{ padding: '80px 24px', background: '#0B1130' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            style={{ fontSize: 'clamp(24px, 3vw, 40px)', fontWeight: 800, color: '#fff', marginBottom: '48px' }}
          >
            {t('about.methodology.title')}
          </motion.h2>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0' }}>
            {steps.map((step, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 28, filter: 'blur(4px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 280, damping: 24, mass: 0.65, delay: i * 0.1 }}
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <div style={{ textAlign: 'center', padding: '0 8px' }}>
                  <motion.div
                    whileHover={{ scale: 1.15, transition: SPRING }}
                    style={{
                      width: '64px', height: '64px', borderRadius: '50%', margin: '0 auto 12px',
                      background: `linear-gradient(135deg, #FF6B35 ${i * 20}%, #0077FF ${100 - i * 15}%)`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 800, color: '#fff', fontSize: '18px',
                      boxShadow: '0 6px 20px rgba(255,107,53,0.25)',
                    }}
                  >
                    {i + 1}
                  </motion.div>
                  <div style={{ color: '#fff', fontWeight: 600, fontSize: '14px', whiteSpace: 'nowrap' }}>{step}</div>
                </div>
                {i < steps.length - 1 && (
                  <div style={{ width: '40px', height: '2px', background: 'linear-gradient(90deg, #FF6B35, #00B4D8)', marginBottom: '28px', flexShrink: 0 }} />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 24px', textAlign: 'center', background: 'linear-gradient(135deg, #060D26, #0B1130)' }}>
        <motion.div
          initial={{ opacity: 0, y: 36, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={SPRING_SLOW}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '16px' }}>
            <CheckCircle size={20} style={{ color: '#00D4FF' }} />
            <span style={{ color: '#00D4FF', fontWeight: 600 }}>Ready to grow with us?</span>
          </div>
          <h2 style={{ fontSize: 'clamp(24px, 3vw, 44px)', fontWeight: 800, color: '#fff', marginBottom: '32px' }}>
            {t('contact.title')}
          </h2>
          <motion.div whileHover={{ scale: 1.05, y: -3, transition: SPRING }} whileTap={{ scale: 0.97 }} style={{ display: 'inline-block' }}>
            <Link
              href={`/${locale}/contact`}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: 'linear-gradient(135deg, #FF6B35, #E91E8C)',
                color: '#fff',
                padding: '16px 36px',
                borderRadius: '10px',
                fontWeight: 700,
                fontSize: '16px',
                textDecoration: 'none',
                boxShadow: '0 8px 32px rgba(255,107,53,0.3)',
              }}
            >
              {t('nav.contact')} <ArrowRight size={18} />
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
