/* =============================================
   FRANKIE POOH — Art Portfolio Scripts
   ============================================= */

// ── Featured Cards Scroll Reveal ─────────────
document.querySelectorAll('.featured-card').forEach(card => card.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.featured-card.reveal').forEach(card => revealObserver.observe(card));

// ── Mobile Nav ───────────────────────────────
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', isOpen);
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ── Gallery Filters ──────────────────────────
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    galleryItems.forEach(item => {
      const matches = filter === 'all' || item.dataset.category === filter;
      item.classList.toggle('hidden', !matches);
    });
  });
});

// ── Lightbox ─────────────────────────────────
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxVideo = document.getElementById('lightboxVideo');
const lightboxCaption = document.getElementById('lightboxCaption');
const visibleItems = () => [...galleryItems].filter(item => !item.classList.contains('hidden'));
let lightboxIndex = 0;

function setLightboxContent(item) {
  const isVideo = item.classList.contains('gallery-item--video');
  if (isVideo) {
    lightboxImg.style.display = 'none';
    lightboxVideo.style.display = 'block';
    lightboxVideo.src = item.querySelector('source').getAttribute('src');
    lightboxVideo.load();
  } else {
    lightboxVideo.style.display = 'none';
    lightboxVideo.pause();
    lightboxVideo.src = '';
    lightboxImg.style.display = '';
    lightboxImg.src = item.querySelector('img').src;
    lightboxImg.alt = item.querySelector('img').alt;
  }
  lightboxCaption.textContent = item.querySelector('span').textContent;
}

function openLightbox(index) {
  lightboxIndex = index;
  setLightboxContent(visibleItems()[index]);
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightboxVideo.pause();
  lightboxVideo.src = '';
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

function lightboxNav(dir) {
  const items = visibleItems();
  lightboxIndex = (lightboxIndex + dir + items.length) % items.length;
  setLightboxContent(items[lightboxIndex]);
}

galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    const items = visibleItems();
    const visibleIndex = items.indexOf(item);
    if (visibleIndex !== -1) openLightbox(visibleIndex);
  });
});

document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
document.getElementById('lightboxPrev').addEventListener('click', () => lightboxNav(-1));
document.getElementById('lightboxNext').addEventListener('click', () => lightboxNav(1));

lightbox.addEventListener('click', e => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') lightboxNav(-1);
  if (e.key === 'ArrowRight') lightboxNav(1);
});

// ── Contact Form ─────────────────────────────
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const name = e.target.name.value.trim();
  const email = e.target.email.value.trim();
  const message = e.target.message.value.trim();
  if (!name || !email || !message) return;
  const success = document.getElementById('contactSuccess');
  success.classList.add('visible');
  e.target.reset();
  setTimeout(() => success.classList.remove('visible'), 5000);
});

// ── Header shadow on scroll ──────────────────
window.addEventListener('scroll', () => {
  const header = document.getElementById('header');
  header.style.boxShadow = window.scrollY > 30
    ? '0 2px 20px rgba(0,0,0,0.07)'
    : 'none';
}, { passive: true });
