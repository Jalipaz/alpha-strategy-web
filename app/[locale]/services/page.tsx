'use client';

import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { BarChart3, Megaphone, Zap, Globe, GraduationCap, Languages, ArrowRight } from 'lucide-react';

const AnimatedHeroBg = dynamic(() => import('../../../components/AnimatedHeroBg'), { ssr: false });

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

const SPRING = { type: 'spring' as const, stiffness: 280, damping: 26, mass: 0.65 };
const SPRING_SLOW = { type: 'spring' as const, stiffness: 180, damping: 22, mass: 0.8 };

export default function ServicesPage() {
  const t = useTranslations();
  const locale = useLocale();
  const services = t.raw('services.items') as Array<{ icon: string; title: string; desc: string; tags: string[] }>;

  return (
    <>
      {/* Page header */}
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
              background: 'rgba(255,107,53,0.08)',
              border: '1px solid rgba(255,107,53,0.25)',
              borderRadius: '100px',
              padding: '8px 18px',
              marginBottom: '24px',
            }}
          >
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#FF6B35', boxShadow: '0 0 8px #FF6B35' }} />
            <span style={{ color: '#FF6B35', fontSize: '13px', fontWeight: 600, letterSpacing: '0.06em' }}>
              Our Services
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ ...SPRING, delay: 0.1 }}
            style={{ fontSize: 'clamp(32px, 5vw, 60px)', fontWeight: 800, color: '#fff', marginBottom: '20px' }}
          >
            {t('services.title')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...SPRING, delay: 0.18 }}
            style={{ color: '#8892B0', fontSize: '18px', lineHeight: 1.7 }}
          >
            {t('services.subtitle')}
          </motion.p>
        </motion.div>
      </section>

      {/* Services grid */}
      <section style={{ padding: '80px 24px 120px', background: '#0B1130' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '28px' }}>
            {services.map((service, i) => {
              const Icon = iconMap[service.icon];
              const color = serviceColors[i];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 52, filter: 'blur(6px)' }}
                  whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ type: 'spring', stiffness: 260, damping: 24, mass: 0.7, delay: i * 0.07 }}
                  whileHover={{ y: -10, scale: 1.02, transition: SPRING }}
                  style={{
                    background: 'rgba(15,26,62,0.8)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '20px',
                    padding: '36px',
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: 'default',
                  }}
                >
                  {/* Top gradient line */}
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                    background: `linear-gradient(90deg, ${color.from}, ${color.to})`,
                  }} />
                  {/* Gradient glow corner */}
                  <div style={{
                    position: 'absolute', top: 0, right: 0, width: '160px', height: '160px',
                    background: `radial-gradient(circle, ${color.from}18 0%, transparent 70%)`,
                    pointerEvents: 'none',
                  }} />

                  <motion.div
                    whileHover={{ scale: 1.12, rotate: 6, transition: SPRING }}
                    style={{
                      width: '60px', height: '60px',
                      background: `linear-gradient(135deg, ${color.from}, ${color.to})`,
                      borderRadius: '14px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginBottom: '24px',
                      boxShadow: `0 8px 28px ${color.from}45`,
                    }}
                  >
                    {Icon && <Icon size={28} color="#fff" />}
                  </motion.div>

                  <h3 style={{ color: '#fff', fontSize: '22px', fontWeight: 700, marginBottom: '14px' }}>
                    {service.title}
                  </h3>
                  <p style={{ color: '#8892B0', fontSize: '15px', lineHeight: 1.8, marginBottom: '24px' }}>
                    {service.desc}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '28px' }}>
                    {service.tags.map((tag) => (
                      <motion.span
                        key={tag}
                        whileHover={{ scale: 1.06, transition: SPRING }}
                        style={{
                          background: `${color.from}12`,
                          border: `1px solid ${color.from}35`,
                          color: color.from,
                          padding: '5px 12px',
                          borderRadius: '100px',
                          fontSize: '12px',
                          fontWeight: 600,
                          display: 'inline-block',
                        }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>

                  <motion.div whileHover={{ x: 4, transition: SPRING }} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <Link
                      href={`/${locale}/contact`}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '6px',
                        color: color.from,
                        fontSize: '14px',
                        fontWeight: 600,
                        textDecoration: 'none',
                      }}
                    >
                      {t('hero.cta2')} <ArrowRight size={14} />
                    </Link>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{
        padding: '80px 24px',
        background: 'linear-gradient(135deg, #060D26, #0B1130)',
        textAlign: 'center',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 36, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={SPRING_SLOW}
        >
          <h2 style={{ fontSize: 'clamp(24px, 3vw, 40px)', fontWeight: 800, color: '#fff', marginBottom: '16px' }}>
            {t('contact.title')}
          </h2>
          <p style={{ color: '#8892B0', fontSize: '17px', marginBottom: '32px' }}>
            {t('contact.subtitle')}
          </p>
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
