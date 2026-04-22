'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

const WA_NUMBER = '1XXXXXXXXXX'; // TODO: replace with real number

export default function FloatingWhatsApp() {
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
            initial={{ opacity: 0, y: 16, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.92 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            style={{
              background: 'rgba(11, 17, 48, 0.97)',
              border: '1px solid rgba(37,211,102,0.25)',
              borderRadius: '16px',
              padding: '20px',
              maxWidth: '260px',
              boxShadow: '0 16px 40px rgba(0,0,0,0.5)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '50%',
                background: '#25D366',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <MessageCircle size={20} color="#fff" />
              </div>
              <div>
                <div style={{ color: '#fff', fontWeight: 700, fontSize: '14px' }}>Alpha Strategy Group</div>
                <div style={{ color: '#25D366', fontSize: '12px', fontWeight: 500 }}>● Online</div>
              </div>
            </div>
            <p style={{ color: '#8892B0', fontSize: '13px', lineHeight: 1.6, marginBottom: '16px' }}>
              Hi! 👋 Ready to take your business to the next level? Let&apos;s chat.
            </p>
            <motion.a
              href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hi! I found Alpha Strategy Group and I\'d like to learn more.')}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                background: '#25D366',
                color: '#fff',
                padding: '11px 20px',
                borderRadius: '10px',
                fontWeight: 700,
                fontSize: '14px',
                textDecoration: 'none',
                width: '100%',
                boxShadow: '0 4px 16px rgba(37,211,102,0.3)',
              }}
            >
              <MessageCircle size={16} />
              Start Chat
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setExpanded(!expanded)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        animate={!expanded ? { boxShadow: ['0 0 0 0 rgba(37,211,102,0.4)', '0 0 0 14px rgba(37,211,102,0)', '0 0 0 0 rgba(37,211,102,0)'] } : {}}
        transition={!expanded ? { duration: 2, repeat: Infinity } : {}}
        style={{
          width: '58px', height: '58px',
          background: '#25D366',
          border: 'none',
          borderRadius: '50%',
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 6px 24px rgba(37,211,102,0.45)',
          color: '#fff',
          flexShrink: 0,
        }}
        aria-label="Chat on WhatsApp"
      >
        <AnimatePresence mode="wait">
          {expanded ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <MessageCircle size={26} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
