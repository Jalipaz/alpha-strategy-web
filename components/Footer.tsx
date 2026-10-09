'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { MapPin, Globe, Share2, Link2 } from 'lucide-react';

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

export default function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const tContact = useTranslations('contact');
  const locale = useLocale();

  const footerLinkStyle: React.CSSProperties = {
    color: 'var(--ink-dim)',
    textDecoration: 'none',
    fontSize: '14px',
    transition: 'color 160ms',
    display: 'inline-block',
  };

  return (
    <footer style={{ background: 'var(--bg-elevated)', borderTop: '1px solid var(--line)', paddingTop: '64px', paddingBottom: '32px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '48px', marginBottom: '48px' }}>
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div
                style={{
                  width: '30px',
                  height: '30px',
                  border: '1.5px solid var(--accent)',
                  borderRadius: '7px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '14px',
                  color: 'var(--accent)',
                  flexShrink: 0,
                }}
              >
                A
              </div>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '15px', color: 'var(--ink)' }}>
                ALPHA STRATEGY <span style={{ color: 'var(--ink-dim)' }}>GROUP</span>
              </span>
            </div>
            <p style={{ color: 'var(--ink-dim)', fontSize: '14px', lineHeight: '1.7', marginBottom: '20px' }}>
              {t('tagline')}
            </p>
            <div style={{ display: 'flex', gap: '14px' }}>
              <motion.a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.95 }}
                style={{ color: 'var(--ink-dim)', display: 'inline-flex' }}
                aria-label="Instagram"
              >
                <Share2 size={19} strokeWidth={1.6} />
              </motion.a>
              <motion.a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.95 }}
                style={{ color: 'var(--ink-dim)', display: 'inline-flex' }}
                aria-label="LinkedIn"
              >
                <Link2 size={19} strokeWidth={1.6} />
              </motion.a>
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.05 }}
          >
            <h4 style={{ color: 'var(--ink)', fontWeight: 600, fontSize: '13px', marginBottom: '16px', letterSpacing: '0.07em', textTransform: 'uppercase' }}>
              Navigation
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { href: '/', label: tNav('home') },
                { href: '/services', label: tNav('services') },
                { href: '/about', label: tNav('about') },
                { href: '/contact', label: tNav('contact') },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={`/${locale}${link.href === '/' ? '' : link.href}`}
                  style={footerLinkStyle}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--ink-dim)')}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.1 }}
          >
            <h4 style={{ color: 'var(--ink)', fontWeight: 600, fontSize: '13px', marginBottom: '16px', letterSpacing: '0.07em', textTransform: 'uppercase' }}>
              Services
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                'Business Strategy',
                'Digital Marketing',
                'Web Design',
                'Business Training',
                'Language Training',
                'Personal Branding',
              ].map((s) => (
                <Link
                  key={s}
                  href={`/${locale}/services`}
                  style={footerLinkStyle}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--ink-dim)')}
                >
                  {s}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.15 }}
          >
            <h4 style={{ color: 'var(--ink)', fontWeight: 600, fontSize: '13px', marginBottom: '16px', letterSpacing: '0.07em', textTransform: 'uppercase' }}>
              Location
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <MapPin size={16} strokeWidth={1.6} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '2px' }} />
                <span style={{ color: 'var(--ink-dim)', fontSize: '14px' }}>{tContact('info.location')}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <Globe size={16} strokeWidth={1.6} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '2px' }} />
                <span style={{ color: 'var(--ink-dim)', fontSize: '14px' }}>{tContact('info.reach')}</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div
          style={{
            borderTop: '1px solid var(--line)',
            paddingTop: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <p style={{ color: 'var(--ink-faint)', fontSize: '13px' }}>
            © {new Date().getFullYear()} Alpha Strategy Group. {t('rights')}
          </p>
          <p className="tabular" style={{ color: 'var(--ink-faint)', fontSize: '13px' }}>
            MIA · USA
          </p>
        </div>
      </div>
    </footer>
  );
}
