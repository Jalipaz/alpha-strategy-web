import re, sys

NEW_SCRIPT = """<script>
  const isMobile = window.innerWidth <= 768;
  let current = 1;
  const slides = document.querySelectorAll('.slide');
  const total = slides.length;
  document.getElementById('total').textContent = total;

  // Mobile: override layout with inline styles (belt-and-suspenders)
  if (isMobile) {
    document.body.style.overflow = 'auto';
    document.body.style.height = 'auto';
    const deck = document.querySelector('.slide-deck');
    if (deck) {
      deck.style.height = 'auto';
      deck.style.overflow = 'visible';
      deck.style.position = 'relative';
    }
    slides.forEach(s => {
      s.style.position = 'relative';
      s.style.height = 'auto';
      s.style.minHeight = '100svh';
      s.style.overflow = 'visible';
      s.style.transition = 'none';
    });
  }

  function showSlide(n) {
    if (n < 1) n = 1;
    if (n > total) n = total;
    current = n;
    slides.forEach((s, i) => s.classList.toggle('active', i === n - 1));
    if (isMobile) window.scrollTo(0, 0);
    document.getElementById('current').textContent = n;
    document.getElementById('progressBar').style.width = (n / total * 100) + '%';
  }

  function nextSlide() { showSlide(current + 1); }
  function prevSlide() { showSlide(current - 1); }

  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); nextSlide(); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); prevSlide(); }
  });

  // Click-to-advance only on desktop (mobile uses nav buttons + swipe)
  if (!isMobile) {
    document.addEventListener('click', e => {
      if (!e.target.closest('.nav-controls') && !e.target.closest('.cta-btn')) nextSlide();
    });
  }

  // Swipe — only fires on clear horizontal movement
  let tsX = 0, tsY = 0;
  document.addEventListener('touchstart', e => {
    tsX = e.touches[0].clientX;
    tsY = e.touches[0].clientY;
  }, { passive: true });
  document.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - tsX;
    const dy = e.changedTouches[0].clientY - tsY;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      dx < 0 ? nextSlide() : prevSlide();
    }
  }, { passive: true });

  showSlide(1);
</script>
</body>
</html>"""

files = [
    'public/proposals/propuesta-espana-2026.html',
    'public/proposals/proposal-usa-2026.html',
    'public/proposals/propuesta-latam-emergente-2026.html',
]

pattern = re.compile(r'<script>.*?</script>\s*</body>\s*</html>', re.DOTALL)

for filepath in files:
    with open(filepath, encoding='utf-8') as f:
        content = f.read()
    new_content, count = pattern.subn(NEW_SCRIPT, content)
    if count:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f'FIXED ({count}): {filepath}')
    else:
        print(f'NO MATCH: {filepath}')
