'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { MapPin, Globe, MessageCircle, Send, CheckCircle2, Mail } from 'lucide-react';
import emailjs from '@emailjs/browser';

const AnimatedHeroBg = dynamic(() => import('../../../components/AnimatedHeroBg'), { ssr: false });

const CONTACT_EMAIL = 'info@alphastrategygroupusa.com';

const EMAILJS_SERVICE_ID = 'service_2y5hqth';
const EMAILJS_TEMPLATE_ID = 'template_r64k81p';
const EMAILJS_PUBLIC_KEY = '7Ls4seAxfJtuDhr8O';

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

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

  async function handleSubmit(e: { preventDefault(): void }) {
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
      setError(`Something went wrong. Please try again or email us directly at ${CONTACT_EMAIL}.`);
    } finally {
      setSending(false);
    }
  }

  const inputStyle = (name: string): React.CSSProperties => ({
    width: '100%',
    padding: '14px 16px',
    background: focused === name ? 'var(--surface-hover)' : 'var(--surface)',
    border: `1px solid ${focused === name ? 'var(--accent)' : 'var(--line)'}`,
    borderRadius: '10px',
    color: 'var(--ink)',
    fontSize: '15px',
    outline: 'none',
    transition: 'border-color 160ms, background 160ms',
    boxSizing: 'border-box',
    fontFamily: 'var(--font-body)',
  });

  const labelStyle: React.CSSProperties = {
    color: 'var(--ink-dim)',
    fontSize: '12.5px',
    fontWeight: 600,
    display: 'block',
    marginBottom: '8px',
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
  };

  return (
    <>
      {/* Header */}
      <section
        style={{
          paddingTop: '150px',
          paddingBottom: '72px',
          paddingLeft: '24px',
          paddingRight: '24px',
          background: 'var(--bg)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <AnimatedHeroBg />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
          style={{ position: 'relative', zIndex: 1 }}
        >
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(30px, 5vw, 54px)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: 'var(--ink)',
              marginBottom: '14px',
            }}
          >
            {t('title')}
          </h1>
          <p style={{ color: 'var(--ink-dim)', fontSize: '17px' }}>{t('subtitle')}</p>
        </motion.div>
      </section>

      {/* Content */}
      <section style={{ padding: '70px 24px 120px', background: 'var(--bg)', borderTop: '1px solid var(--line)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '48px' }}>
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.05 }}
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--line)',
              borderRadius: '16px',
              padding: '36px',
            }}
          >
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, ease: EASE_OUT }}
                style={{ textAlign: 'center', padding: '40px 0' }}
              >
                <CheckCircle2 size={48} strokeWidth={1.5} style={{ color: 'var(--accent)', margin: '0 auto 20px' }} />
                <h3 style={{ color: 'var(--ink)', fontSize: '21px', fontWeight: 700, marginBottom: '8px', fontFamily: 'var(--font-display)' }}>Message sent!</h3>
                <p style={{ color: 'var(--ink-dim)' }}>We&apos;ll get back to you shortly.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {[
                  { name: 'name', label: t('form.name'), type: 'text', required: true },
                  { name: 'email', label: t('form.email'), type: 'email', required: true },
                  { name: 'company', label: t('form.company'), type: 'text', required: false },
                ].map(({ name, label, type, required }) => (
                  <div key={name}>
                    <label style={labelStyle}>
                      {label}
                      {required ? ' *' : ''}
                    </label>
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
                  </div>
                ))}
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
                  <p style={{ color: 'var(--accent)', fontSize: '14px', textAlign: 'center' }}>{error}</p>
                )}
                <motion.button
                  type="submit"
                  disabled={sending}
                  whileTap={{ scale: sending ? 1 : 0.97 }}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                    background: sending ? 'var(--line)' : 'var(--accent)',
                    color: sending ? 'var(--ink-dim)' : 'var(--accent-ink)',
                    padding: '16px 32px',
                    borderRadius: '100px',
                    fontWeight: 700,
                    fontSize: '15px',
                    border: 'none',
                    cursor: sending ? 'not-allowed' : 'pointer',
                    width: '100%',
                  }}
                >
                  <Send size={17} strokeWidth={1.8} /> {sending ? 'Sending...' : t('form.submit')}
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* Info panel */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.1 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}
          >
            {/* Email — primary channel */}
            <motion.a
              href={`mailto:${CONTACT_EMAIL}`}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.16, ease: EASE_OUT }}
              style={{
                display: 'flex', alignItems: 'center', gap: '18px',
                background: 'var(--surface)',
                border: '1px solid var(--line)',
                borderRadius: '14px',
                padding: '24px',
                textDecoration: 'none',
              }}
            >
              <div
                style={{
                  width: '48px', height: '48px', borderRadius: '12px',
                  border: '1px solid var(--accent-line)',
                  background: 'var(--accent-dim)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Mail size={21} strokeWidth={1.6} color="var(--accent)" />
              </div>
              <div>
                <div style={{ color: 'var(--ink)', fontWeight: 700, fontSize: '16px', marginBottom: '3px' }}>Email</div>
                <div style={{ color: 'var(--ink-dim)', fontSize: '13.5px' }}>{CONTACT_EMAIL}</div>
              </div>
            </motion.a>

            {/* WhatsApp */}
            <motion.a
              href="https://wa.me/59175025505"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3 }}
              transition={{ duration: 0.16, ease: EASE_OUT }}
              style={{
                display: 'flex', alignItems: 'center', gap: '18px',
                background: 'var(--surface)',
                border: '1px solid var(--line)',
                borderRadius: '14px',
                padding: '24px',
                textDecoration: 'none',
              }}
            >
              <div
                style={{
                  width: '48px', height: '48px', borderRadius: '12px',
                  background: 'rgba(37,211,102,0.12)',
                  border: '1px solid rgba(37,211,102,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <MessageCircle size={21} strokeWidth={1.6} color="var(--whatsapp)" />
              </div>
              <div>
                <div style={{ color: 'var(--ink)', fontWeight: 700, fontSize: '16px', marginBottom: '3px' }}>WhatsApp</div>
                <div style={{ color: 'var(--ink-dim)', fontSize: '13.5px' }}>{t('whatsapp')}</div>
              </div>
            </motion.a>

            {/* Location */}
            <div
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--line)',
                borderRadius: '14px',
                padding: '24px',
              }}
            >
              <h3 style={{ color: 'var(--ink)', fontWeight: 700, fontSize: '16px', marginBottom: '18px', fontFamily: 'var(--font-display)' }}>Location</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { icon: MapPin, main: t('info.location'), sub: 'Headquarters' },
                  { icon: Globe, main: t('info.reach'), sub: 'Global presence' },
                ].map(({ icon: Icon, main, sub }, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <Icon size={18} strokeWidth={1.6} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <div style={{ color: 'var(--ink)', fontWeight: 600, fontSize: '14.5px', marginBottom: '2px' }}>{main}</div>
                      <div style={{ color: 'var(--ink-dim)', fontSize: '13px' }}>{sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quote card */}
            <div
              style={{
                background: 'var(--accent)',
                borderRadius: '14px',
                padding: '24px',
                position: 'relative',
              }}
            >
              <p style={{ color: 'var(--accent-ink)', fontSize: '15.5px', lineHeight: 1.7, fontWeight: 600 }}>
                &quot;We don&apos;t just build brands — we build opportunities.&quot;
              </p>
              <p style={{ color: 'rgba(28,19,4,0.7)', fontWeight: 600, marginTop: '10px', fontSize: '13px' }}>— Alpha Strategy Group</p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
