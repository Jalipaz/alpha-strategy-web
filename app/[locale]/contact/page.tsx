'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { MapPin, Globe, MessageCircle, Send, CheckCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

const AnimatedHeroBg = dynamic(() => import('../../../components/AnimatedHeroBg'), { ssr: false });

const EMAILJS_SERVICE_ID = 'service_2y5hqth';
const EMAILJS_TEMPLATE_ID = 'template_r64k81p';
const EMAILJS_PUBLIC_KEY = '7Ls4seAxfJtuDhr8O';

const SPRING = { type: 'spring' as const, stiffness: 280, damping: 26, mass: 0.65 };
const SPRING_SLOW = { type: 'spring' as const, stiffness: 180, damping: 22, mass: 0.8 };

export default function ContactPage() {
  const t = useTranslations('contact');
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [focused, setFocused] = useState<string | null>(null);

  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setError('');
    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        name: form.name,
        email: form.email,
        company: form.company || 'N/A',
        message: form.message,
      });
      setSent(true);
    } catch (err) {
      console.error('EmailJS error:', err);
      setError('Something went wrong. Please try again or contact us via WhatsApp.');
    } finally {
      setSending(false);
    }
  }

  const inputStyle = (name: string): React.CSSProperties => ({
    width: '100%',
    padding: '14px 18px',
    background: focused === name ? 'rgba(0,212,255,0.05)' : 'rgba(255,255,255,0.05)',
    border: `1px solid ${focused === name ? '#00D4FF' : 'rgba(255,255,255,0.1)'}`,
    borderRadius: '10px',
    color: '#fff',
    fontSize: '15px',
    outline: 'none',
    transition: 'border-color 0.2s, background 0.2s',
    boxSizing: 'border-box',
  });

  const labelStyle: React.CSSProperties = {
    color: '#8892B0',
    fontSize: '13px',
    fontWeight: 600,
    display: 'block',
    marginBottom: '8px',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
  };

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
          style={{ position: 'relative', zIndex: 1 }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 28, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ ...SPRING, delay: 0.08 }}
            style={{ fontSize: 'clamp(32px, 5vw, 60px)', fontWeight: 800, color: '#fff', marginBottom: '16px' }}
          >
            {t('title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...SPRING, delay: 0.16 }}
            style={{ color: '#8892B0', fontSize: '18px' }}
          >
            {t('subtitle')}
          </motion.p>
        </motion.div>
      </section>

      {/* Content */}
      <section style={{ padding: '80px 24px 120px', background: '#0B1130' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '48px' }}>
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -44, filter: 'blur(5px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            transition={{ ...SPRING_SLOW, delay: 0.1 }}
            style={{
              background: 'rgba(15,26,62,0.8)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '20px',
              padding: '40px',
            }}
          >
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.88, filter: 'blur(4px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                transition={SPRING}
                style={{ textAlign: 'center', padding: '40px 0' }}
              >
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }}
                >
                  <CheckCircle size={64} style={{ color: '#25D366', margin: '0 auto 20px' }} />
                </motion.div>
                <h3 style={{ color: '#fff', fontSize: '22px', fontWeight: 700, marginBottom: '8px' }}>Message sent!</h3>
                <p style={{ color: '#8892B0' }}>We&apos;ll get back to you shortly.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {[
                  { name: 'name', label: t('form.name'), type: 'text', required: true },
                  { name: 'email', label: t('form.email'), type: 'email', required: true },
                  { name: 'company', label: t('form.company'), type: 'text', required: false },
                ].map(({ name, label, type, required }, i) => (
                  <motion.div
                    key={name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ ...SPRING, delay: 0.2 + i * 0.07 }}
                  >
                    <label style={labelStyle}>{label}{required ? ' *' : ''}</label>
                    <input
                      name={name}
                      type={type}
                      required={required}
                      value={form[name as keyof typeof form]}
                      onChange={handleChange}
                      style={inputStyle(name)}
                      onFocus={() => setFocused(name)}
                      onBlur={() => setFocused(null)}
                    />
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...SPRING, delay: 0.41 }}
                >
                  <label style={labelStyle}>{t('form.message')} *</label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    style={{ ...inputStyle('message'), resize: 'vertical' }}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused(null)}
                  />
                </motion.div>
                {error && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{ color: '#FF6B35', fontSize: '14px', textAlign: 'center' }}
                  >
                    {error}
                  </motion.p>
                )}
                <motion.button
                  type="submit"
                  disabled={sending}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...SPRING, delay: 0.48 }}
                  whileHover={{ scale: sending ? 1 : 1.02, y: sending ? 0 : -2, transition: SPRING }}
                  whileTap={{ scale: sending ? 1 : 0.97 }}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                    background: sending ? 'rgba(255,107,53,0.5)' : 'linear-gradient(135deg, #FF6B35, #E91E8C)',
                    color: '#fff',
                    padding: '16px 32px',
                    borderRadius: '10px',
                    fontWeight: 700,
                    fontSize: '16px',
                    border: 'none',
                    cursor: sending ? 'not-allowed' : 'pointer',
                    width: '100%',
                    boxShadow: sending ? 'none' : '0 8px 24px rgba(255,107,53,0.3)',
                  }}
                >
                  <Send size={18} /> {sending ? 'Sending...' : t('form.submit')}
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* Info panel */}
          <motion.div
            initial={{ opacity: 0, x: 44, filter: 'blur(5px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            transition={{ ...SPRING_SLOW, delay: 0.15 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
          >
            {/* WhatsApp */}
            <motion.a
              href="https://wa.me/59175025505"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -6, scale: 1.01, boxShadow: '0 16px 40px rgba(37,211,102,0.22)', transition: SPRING }}
              style={{
                display: 'flex', alignItems: 'center', gap: '20px',
                background: 'rgba(37,211,102,0.08)',
                border: '1px solid rgba(37,211,102,0.2)',
                borderRadius: '16px',
                padding: '28px',
                textDecoration: 'none',
              }}
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5, transition: SPRING }}
                style={{
                  width: '56px', height: '56px', borderRadius: '14px',
                  background: '#25D366',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '0 8px 20px rgba(37,211,102,0.3)',
                }}
              >
                <MessageCircle size={28} color="#fff" />
              </motion.div>
              <div>
                <div style={{ color: '#25D366', fontWeight: 700, fontSize: '17px', marginBottom: '4px' }}>WhatsApp</div>
                <div style={{ color: '#8892B0', fontSize: '14px' }}>{t('whatsapp')}</div>
              </div>
            </motion.a>

            {/* Location */}
            <motion.div
              whileHover={{ y: -6, scale: 1.01, transition: SPRING }}
              style={{
                background: 'rgba(15,26,62,0.8)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '16px',
                padding: '28px',
              }}
            >
              <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '18px', marginBottom: '20px' }}>Location</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { icon: MapPin, main: t('info.location'), sub: 'Headquarters' },
                  { icon: Globe, main: t('info.reach'), sub: 'Global presence' },
                ].map(({ icon: Icon, main, sub }, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                    <Icon size={20} style={{ color: '#00D4FF', flexShrink: 0 }} />
                    <div>
                      <div style={{ color: '#fff', fontWeight: 600, marginBottom: '2px' }}>{main}</div>
                      <div style={{ color: '#8892B0', fontSize: '14px' }}>{sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quote card */}
            <motion.div
              whileHover={{ y: -6, scale: 1.01, transition: SPRING }}
              style={{
                background: 'linear-gradient(135deg, rgba(255,107,53,0.1), rgba(0,119,255,0.1))',
                border: '1px solid rgba(255,107,53,0.2)',
                borderRadius: '16px',
                padding: '28px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{
                position: 'absolute', top: '-20px', right: '-20px',
                fontSize: '100px', opacity: 0.06, color: '#FF6B35', lineHeight: 1,
                fontFamily: 'Georgia, serif', fontWeight: 700,
              }}>&ldquo;</div>
              <p style={{ color: '#fff', fontSize: '16px', lineHeight: 1.7, fontStyle: 'italic', position: 'relative', zIndex: 1 }}>
                &quot;We don&apos;t just build brands — we build opportunities.&quot;
              </p>
              <p style={{ color: '#FF6B35', fontWeight: 700, marginTop: '12px', fontSize: '14px' }}>
                — Alpha Strategy Group
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
