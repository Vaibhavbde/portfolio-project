'use strict';

// Preloader
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('preloader').classList.add('gone'), 1200);
});

// Footer year + init time
document.getElementById('yr').textContent = new Date().getFullYear();
document.getElementById('initTime').textContent = new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'});

// Custom cursor
const cur = document.getElementById('cur');
const cur2 = document.getElementById('cur2');
let mx=0, my=0, cx=0, cy=0;
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cur.style.left = mx+'px'; cur.style.top = my+'px';
});
(function raf() {
  cx += (mx-cx)*.14; cy += (my-cy)*.14;
  cur2.style.left = cx+'px'; cur2.style.top = cy+'px';
  requestAnimationFrame(raf);
})();
document.querySelectorAll('a, button, .proj-card, .stat-card, .svc-card, .feat-card, .stack-pill, .contact-link').forEach(el => {
  el.addEventListener('mouseenter', () => { cur2.style.width = '60px'; cur2.style.height = '60px'; cur2.style.opacity = '.35'; });
  el.addEventListener('mouseleave', () => { cur2.style.width = '36px'; cur2.style.height = '36px'; cur2.style.opacity = '1'; });
});

// Navbar
const nav = document.getElementById('nav');
let lastY = 0;
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  nav.classList.toggle('scrolled', y > 60);
  nav.classList.toggle('hide', y > 120 && y > lastY);
  if (y < 120) nav.classList.remove('hide');
  lastY = y;
}, { passive: true });

// Dark mode — default is dark, button shows ☀ to switch to light
const themeBtn = document.getElementById('themeBtn');
let dark = true;
themeBtn.textContent = '☀';
themeBtn.addEventListener('click', () => {
  dark = !dark;
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  themeBtn.textContent = dark ? '☀' : '☾';
});

// Mobile menu
const burger = document.getElementById('burger');
const mobMenu = document.getElementById('mobMenu');
burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  mobMenu.classList.toggle('open');
});
mobMenu.querySelectorAll('.mm-link').forEach(a => a.addEventListener('click', () => {
  burger.classList.remove('open'); mobMenu.classList.remove('open');
}));

// Reveal on scroll
const revEls = document.querySelectorAll('.reveal-up');
new IntersectionObserver(entries => entries.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); }
}), { threshold: 0.1 }).observe
? (() => {
  const obs = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); }
  }), { threshold: 0.1 });
  revEls.forEach(el => obs.observe(el));
})() : revEls.forEach(el => el.classList.add('in'));

// Parallax bg word
const bgWord = document.getElementById('bgWord');
window.addEventListener('scroll', () => {
  if (bgWord) bgWord.style.transform = `translate(-50%, calc(-50% + ${window.scrollY * .1}px))`;
}, { passive: true });

// Contact form
document.getElementById('submitBtn').addEventListener('click', function() {
  this.textContent = 'Sent! ✓';
  this.style.background = '#4ade80';
  setTimeout(() => {
    this.textContent = 'Send Message →';
    this.style.background = '';
  }, 3000);
});

// ── AI CHAT ──
const chatFab = document.getElementById('chatFab');
const chatWindow = document.getElementById('chatWindow');
const chatClose = document.getElementById('chatClose');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');

chatFab.addEventListener('click', () => chatWindow.classList.toggle('open'));
chatClose.addEventListener('click', () => chatWindow.classList.remove('open'));

function addMsg(text, role) {
  const d = document.createElement('div');
  d.className = 'msg ' + role;
  d.innerHTML = text + `<div class="msg-time">${new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}</div>`;
  chatMessages.appendChild(d);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return d;
}

function addTyping() {
  const d = document.createElement('div');
  d.className = 'msg bot';
  d.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div>';
  chatMessages.appendChild(d);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return d;
}

const SYSTEM = `You are Nova, Vaibhav Badade's friendly AI portfolio assistant. Vaibhav is a Diploma Computer Engineering student at Vidyalankar Polytechnic, Mumbai. He builds AI systems, full-stack apps, and games. His tech stack includes Python, JavaScript, TypeScript, React, Next.js, Node.js, C++, Java, Godot Engine, Pygame, PyTorch, scikit-learn, MongoDB, PostgreSQL, Docker, AWS, Figma. His projects include a Neural Net Visualizer, Godot game suite, Pygame arcade games, Crown Clash (Java strategy game), and a File Converter. He's open to AI Research Internships, Full-Stack roles, and Game Dev collaborations. Answer questions about his work warmly and concisely. Keep replies under 80 words.`;

let history = [];

async function sendChat() {
  const text = chatInput.value.trim();
  if (!text) return;
  chatInput.value = '';
  addMsg(text, 'user');
  history.push({ role: 'user', content: text });
  const typing = addTyping();
  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: SYSTEM,
        messages: history
      })
    });
    const data = await res.json();
    const reply = data.content?.[0]?.text || "I'm having trouble connecting right now!";
    typing.remove();
    addMsg(reply, 'bot');
    history.push({ role: 'assistant', content: reply });
    if (history.length > 20) history = history.slice(-20);
  } catch(e) {
    typing.remove();
    addMsg("Connection error. Please try again!", 'bot');
  }
}

chatSend.addEventListener('click', sendChat);
chatInput.addEventListener('keydown', e => { if (e.key === 'Enter') sendChat(); });
