'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { MapPin, Globe, MessageCircle, Send, CheckCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID = 'service_2y5hqth';
const EMAILJS_TEMPLATE_ID = 'template_otmekli';
const EMAILJS_PUBLIC_KEY = '7Ls4seAxfJtuDhr8O';

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

  async function handleSubmit(e: React.FormEvent) {
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
        <motion.div
          animate={{ y: [0, -18, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', bottom: '-60px', left: '10%', width: '360px', height: '360px',
            background: 'radial-gradient(circle, rgba(233,30,140,0.09) 0%, transparent 70%)',
            borderRadius: '50%', pointerEvents: 'none',
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{ position: 'relative', zIndex: 1 }}
        >
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 60px)', fontWeight: 800, color: '#fff', marginBottom: '16px' }}>
            {t('title')}
          </h1>
          <p style={{ color: '#8892B0', fontSize: '18px' }}>{t('subtitle')}</p>
        </motion.div>
      </section>

      {/* Content */}
      <section style={{ padding: '80px 24px 120px', background: '#0B1130' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '48px' }}>
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              background: 'rgba(15,26,62,0.8)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '20px',
              padding: '40px',
            }}
          >
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                style={{ textAlign: 'center', padding: '40px 0' }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                >
                  <CheckCircle size={64} style={{ color: '#25D366', margin: '0 auto 20px' }} />
                </motion.div>
                <h3 style={{ color: '#fff', fontSize: '22px', fontWeight: 700, marginBottom: '8px' }}>Message sent!</h3>
                <p style={{ color: '#8892B0' }}>We&apos;ll get back to you shortly.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={labelStyle}>{t('form.name')} *</label>
                  <input
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    style={inputStyle('name')}
                    onFocus={() => setFocused('name')}
                    onBlur={() => setFocused(null)}
                  />
                </div>
                <div>
                  <label style={labelStyle}>{t('form.email')} *</label>
                  <input
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    style={inputStyle('email')}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused(null)}
                  />
                </div>
                <div>
                  <label style={labelStyle}>{t('form.company')}</label>
                  <input
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    style={inputStyle('company')}
                    onFocus={() => setFocused('company')}
                    onBlur={() => setFocused(null)}
                  />
                </div>
                <div>
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
                </div>
                {error && (
                  <p style={{ color: '#FF6B35', fontSize: '14px', textAlign: 'center' }}>{error}</p>
                )}
                <motion.button
                  type="submit"
                  disabled={sending}
                  whileHover={{ scale: sending ? 1 : 1.02 }}
                  whileTap={{ scale: sending ? 1 : 0.98 }}
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
                    boxShadow: '0 8px 24px rgba(255,107,53,0.3)',
                  }}
                >
                  <Send size={18} /> {sending ? 'Sending...' : t('form.submit')}
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* Info panel */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
          >
            {/* WhatsApp */}
            <motion.a
              href="https://wa.me/1XXXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(37,211,102,0.2)' }}
              transition={{ duration: 0.2 }}
              style={{
                display: 'flex', alignItems: 'center', gap: '20px',
                background: 'rgba(37,211,102,0.08)',
                border: '1px solid rgba(37,211,102,0.2)',
                borderRadius: '16px',
                padding: '28px',
                textDecoration: 'none',
              }}
            >
              <div style={{
                width: '56px', height: '56px', borderRadius: '14px',
                background: '#25D366',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
                boxShadow: '0 8px 20px rgba(37,211,102,0.3)',
              }}>
                <MessageCircle size={28} color="#fff" />
              </div>
              <div>
                <div style={{ color: '#25D366', fontWeight: 700, fontSize: '17px', marginBottom: '4px' }}>WhatsApp</div>
                <div style={{ color: '#8892B0', fontSize: '14px' }}>{t('whatsapp')}</div>
              </div>
            </motion.a>

            {/* Location */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              style={{
                background: 'rgba(15,26,62,0.8)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '16px',
                padding: '28px',
              }}
            >
              <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '18px', marginBottom: '20px' }}>Location</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <MapPin size={20} style={{ color: '#00D4FF', flexShrink: 0 }} />
                  <div>
                    <div style={{ color: '#fff', fontWeight: 600, marginBottom: '2px' }}>{t('info.location')}</div>
                    <div style={{ color: '#8892B0', fontSize: '14px' }}>Headquarters</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <Globe size={20} style={{ color: '#00D4FF', flexShrink: 0 }} />
                  <div>
                    <div style={{ color: '#fff', fontWeight: 600, marginBottom: '2px' }}>{t('info.reach')}</div>
                    <div style={{ color: '#8892B0', fontSize: '14px' }}>Global presence</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Quote card */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
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
