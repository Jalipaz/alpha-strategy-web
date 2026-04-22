'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { Menu, X } from 'lucide-react';

const locales = [
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' },
  { code: 'pt', label: 'PT' },
];

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';

  const navLinks = [
    { href: '/', label: t('home') },
    { href: '/services', label: t('services') },
    { href: '/about', label: t('about') },
    { href: '/contact', label: t('contact') },
  ];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: 'background 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease',
        background: scrolled ? 'rgba(11, 17, 48, 0.96)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>
          {/* Logo */}
          <Link href={`/${locale}`} style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <motion.div
              whileHover={{ scale: 1.08, rotate: 5 }}
              transition={{ duration: 0.2 }}
              style={{
                width: '36px', height: '36px',
                background: 'linear-gradient(135deg, #FF6B35, #E91E8C)',
                borderRadius: '8px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 800, fontSize: '18px', color: '#fff',
                boxShadow: '0 4px 16px rgba(255,107,53,0.3)',
              }}
            >A</motion.div>
            <span style={{ fontWeight: 700, fontSize: '16px', color: '#fff', letterSpacing: '0.02em' }}>
              ALPHA STRATEGY <span style={{ color: '#00D4FF' }}>GROUP</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }} className="desktop-nav">
            {navLinks.map((link) => {
              const isActive = pathWithoutLocale === link.href;
              return (
                <motion.div key={link.href} whileHover="hover" style={{ position: 'relative', paddingBottom: '4px' }}>
                  <Link
                    href={`/${locale}${link.href === '/' ? '' : link.href}`}
                    style={{
                      color: isActive ? '#00D4FF' : 'rgba(255,255,255,0.75)',
                      textDecoration: 'none',
                      fontSize: '14px',
                      fontWeight: isActive ? 600 : 500,
                      transition: 'color 0.2s',
                      display: 'block',
                    }}
                  >
                    {link.label}
                  </Link>
                  {isActive ? (
                    <motion.div
                      layoutId="nav-underline"
                      style={{
                        position: 'absolute',
                        bottom: 0, left: 0, right: 0,
                        height: '2px',
                        background: 'linear-gradient(90deg, #00D4FF, #0077FF)',
                        borderRadius: '2px',
                      }}
                    />
                  ) : (
                    <motion.div
                      variants={{ hover: { scaleX: 1, opacity: 1 }, initial: { scaleX: 0, opacity: 0 } }}
                      initial="initial"
                      style={{
                        position: 'absolute',
                        bottom: 0, left: 0, right: 0,
                        height: '2px',
                        background: 'linear-gradient(90deg, rgba(0,212,255,0.5), rgba(0,119,255,0.5))',
                        borderRadius: '2px',
                        transformOrigin: 'left',
                        transition: 'transform 0.2s ease, opacity 0.2s ease',
                      }}
                    />
                  )}
                </motion.div>
              );
            })}

            {/* Language switcher */}
            <div style={{ display: 'flex', gap: '4px' }}>
              {locales.map((loc) => (
                <Link
                  key={loc.code}
                  href={`/${loc.code}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`}
                  style={{
                    padding: '4px 8px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: 600,
                    textDecoration: 'none',
                    background: locale === loc.code ? 'rgba(0,212,255,0.15)' : 'transparent',
                    color: locale === loc.code ? '#00D4FF' : 'rgba(255,255,255,0.5)',
                    border: locale === loc.code ? '1px solid rgba(0,212,255,0.3)' : '1px solid transparent',
                    transition: 'all 0.2s',
                  }}
                >
                  {loc.label}
                </Link>
              ))}
            </div>

            {/* CTA */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link
                href={`/${locale}/contact`}
                style={{
                  background: 'linear-gradient(135deg, #FF6B35, #E91E8C)',
                  color: '#fff',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 4px 16px rgba(255,107,53,0.25)',
                  display: 'inline-block',
                }}
              >
                {t('cta')}
              </Link>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <motion.button
            onClick={() => setOpen(!open)}
            whileTap={{ scale: 0.9 }}
            style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', display: 'none', padding: '4px' }}
            className="mobile-menu-btn"
          >
            <AnimatePresence mode="wait">
              {open ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              style={{
                overflow: 'hidden',
                background: 'rgba(11,17,48,0.98)',
                borderTop: '1px solid rgba(255,255,255,0.08)',
              }}
              className="mobile-menu"
            >
              <div style={{ padding: '16px 0 24px' }}>
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.3 }}
                  >
                    <Link
                      href={`/${locale}${link.href === '/' ? '' : link.href}`}
                      onClick={() => setOpen(false)}
                      style={{
                        display: 'block',
                        padding: '12px 0',
                        color: pathWithoutLocale === link.href ? '#00D4FF' : 'rgba(255,255,255,0.85)',
                        textDecoration: 'none',
                        fontSize: '16px',
                        fontWeight: pathWithoutLocale === link.href ? 600 : 500,
                        borderBottom: '1px solid rgba(255,255,255,0.05)',
                      }}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                  {locales.map((loc) => (
                    <Link
                      key={loc.code}
                      href={`/${loc.code}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`}
                      onClick={() => setOpen(false)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '6px',
                        fontSize: '13px',
                        fontWeight: 600,
                        textDecoration: 'none',
                        background: locale === loc.code ? 'rgba(0,212,255,0.15)' : 'rgba(255,255,255,0.05)',
                        color: locale === loc.code ? '#00D4FF' : 'rgba(255,255,255,0.5)',
                        border: locale === loc.code ? '1px solid rgba(0,212,255,0.3)' : '1px solid rgba(255,255,255,0.1)',
                      }}
                    >
                      {loc.label}
                    </Link>
                  ))}
                </div>
                <Link
                  href={`/${locale}/contact`}
                  onClick={() => setOpen(false)}
                  style={{
                    display: 'inline-block',
                    marginTop: '16px',
                    background: 'linear-gradient(135deg, #FF6B35, #E91E8C)',
                    color: '#fff',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    fontSize: '15px',
                    fontWeight: 600,
                    textDecoration: 'none',
                  }}
                >
                  {t('cta')}
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </motion.nav>
  );
}
