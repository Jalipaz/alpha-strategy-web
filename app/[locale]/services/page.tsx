'use client';

import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { BarChart3, Megaphone, Zap, Globe, GraduationCap, Languages, ArrowRight } from 'lucide-react';

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
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', top: '-100px', right: '10%', width: '400px', height: '400px',
            background: 'radial-gradient(circle, rgba(0,180,216,0.10) 0%, transparent 70%)',
            borderRadius: '50%', pointerEvents: 'none',
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{ maxWidth: '700px', margin: '0 auto', position: 'relative', zIndex: 1 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'rgba(255,107,53,0.08)',
              border: '1px solid rgba(255,107,53,0.2)',
              borderRadius: '100px',
              padding: '8px 18px',
              marginBottom: '24px',
            }}
          >
            <span style={{ color: '#FF6B35', fontSize: '13px', fontWeight: 600, letterSpacing: '0.06em' }}>
              Our Services
            </span>
          </motion.div>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 60px)', fontWeight: 800, color: '#fff', marginBottom: '20px' }}>
            {t('services.title')}
          </h1>
          <p style={{ color: '#8892B0', fontSize: '18px', lineHeight: 1.7 }}>
            {t('services.subtitle')}
          </p>
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
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.55, delay: i * 0.09 }}
                  whileHover={{ y: -8, transition: { duration: 0.25 } }}
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

                  {/* Gradient accent top-right */}
                  <div style={{
                    position: 'absolute', top: 0, right: 0, width: '140px', height: '140px',
                    background: `radial-gradient(circle, ${color.from}18 0%, transparent 70%)`,
                    pointerEvents: 'none',
                  }} />

                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      width: '60px', height: '60px',
                      background: `linear-gradient(135deg, ${color.from}, ${color.to})`,
                      borderRadius: '14px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginBottom: '24px',
                      boxShadow: `0 8px 24px ${color.from}40`,
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
                      <span
                        key={tag}
                        style={{
                          background: `${color.from}12`,
                          border: `1px solid ${color.from}30`,
                          color: color.from,
                          padding: '5px 12px',
                          borderRadius: '100px',
                          fontSize: '12px',
                          fontWeight: 600,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

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
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 style={{ fontSize: 'clamp(24px, 3vw, 40px)', fontWeight: 800, color: '#fff', marginBottom: '16px' }}>
            {t('contact.title')}
          </h2>
          <p style={{ color: '#8892B0', fontSize: '17px', marginBottom: '32px' }}>
            {t('contact.subtitle')}
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} style={{ display: 'inline-block' }}>
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
