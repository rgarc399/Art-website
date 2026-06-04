/* =============================================
   FRANKIE POOH — Art Portfolio Scripts
   ============================================= */

// ── Hero Slider ──────────────────────────────
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.getElementById('sliderDots');
let currentSlide = 0;
let sliderInterval;

slides.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
  dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
  dot.addEventListener('click', () => {
    goToSlide(i);
    resetSliderInterval();
  });
  dotsContainer.appendChild(dot);
});

function goToSlide(index) {
  slides[currentSlide].classList.remove('active');
  dotsContainer.children[currentSlide].classList.remove('active');
  currentSlide = (index + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
  dotsContainer.children[currentSlide].classList.add('active');
}

function resetSliderInterval() {
  clearInterval(sliderInterval);
  sliderInterval = setInterval(() => goToSlide(currentSlide + 1), 5000);
}

document.getElementById('sliderNext').addEventListener('click', () => {
  goToSlide(currentSlide + 1);
  resetSliderInterval();
});

document.getElementById('sliderPrev').addEventListener('click', () => {
  goToSlide(currentSlide - 1);
  resetSliderInterval();
});

sliderInterval = setInterval(() => goToSlide(currentSlide + 1), 5000);

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
const lightboxCaption = document.getElementById('lightboxCaption');
const visibleItems = () => [...galleryItems].filter(item => !item.classList.contains('hidden'));
let lightboxIndex = 0;

function openLightbox(index) {
  const items = visibleItems();
  lightboxIndex = index;
  lightboxImg.src = items[index].querySelector('img').src;
  lightboxImg.alt = items[index].querySelector('img').alt;
  lightboxCaption.textContent = items[index].querySelector('span').textContent;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

function lightboxNav(dir) {
  const items = visibleItems();
  lightboxIndex = (lightboxIndex + dir + items.length) % items.length;
  lightboxImg.src = items[lightboxIndex].querySelector('img').src;
  lightboxImg.alt = items[lightboxIndex].querySelector('img').alt;
  lightboxCaption.textContent = items[lightboxIndex].querySelector('span').textContent;
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
