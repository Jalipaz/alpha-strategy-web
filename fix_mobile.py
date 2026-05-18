import re, sys

NEW_MOBILE_CSS = """    /* ── MOBILE (≤768px) — full reflow ── */
    @media (max-width: 768px) {
      body {
        overflow-x: hidden;
        overflow-y: auto;
        height: auto;
        min-height: 100svh;
      }

      .slide-deck {
        position: relative !important;
        width: 100% !important;
        height: auto !important;
        min-height: 100svh;
        overflow: visible !important;
        max-width: 100% !important;
        max-height: none !important;
        inset: auto !important;
      }

      .slide {
        position: relative !important;
        inset: auto !important;
        display: none !important;
        flex-direction: column !important;
        justify-content: flex-start !important;
        align-items: flex-start !important;
        padding: 72px 18px 96px !important;
        width: 100% !important;
        height: auto !important;
        min-height: 100svh;
        overflow: visible !important;
        opacity: 1 !important;
        visibility: visible !important;
      }

      .slide.active {
        display: flex !important;
      }

      .slide-content {
        gap: 14px;
        align-items: flex-start !important;
        justify-content: flex-start !important;
        max-height: none !important;
        overflow: visible !important;
        width: 100%;
      }

      .grid-3, .grid-4, .grid-5 { grid-template-columns: 1fr !important; gap: 10px; }
      .grid-2 { grid-template-columns: 1fr !important; gap: 12px; }
      .split, .pain-grid, .contact-grid { grid-template-columns: 1fr !important; gap: 12px; }

      .steps { flex-direction: column !important; gap: 12px; }
      .tier-card.popular { transform: scale(1) !important; }

      .diff-table, .price-table {
        display: block !important;
        overflow-x: auto !important;
        -webkit-overflow-scrolling: touch;
        font-size: 11px;
        width: 100%;
      }

      .slide-title { font-size: clamp(22px, 6vw, 36px) !important; }
      h2.section-title { font-size: clamp(18px, 5vw, 26px) !important; }
      .slide-subtitle { font-size: 13px !important; line-height: 1.55; }
      .slide-label { font-size: 10px; letter-spacing: 2px; }
      .pain-quote { font-size: 12px; }
      .deliverable-list li { font-size: 12px; }
      .tier-list li { font-size: 12px; }
      .tier-price { font-size: clamp(18px, 5vw, 26px) !important; }
      .price-tag { font-size: clamp(16px, 5vw, 22px) !important; }
      .card-title { font-size: 14px; }
      .flags-row { gap: 10px; flex-wrap: wrap; }
      .flag-emoji { font-size: 22px; }

      .card { padding: 14px 16px; }
      .tier-card { padding: 18px 14px; }
      .contact-card { padding: 18px 14px; }

      .nav-controls {
        position: fixed !important;
        bottom: 14px;
        padding: 6px 16px;
        gap: 12px;
        z-index: 9999;
      }
      .nav-btn { width: 32px; height: 32px; font-size: 14px; }
      .slide-counter { font-size: 11px; }
      .progress-bar { position: fixed !important; }
    }

    /* ── PHONE (≤480px) ── */
    @media (max-width: 480px) {
      .slide { padding: 64px 14px 88px !important; }
      .cta-btn {
        font-size: 13px !important;
        padding: 13px 20px !important;
        width: 100% !important;
        text-align: center !important;
        display: block !important;
        box-sizing: border-box !important;
      }
      .hero-sub { font-size: 13px !important; line-height: 1.5; }
      h2.section-title { font-size: clamp(17px, 5vw, 22px) !important; }
      .slide-title { font-size: clamp(20px, 6vw, 30px) !important; }
      .card { padding: 12px 14px; }
      .tier-card { padding: 14px 12px; }
      .split, .pain-grid, .contact-grid { gap: 10px; }
      .grid-3, .grid-4, .grid-5 { gap: 8px; }
    }
  </style>
"""

files = [
    'public/proposals/propuesta-espana-2026.html',
    'public/proposals/proposal-usa-2026.html',
    'public/proposals/propuesta-latam-emergente-2026.html',
]

# Pattern: from the mobile comment (or the @media line) through </style>
# We match everything from "/* ── TABLET" or "/* ── MOBILE" or @media(max-width:768) through </style>
pattern = re.compile(
    r'(?:\/\*\s*[─\-]+\s*(?:TABLET|MOBILE)[^*]*\*\/\s*\n\s*)?@media\s*\(max-width:\s*768px\).*?</style>',
    re.DOTALL
)

for filepath in files:
    with open(filepath, encoding='utf-8') as f:
        content = f.read()

    new_content, count = pattern.subn(NEW_MOBILE_CSS, content)
    if count:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f'FIXED ({count} replacement): {filepath}')
    else:
        print(f'NO MATCH: {filepath}')
