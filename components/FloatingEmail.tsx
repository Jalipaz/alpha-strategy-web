'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Mail, X } from 'lucide-react';

const CONTACT_EMAIL = 'info@alphastrategygroupusa.com';
const EASE_OUT = [0.23, 1, 0.32, 1] as const;

export default function FloatingEmail() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div style={{
      position: 'fixed',
      bottom: '28px',
      right: '28px',
      zIndex: 100,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: '12px',
    }}>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.18, ease: EASE_OUT }}
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--line)',
              borderRadius: '14px',
              padding: '20px',
              maxWidth: '260px',
              boxShadow: '0 16px 40px rgba(0,0,0,0.4)',
              transformOrigin: 'bottom right',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div style={{
                width: '38px', height: '38px', borderRadius: '10px',
                background: 'var(--accent-dim)',
                border: '1px solid var(--accent-line)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <Mail size={18} strokeWidth={1.6} color="var(--accent)" />
              </div>
              <div>
                <div style={{ color: 'var(--ink)', fontWeight: 700, fontSize: '14px' }}>Alpha Strategy Group</div>
                <div style={{ color: 'var(--ink-dim)', fontSize: '12px', fontWeight: 500 }}>{CONTACT_EMAIL}</div>
              </div>
            </div>
            <p style={{ color: 'var(--ink-dim)', fontSize: '13px', lineHeight: 1.6, marginBottom: '16px' }}>
              Ready to take your business to the next level? Send us an email.
            </p>
            <motion.a
              href={`mailto:${CONTACT_EMAIL}`}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                background: 'var(--accent)',
                color: 'var(--accent-ink)',
                padding: '11px 20px',
                borderRadius: '100px',
                fontWeight: 700,
                fontSize: '14px',
                textDecoration: 'none',
                width: '100%',
              }}
            >
              <Mail size={16} strokeWidth={1.8} />
              Send Email
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setExpanded(!expanded)}
        whileTap={{ scale: 0.94 }}
        style={{
          width: '54px', height: '54px',
          background: 'var(--accent)',
          border: 'none',
          borderRadius: '50%',
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 6px 20px rgba(232,163,61,0.35)',
          color: 'var(--accent-ink)',
          flexShrink: 0,
        }}
        aria-label="Email us"
      >
        <AnimatePresence mode="wait">
          {expanded ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X size={22} strokeWidth={1.8} />
            </motion.div>
          ) : (
            <motion.div key="mail" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <Mail size={22} strokeWidth={1.8} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
