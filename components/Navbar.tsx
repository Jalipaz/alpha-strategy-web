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

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

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
      initial={{ y: -56, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: EASE_OUT }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: `background 220ms ${EASE_OUT.join(',')}, border-color 220ms`,
        background: scrolled ? 'rgba(18, 22, 28, 0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--line)' : '1px solid transparent',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>
          {/* Logo */}
          <Link href={`/${locale}`} style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
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
              }}
            >
              A
            </div>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: '15px',
                color: 'var(--ink)',
                letterSpacing: '0.01em',
              }}
            >
              ALPHA STRATEGY <span style={{ color: 'var(--ink-dim)' }}>GROUP</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }} className="desktop-nav">
            {navLinks.map((link) => {
              const isActive = pathWithoutLocale === link.href;
              return (
                <motion.div key={link.href} whileHover="hover" style={{ position: 'relative', paddingBottom: '4px' }}>
                  <Link
                    href={`/${locale}${link.href === '/' ? '' : link.href}`}
                    style={{
                      color: isActive ? 'var(--ink)' : 'var(--ink-dim)',
                      textDecoration: 'none',
                      fontSize: '14px',
                      fontWeight: isActive ? 600 : 500,
                      transition: 'color 160ms',
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
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '2px',
                        background: 'var(--accent)',
                      }}
                    />
                  ) : (
                    <motion.div
                      variants={{ hover: { scaleX: 1, opacity: 1 }, initial: { scaleX: 0, opacity: 0 } }}
                      initial="initial"
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '2px',
                        background: 'var(--line)',
                        transformOrigin: 'left',
                        transition: `transform 160ms ${EASE_OUT.join(',')}, opacity 160ms`,
                      }}
                    />
                  )}
                </motion.div>
              );
            })}

            <a
              href="/portafolio.html"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: 'var(--ink-dim)',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: 500,
              }}
            >
              {t('portfolio')}
            </a>

            {/* Language switcher — styled as route codes */}
            <div
              style={{
                display: 'flex',
                gap: '2px',
                border: '1px solid var(--line)',
                borderRadius: '8px',
                padding: '3px',
              }}
            >
              {locales.map((loc) => (
                <Link
                  key={loc.code}
                  href={`/${loc.code}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`}
                  className="tabular"
                  style={{
                    padding: '4px 9px',
                    borderRadius: '5px',
                    fontSize: '12px',
                    fontWeight: 700,
                    textDecoration: 'none',
                    background: locale === loc.code ? 'var(--accent)' : 'transparent',
                    color: locale === loc.code ? 'var(--accent-ink)' : 'var(--ink-faint)',
                    transition: 'background 160ms, color 160ms',
                  }}
                >
                  {loc.label}
                </Link>
              ))}
            </div>

            {/* CTA */}
            <motion.div whileTap={{ scale: 0.97 }}>
              <Link
                href={`/${locale}/contact`}
                style={{
                  background: 'var(--accent)',
                  color: 'var(--accent-ink)',
                  padding: '10px 20px',
                  borderRadius: '100px',
                  fontSize: '14px',
                  fontWeight: 700,
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
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
            whileTap={{ scale: 0.92 }}
            style={{ background: 'none', border: 'none', color: 'var(--ink)', cursor: 'pointer', display: 'none', padding: '4px' }}
            className="mobile-menu-btn"
            aria-label={open ? 'Close menu' : 'Open menu'}
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
              transition={{ duration: 0.22, ease: EASE_OUT }}
              style={{
                overflow: 'hidden',
                background: 'var(--bg)',
                borderTop: '1px solid var(--line)',
              }}
              className="mobile-menu"
            >
              <div style={{ padding: '16px 0 24px' }}>
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, ease: EASE_OUT, delay: i * 0.04 }}
                  >
                    <Link
                      href={`/${locale}${link.href === '/' ? '' : link.href}`}
                      onClick={() => setOpen(false)}
                      style={{
                        display: 'block',
                        padding: '12px 0',
                        color: pathWithoutLocale === link.href ? 'var(--accent)' : 'var(--ink)',
                        textDecoration: 'none',
                        fontSize: '16px',
                        fontWeight: pathWithoutLocale === link.href ? 600 : 500,
                        borderBottom: '1px solid var(--line-soft)',
                      }}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <a
                  href="/portafolio.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  style={{
                    display: 'block',
                    padding: '12px 0',
                    color: 'var(--ink)',
                    textDecoration: 'none',
                    fontSize: '16px',
                    fontWeight: 500,
                    borderBottom: '1px solid var(--line-soft)',
                  }}
                >
                  {t('portfolio')}
                </a>
                <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                  {locales.map((loc) => (
                    <Link
                      key={loc.code}
                      href={`/${loc.code}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`}
                      onClick={() => setOpen(false)}
                      className="tabular"
                      style={{
                        padding: '6px 14px',
                        borderRadius: '6px',
                        fontSize: '13px',
                        fontWeight: 700,
                        textDecoration: 'none',
                        background: locale === loc.code ? 'var(--accent)' : 'var(--surface)',
                        color: locale === loc.code ? 'var(--accent-ink)' : 'var(--ink-faint)',
                        border: locale === loc.code ? 'none' : '1px solid var(--line)',
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
                    background: 'var(--accent)',
                    color: 'var(--accent-ink)',
                    padding: '12px 24px',
                    borderRadius: '100px',
                    fontSize: '15px',
                    fontWeight: 700,
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
