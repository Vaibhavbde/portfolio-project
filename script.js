'use strict';

/* ── Preloader ────────────────────────── */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('preloader').classList.add('gone');
  }, 1400);
});

/* ── Custom cursor ─────────────────────── */
const cur  = document.getElementById('cur');
const cur2 = document.getElementById('cur2');
let mx = 0, my = 0, cx = 0, cy = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cur.style.left = mx + 'px'; cur.style.top = my + 'px';
});
(function raf() {
  cx += (mx - cx) * .14; cy += (my - cy) * .14;
  cur2.style.left = cx + 'px'; cur2.style.top = cy + 'px';
  requestAnimationFrame(raf);
})();

document.querySelectorAll('a, button, .card, .cl, .interest-list li').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cur2.style.width  = '60px'; cur2.style.height = '60px';
    cur2.style.opacity = '.35';
  });
  el.addEventListener('mouseleave', () => {
    cur2.style.width  = '38px'; cur2.style.height = '38px';
    cur2.style.opacity = '1';
  });
});

/* ── Navbar hide-on-scroll ─────────────── */
const nav = document.getElementById('nav');
let lastY = 0;
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  nav.classList.toggle('scrolled', y > 60);
  if (y > 120) {
    nav.classList.toggle('hide', y > lastY);
  } else {
    nav.classList.remove('hide');
  }
  lastY = y;
  highlightNav();
}, { passive: true });

/* ── Mobile menu ──────────────────────── */
const burger  = document.getElementById('burger');
const mobMenu = document.getElementById('mobMenu');
burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  mobMenu.classList.toggle('open');
});
mobMenu.querySelectorAll('.mm-link').forEach(a => {
  a.addEventListener('click', () => {
    burger.classList.remove('open');
    mobMenu.classList.remove('open');
  });
});

/* ── Scroll reveal ─────────────────────── */
const revEls = document.querySelectorAll('.reveal-up');
const revObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      revObs.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
revEls.forEach(el => revObs.observe(el));

/* ── Skill bars ───────────────────────── */
const sbEls = document.querySelectorAll('.sb');
const sbObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const fill = e.target.querySelector('.sb-fill');
      fill.style.width = e.target.dataset.w + '%';
      sbObs.unobserve(e.target);
    }
  });
}, { threshold: 0.4 });
sbEls.forEach(el => sbObs.observe(el));

/* ── Project filter ───────────────────── */
document.querySelectorAll('.wf').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.wf').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.f;
    document.querySelectorAll('.card').forEach(card => {
      const show = f === 'all' || card.dataset.cat === f;
      card.classList.toggle('gone', !show);
    });
  });
});

/* ── Active nav highlight ─────────────── */
const sections  = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');
function highlightNav() {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 200) current = s.id;
  });
  navAnchors.forEach(a => {
    const isActive = a.getAttribute('href') === '#' + current;
    a.style.color = isActive ? 'var(--gold)' : '';
  });
}

/* ── Footer year ──────────────────────── */
document.getElementById('yr').textContent = new Date().getFullYear();

/* ── Form handler ─────────────────────── */
window.handleForm = function(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.form-btn');
  btn.textContent = 'Sent! ✓';
  btn.style.background = '#4ade80';
  btn.style.color = '#000';
  setTimeout(() => {
    btn.textContent = 'Send Message →';
    btn.style.background = '';
    btn.style.color = '';
    e.target.reset();
  }, 3000);
};

/* ── Parallax bg text ─────────────────── */
const bgTxt = document.querySelector('.hero-bg-text');
window.addEventListener('scroll', () => {
  if (bgTxt) {
    bgTxt.style.transform = `translate(-50%, calc(-50% + ${window.scrollY * 0.15}px))`;
  }
}, { passive: true });