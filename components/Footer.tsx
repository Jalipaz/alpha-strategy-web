'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { MapPin, Globe, Share2, ExternalLink } from 'lucide-react';

export default function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const tContact = useTranslations('contact');
  const locale = useLocale();

  const footerLinkStyle: React.CSSProperties = {
    color: '#8892B0',
    textDecoration: 'none',
    fontSize: '14px',
    transition: 'color 0.2s',
    display: 'inline-block',
  };

  return (
    <footer style={{ background: '#060D26', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '60px', paddingBottom: '32px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '48px', marginBottom: '48px' }}>

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ gridColumn: 'span 1' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <motion.div
                whileHover={{ scale: 1.08, rotate: 5 }}
                transition={{ duration: 0.2 }}
                style={{
                  width: '36px', height: '36px',
                  background: 'linear-gradient(135deg, #FF6B35, #E91E8C)',
                  borderRadius: '8px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 800, fontSize: '18px', color: '#fff',
                  flexShrink: 0,
                  boxShadow: '0 4px 16px rgba(255,107,53,0.25)',
                }}
              >A</motion.div>
              <span style={{ fontWeight: 700, fontSize: '15px', color: '#fff' }}>
                ALPHA STRATEGY <span style={{ color: '#00D4FF' }}>GROUP</span>
              </span>
            </div>
            <p style={{ color: '#8892B0', fontSize: '14px', lineHeight: '1.7', marginBottom: '20px' }}>
              {t('tagline')}
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <motion.a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, color: '#E91E8C' }}
                style={{ color: '#8892B0', display: 'inline-flex', transition: 'color 0.2s' }}
                aria-label="Instagram"
              >
                <Share2 size={20} />
              </motion.a>
              <motion.a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, color: '#00B4D8' }}
                style={{ color: '#8892B0', display: 'inline-flex', transition: 'color 0.2s' }}
                aria-label="LinkedIn"
              >
                <ExternalLink size={20} />
              </motion.a>
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 style={{ color: '#fff', fontWeight: 600, fontSize: '14px', marginBottom: '16px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Navigation
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { href: '/', label: tNav('home') },
                { href: '/services', label: tNav('services') },
                { href: '/about', label: tNav('about') },
                { href: '/contact', label: tNav('contact') },
              ].map((link) => (
                <motion.div key={link.href} whileHover={{ x: 4 }} transition={{ duration: 0.15 }}>
                  <Link
                    href={`/${locale}${link.href === '/' ? '' : link.href}`}
                    style={footerLinkStyle}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#00D4FF')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#8892B0')}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <h4 style={{ color: '#fff', fontWeight: 600, fontSize: '14px', marginBottom: '16px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
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
                <motion.div key={s} whileHover={{ x: 4 }} transition={{ duration: 0.15 }}>
                  <Link
                    href={`/${locale}/services`}
                    style={footerLinkStyle}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#FF6B35')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#8892B0')}
                  >
                    {s}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 style={{ color: '#fff', fontWeight: 600, fontSize: '14px', marginBottom: '16px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Location
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <MapPin size={16} style={{ color: '#00D4FF', flexShrink: 0, marginTop: '2px' }} />
                <span style={{ color: '#8892B0', fontSize: '14px' }}>{tContact('info.location')}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <Globe size={16} style={{ color: '#00D4FF', flexShrink: 0, marginTop: '2px' }} />
                <span style={{ color: '#8892B0', fontSize: '14px' }}>{tContact('info.reach')}</span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}
        >
          <p style={{ color: '#8892B0', fontSize: '13px' }}>
            © {new Date().getFullYear()} Alpha Strategy Group. {t('rights')}
          </p>
          <p style={{ color: '#8892B0', fontSize: '13px' }}>
            Miami, FL · USA
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
