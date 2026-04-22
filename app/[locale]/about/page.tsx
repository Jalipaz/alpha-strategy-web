'use client';

import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { MapPin, Globe, CheckCircle, ArrowRight, Target, Users, TrendingUp } from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } };
const fadeLeft = { hidden: { opacity: 0, x: -40 }, show: { opacity: 1, x: 0 } };
const fadeRight = { hidden: { opacity: 0, x: 40 }, show: { opacity: 1, x: 0 } };

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
        <motion.div
          animate={{ y: [0, -20, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', top: '-80px', right: '8%', width: '500px', height: '500px',
            background: 'radial-gradient(circle, rgba(255,107,53,0.08) 0%, transparent 70%)',
            borderRadius: '50%', pointerEvents: 'none',
          }}
        />
        <motion.div
          animate={{ y: [0, 18, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          style={{
            position: 'absolute', bottom: '-60px', left: '5%', width: '400px', height: '400px',
            background: 'radial-gradient(circle, rgba(0,180,216,0.07) 0%, transparent 70%)',
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
              background: 'rgba(0,212,255,0.08)',
              border: '1px solid rgba(0,212,255,0.2)',
              borderRadius: '100px',
              padding: '8px 18px',
              marginBottom: '24px',
            }}
          >
            <span style={{ color: '#00D4FF', fontSize: '13px', fontWeight: 600, letterSpacing: '0.06em' }}>
              About Us
            </span>
          </motion.div>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 60px)', fontWeight: 800, color: '#fff', marginBottom: '20px' }}>
            {t('about.title')}
          </h1>
          <p style={{
            fontSize: '22px', fontWeight: 600,
            background: 'linear-gradient(135deg, #FF6B35, #E91E8C)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            {t('about.subtitle')}
          </p>
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
            transition={{ duration: 0.7 }}
          >
            <p style={{ color: '#8892B0', fontSize: '17px', lineHeight: 1.9 }}>
              {t('about.body')}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '32px' }}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
              >
                <MapPin size={18} style={{ color: '#00D4FF' }} />
                <span style={{ color: '#fff', fontSize: '15px' }}>Headquarters: Miami, Florida, USA</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
              >
                <Globe size={18} style={{ color: '#00D4FF' }} />
                <span style={{ color: '#fff', fontSize: '15px' }}>{t('contact.info.reach')}</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
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
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
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
            transition={{ duration: 0.6 }}
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
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.55, delay: i * 0.12 }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  style={{
                    background: 'rgba(15,26,62,0.8)',
                    border: `1px solid ${pillarColors[i]}25`,
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
                  <div style={{
                    width: '64px', height: '64px', borderRadius: '16px', margin: '0 auto 20px',
                    background: `${pillarColors[i]}15`,
                    border: `1px solid ${pillarColors[i]}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon size={28} style={{ color: pillarColors[i] }} />
                  </div>
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
            transition={{ duration: 0.6 }}
            style={{ fontSize: 'clamp(24px, 3vw, 40px)', fontWeight: 800, color: '#fff', marginBottom: '48px' }}
          >
            {t('about.methodology.title')}
          </motion.h2>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0' }}>
            {steps.map((step, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <div style={{ textAlign: 'center', padding: '0 8px' }}>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
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
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '16px' }}>
            <CheckCircle size={20} style={{ color: '#00D4FF' }} />
            <span style={{ color: '#00D4FF', fontWeight: 600 }}>Ready to grow with us?</span>
          </div>
          <h2 style={{ fontSize: 'clamp(24px, 3vw, 44px)', fontWeight: 800, color: '#fff', marginBottom: '32px' }}>
            {t('contact.title')}
          </h2>
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
