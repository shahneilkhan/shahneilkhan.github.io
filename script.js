// ===== SETTINGS PANEL TOGGLE =====
const settingsBtn = document.getElementById('settingsBtn');
const settingsPanel = document.getElementById('settingsPanel');

settingsBtn.addEventListener('click', () => {
  settingsPanel.classList.toggle('hidden');
});

// ===== LANGUAGE SWITCH =====
const langButtons = document.querySelectorAll('.lang-btn');
const translatable = document.querySelectorAll('[data-en]');

function setLanguage(lang) {
  translatable.forEach(el => {
    el.textContent = el.getAttribute('data-' + lang);
  });
  langButtons.forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
  localStorage.setItem('lang', lang);
}

langButtons.forEach(btn => {
  btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
});

// ===== THEME SWITCH =====
const themeButtons = document.querySelectorAll('.theme-btn');

function applyTheme(choice) {
  let actualTheme = choice;
  if (choice === 'auto') {
    actualTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  document.documentElement.setAttribute('data-theme', actualTheme);
  themeButtons.forEach(b => b.classList.toggle('active', b.dataset.themeChoice === choice));
  localStorage.setItem('theme', choice);
}

themeButtons.forEach(btn => {
  btn.addEventListener('click', () => applyTheme(btn.dataset.themeChoice));
});

// ===== ANIMATION ON/OFF =====
const animOn = document.getElementById('animOn');
const animOff = document.getElementById('animOff');

function setAnimation(state) {
  document.body.classList.toggle('no-anim', state === 'off');
  animOn.classList.toggle('active', state === 'on');
  animOff.classList.toggle('active', state === 'off');
  localStorage.setItem('animation', state);
}

animOn.addEventListener('click', () => setAnimation('on'));
animOff.addEventListener('click', () => setAnimation('off'));

// ===== LOAD SAVED SETTINGS ON PAGE LOAD =====
window.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('lang') || 'en';
  const savedTheme = localStorage.getItem('theme') || 'dark';
  const savedAnim = localStorage.getItem('animation') || 'on';

  setLanguage(savedLang);
  applyTheme(savedTheme);
  setAnimation(savedAnim);
});
