document.addEventListener('DOMContentLoaded', () => {

  // Year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Header background on scroll
  const header = document.getElementById('siteHeader');
  const onScroll = () => {
    if (window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  navToggle.addEventListener('click', () => {
    const open = mainNav.classList.toggle('open');
    navToggle.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', open);
  });
  mainNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mainNav.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', false);
    });
  });

  // Reveal on scroll
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));

  // Simple lightbox for gallery
  const galleryImgs = document.querySelectorAll('.gallery-grid img');
  if (galleryImgs.length) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = '<img alt="">';
    Object.assign(lightbox.style, {
      position: 'fixed', inset: '0', background: 'rgba(18,16,14,0.94)',
      display: 'none', alignItems: 'center', justifyContent: 'center',
      zIndex: '1000', padding: '40px', cursor: 'zoom-out'
    });
    const lbImg = lightbox.querySelector('img');
    Object.assign(lbImg.style, {
      maxWidth: '90vw', maxHeight: '90vh', borderRadius: '4px',
      boxShadow: '0 20px 60px rgba(0,0,0,0.5)'
    });
    document.body.appendChild(lightbox);

    galleryImgs.forEach(img => {
      img.addEventListener('click', () => {
        lbImg.src = img.src;
        lbImg.alt = img.alt;
        lightbox.style.display = 'flex';
      });
    });
    lightbox.addEventListener('click', () => { lightbox.style.display = 'none'; });
  }
});
