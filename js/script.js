'use strict';

/* ===================================================================
   TRIP CONFIG — edit dates here if the trip schedule changes
=================================================================== */
const TRIP_CONFIG = {
  startDate: '2026-09-01',
  endDate: '2026-09-10',
  flightDateTime: '2026-09-01T11:00:00',
};

/* ===================================================================
   TRIP DATA — the single source of truth for the timeline.
   Edit this array to update the itinerary; the page renders from it.
=================================================================== */
const TRIP_DAYS = [
  {
    date: '1.9', weekday: 'שלישי', city: 'napoli',
    title: 'טיסה + מעבר לרומא',
    tags: [{ text: 'טיסה W46924', type: 'flight' }, { text: 'רכבת Intercity 734', type: 'train' }, { text: 'לינה: רומא', type: 'stay' }],
    journeys: [
      {
        icon: '✈️', label: 'טיסה W46924',
        from: { city: 'תל אביב', code: 'TLV', time: '11:00' },
        to: { city: 'נאפולי', code: 'NAP', time: '13:30' },
      },
      {
        icon: '🚄', label: 'רכבת',
        from: { city: 'Napoli Centrale', code: '', time: '16:31' },
        to: { city: 'Roma Termini', code: '', time: '18:34' },
        extra: ['Intercity 734', '2&deg; Classe', 'מושבים: 13A+13B', 'PNR B45GG5'],
      },
    ],
    blocks: [
      { label: 'ערב ברומא', items: ['🌊 מזרקת טרווי', '🏛️ פנתאון', '📍 פיאצה נאבונה', '🍝 ארוחת ערב איטלקית'] },
    ],
    note: '🏨 לינה: רומא — אזור מומלץ: הרובע היהודי / פנתאון / פיאצה נאבונה',
  },
  {
    date: '2.9', weekday: 'רביעי', city: 'roma',
    title: 'רומא — יום מלא',
    tags: [{ text: 'לינה: רומא', type: 'stay' }],
    blocks: [
      { label: 'אתרים מרכזיים', items: ['🏛️ הקולוסיאום', '🏛️ הפורום הרומאי', '📍 פיאצה ונציה', '🪜 המדרגות הספרדיות', '🛍️ Via del Corso (קניות)'] },
      { label: 'ערב', items: ['🌙 טרסטוורה', '🍝 מסעדה ואווירה רומאית'] },
    ],
    note: '🏨 לינה: רומא',
  },
  {
    date: '3.9', weekday: 'חמישי', city: 'roma',
    title: 'רומא ← נאפולי',
    tags: [{ text: 'רכבת לנאפולי', type: 'train' }, { text: 'לינה: נאפולי', type: 'stay' }],
    blocks: [
      { label: 'בוקר', items: ['☕ השלמות אחרונות ברומא', '🚄 רכבת לנאפולי'] },
      { label: 'ערב', items: ['🍕 פיצה נפוליטנית מקורית', '📍 Spaccanapoli', '🌊 טיילת נאפולי'] },
    ],
    note: '🏨 לינה: נאפולי',
  },
  {
    date: '4.9', weekday: 'שישי', city: 'sorrento',
    title: 'נאפולי ← סורנטו',
    tags: [{ text: 'רכבת לסורנטו', type: 'train' }, { text: 'לינה: סורנטו', type: 'stay' }],
    blocks: [
      { label: 'בוקר', items: ['🚆 מעבר לסורנטו'] },
      { label: 'יום רגוע', items: ['🌅 העיר העתיקה', '⚓ Marina Grande', '🌄 תצפיות ושקיעה'] },
    ],
    note: '🏨 לינה: סורנטו',
  },
  {
    date: '5.9', weekday: 'שבת', city: 'capri',
    title: 'יום טיול לקאפרי',
    tags: [{ text: 'ספינה לקאפרי', type: 'train' }, { text: 'לינה: סורנטו', type: 'stay' }],
    blocks: [
      { label: 'מה עושים', items: ['⛴️ אנקאפרי', '🌿 גני אוגוסטוס', '🏖️ Marina Piccola', '🌄 תצפיות'] },
      { label: 'ערב', items: ['↩️ חזרה בערב לסורנטו'] },
    ],
    note: '🏨 לינה: סורנטו',
  },
  {
    date: '6.9', weekday: 'ראשון', city: 'amalfi',
    title: 'חוף אמלפי',
    tags: [{ text: 'יום טיול', type: 'train' }, { text: 'לינה: סורנטו', type: 'stay' }],
    blocks: [
      { label: 'יום טיול', items: ['🌊 פוזיטנו', '🏘️ אמלפי', '🏛️ רוולו (אם מספיקים)'] },
      { label: 'ערב', items: ['↩️ חזרה לסורנטו'] },
    ],
    note: '🏨 לינה: סורנטו',
  },
  {
    date: '7.9', weekday: 'שני', city: 'sorrento',
    title: 'סורנטו / אזור — יום רגוע',
    tags: [{ text: 'לינה: סורנטו', type: 'stay' }],
    blocks: [
      { label: 'אפשר לבחור', items: ['🏛️ פומפיי', '🏖️ חוף ים', '🍝 מסעדות בסורנטו', '🌅 שקיעה'] },
    ],
    note: '🏨 לינה: סורנטו',
  },
  {
    date: '8.9', weekday: 'שלישי', city: 'positano',
    title: 'סורנטו ← פוזיטנו',
    tags: [{ text: 'מעבר לפוזיטנו', type: 'train' }, { text: 'לינה: פוזיטנו', type: 'stay' }],
    blocks: [
      { label: 'יום בפוזיטנו', items: ['🌊 חוף', '📸 סמטאות העיר', '🌅 שקיעה', '🍝 ארוחת ערב מול הנוף'] },
    ],
    note: '🏨 לינה: פוזיטנו',
  },
  {
    date: '9.9', weekday: 'רביעי', city: 'napoli',
    title: 'פוזיטנו ← נאפולי',
    tags: [{ text: 'מעבר לנאפולי', type: 'train' }, { text: 'לינה: נאפולי', type: 'stay' }],
    blocks: [
      { label: 'בוקר רגוע בפוזיטנו', items: ['☕ קפה מול הים', '📸 תמונות אחרונות'] },
      { label: 'צהריים', items: ['🚗 מעבר לנאפולי'] },
      { label: 'ערב אחרון', items: ['🍕 פיצה נפוליטנית', '🛍️ קניות אחרונות'] },
    ],
    note: '🏨 לינה: נאפולי',
  },
  {
    date: '10.9', weekday: 'חמישי', city: 'napoli',
    title: 'חזרה לישראל',
    tags: [{ text: 'טיסה W46923', type: 'flight' }],
    journeys: [
      {
        icon: '✈️', label: 'טיסה W46923',
        from: { city: 'נאפולי', code: 'NAP', time: '06:00' },
        to: { city: 'תל אביב', code: 'TLV', time: '10:00' },
        extra: ['יציאה לשדה: <bdi>03:30&ndash;04:00</bdi>'],
      },
    ],
    blocks: [],
    note: '✈️ הביתה — עם עוד סיפור ביחד',
  },
];

/* City illustration SVGs (decorative, palette-matched) */
const CITY_ILLUSTRATIONS = {
  napoli: `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="300" fill="#3d2b1f"/><polygon points="180,40 260,220 100,220" fill="#6d1f2e"/><circle cx="220" cy="60" r="26" fill="#c9a24b" opacity=".85"/><rect x="0" y="220" width="400" height="80" fill="#4d5a30"/><path d="M0 230 Q100 210 200 230 T400 230 V300 H0 Z" fill="#6b7a45"/></svg>`,
  roma: `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="300" fill="#6d1f2e"/><g fill="#f8f2e6" opacity=".9"><rect x="70" y="140" width="26" height="90"/><rect x="110" y="140" width="26" height="90"/><rect x="150" y="140" width="26" height="90"/><rect x="190" y="140" width="26" height="90"/><rect x="230" y="140" width="26" height="90"/><rect x="270" y="140" width="26" height="90"/><rect x="60" y="120" width="250" height="20"/></g><circle cx="330" cy="60" r="30" fill="#c9a24b" opacity=".8"/></svg>`,
  sorrento: `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="300" fill="#3d2b1f"/><path d="M0 180 L60 100 L120 190 L180 90 L240 200 L300 110 L400 190 V300 H0 Z" fill="#6b4c37"/><rect x="0" y="220" width="400" height="80" fill="#4d5a30"/><circle cx="90" cy="60" r="24" fill="#c9a24b" opacity=".85"/></svg>`,
  capri: `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="300" fill="#1f3d3a"/><rect y="0" width="400" height="300" fill="#6b7a45" opacity=".15"/><path d="M0 210 L80 130 L140 210 L220 110 L300 210 L400 150 V300 H0 Z" fill="#3d2b1f"/><circle cx="320" cy="55" r="26" fill="#c9a24b"/></svg>`,
  amalfi: `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="300" fill="#6b7a45"/><path d="M0 190 L70 120 L150 200 L230 100 L320 190 L400 130 V300 H0 Z" fill="#3d2b1f" opacity=".85"/><circle cx="100" cy="55" r="24" fill="#c9a24b" opacity=".9"/></svg>`,
  positano: `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="300" fill="#6d1f2e"/><g fill="#f8f2e6" opacity=".85"><rect x="120" y="150" width="30" height="30"/><rect x="155" y="130" width="30" height="50"/><rect x="190" y="160" width="30" height="20"/><rect x="225" y="120" width="30" height="60"/><rect x="260" y="145" width="30" height="35"/></g><rect x="0" y="220" width="400" height="80" fill="#3d2b1f"/><circle cx="330" cy="60" r="28" fill="#c9a24b"/></svg>`,
};

/* Photo pool (images/couple/) — one is used for the hero, the rest are spread across the timeline */
const PHOTO_COUNT = 28;
const ALL_PHOTOS = Array.from({ length: PHOTO_COUNT }, (_, i) =>
  `images/couple/couple-${String(i + 1).padStart(2, '0')}.jpg`
);
const HERO_PHOTO = 'images/couple/couple-28.jpg';
const DAY_PHOTO_POOL = ALL_PHOTOS.filter(p => p !== HERO_PHOTO);

/* ===================================================================
   SURPRISE BOXES — 20-card truth-or-dare, mix of sweet / funny / spicy.
   Edit freely; opened state is remembered per-box in localStorage.
=================================================================== */
const SURPRISE_BOXES = [
  { icon: '💌', text: 'ספרו זה לזה על הרגע שידעתם שזה זה. בלי לקצר.' },
  { icon: '😂', text: 'מה הדבר הכי מצחיק שקרה לנו ביחד עד היום?' },
  { icon: '💃', text: 'רקדו יחד לשיר איטלקי במשך דקה שלמה — גם בלי מוזיקה ברקע.' },
  { icon: '👀', text: 'מה התכונה שהכי משגעת אותך אצל השני/ה, ואיך למדת לאהוב אותה?' },
  { icon: '💋', text: 'נשיקה של 10 שניות, בלי לצחוק. עכשיו.' },
  { icon: '🤳', text: 'תפסו סלפי ממש מצחיק ברגע זה, ותשמרו אותו לתמיד.' },
  { icon: '🗣️', text: '"Ti amo" — תגידו את זה אחד לשני באיטלקית, בלי לצחוק (מותר לנסות כמה פעמים).' },
  { icon: '🧭', text: 'מי מכם יותר טוב בניווט? תנו נקודה אחד לשני, ותסבירו למה — בלי לריב.' },
  { icon: '🔥', text: 'מה הדבר שהכי מדליק אצלך את השני/ה? תגידו בקול.' },
  { icon: '🎭', text: 'חקו אחד את השני למשך 30 שניות — התנועות, הקול, הכל.' },
  { icon: '🤫', text: 'איזה כינוי מצחיק אתם קוראים אחד לשני שאף אחד אחר לא יודע עליו?' },
  { icon: '🌶️', text: 'מה הדבר הכי נועז שהייתם רוצים לנסות ביחד באיטליה?' },
  { icon: '🌅', text: 'מה החלום המשותף הכי גדול שלכם לעתיד? ספרו אותו כאילו הוא כבר קרה.' },
  { icon: '🙈', text: 'מה הדבר הכי מוזר שאחד מכם עשה בדייט הראשון?' },
  { icon: '🤝', text: 'החזיקו ידיים ותספרו ביחד עד 60 — בלי לדבר על שום דבר אחר.' },
  { icon: '💭', text: 'תלחשו אחד לשני משהו שלא אמרתם כבר מזמן.' },
  { icon: '🫦', text: 'נשקו איפה שהכי מתחשק לכם עכשיו — לא חייב על השפתיים.' },
  { icon: '📸', text: 'תמצאו את הנוף הכי יפה שאתם רואים עכשיו ותצטלמו בו, בלי לחשוב יותר מדי.' },
  { icon: '💞', text: 'מה הרגע הכי רומנטי שהיה בינינו עד עכשיו — לא בטיול הזה, בחיים בכלל?' },
  { icon: '🥂', text: 'הרימו כוסית (או כל דבר שיש ביד) ותגידו ברכה קצרה אחד לשני.' },
];

/* Round-robin distribution so every day gets 2-3 real photos, in order */
function photosForDay(dayIndex) {
  return DAY_PHOTO_POOL.filter((_, i) => i % TRIP_DAYS.length === dayIndex);
}

/* ===================================================================
   INIT
=================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  hidePageLoader();
  document.querySelector('.hero-photo').src = HERO_PHOTO;
  renderTimeline();
  renderRomanceMeter();
  renderSurpriseBoxes();
  initNav();
  initRevealAnimations();
  initFlightTimer();
  initTallyCounters();
  initSingleCounter();
  initLightbox();
  initMap();
  document.getElementById('footerYear').textContent = new Date().getFullYear();
});

function hidePageLoader() {
  const loader = document.getElementById('pageLoader');
  if (!loader) return;
  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('is-hidden'), 300);
  });
  setTimeout(() => loader.classList.add('is-hidden'), 1500);
}

/* Renders a flight/train leg as stacked from/to rows so Latin codes and
   times never sit inline with Hebrew text (avoids bidi reordering). */
function renderJourney(j) {
  const point = (p) => `
    <div class="journey-row">
      <bdi class="journey-city">${p.city}${p.code ? ` <span class="journey-code">${p.code}</span>` : ''}</bdi>
      <bdi class="journey-time">${p.time}</bdi>
    </div>
  `;
  const extraHtml = j.extra
    ? `<div class="journey-extra">${j.extra.map(e => `<bdi class="journey-extra-chip">${e}</bdi>`).join('')}</div>`
    : '';
  return `
    <div class="journey-card">
      <div class="journey-head"><span class="journey-icon">${j.icon}</span><span class="journey-label">${j.label}</span></div>
      ${point(j.from)}
      <div class="journey-connector"></div>
      ${point(j.to)}
      ${extraHtml}
    </div>
  `;
}

/* ---------- Timeline ---------- */
function renderTimeline() {
  const track = document.getElementById('timelineTrack');
  const html = TRIP_DAYS.map((day, i) => {
    const tagsHtml = day.tags.map(t => `<span class="day-tag tag-${t.type}">${t.text}</span>`).join('');
    const blocksHtml = day.blocks.map(b => `
      <div class="day-block">
        <div class="day-block-label">${b.label}</div>
        <ul class="day-list">${b.items.map(it => `<li>${it}</li>`).join('')}</ul>
      </div>
    `).join('');
    const logisticsHtml = day.journeys
      ? `<div class="day-logistics">${day.journeys.map(renderJourney).join('')}</div>`
      : '';
    const noteHtml = day.note ? `<div class="day-note">${day.note}</div>` : '';

    const rotations = [-5, 4, -3, 5, -4, 3];
    const mosaicHtml = photosForDay(i).map((src, p) => `
      <img class="mosaic-photo" src="${src}" alt="ניב ועינב" loading="lazy"
           style="transform: rotate(${rotations[(i + p) % rotations.length]}deg);"
           data-lightbox-src="${src}">
    `).join('');

    return `
      <article class="day-card reveal" data-index="${i + 1}">
        <div class="day-visual">
          <div class="day-badge" title="${day.title}">${CITY_ILLUSTRATIONS[day.city] || ''}</div>
          <div class="day-mosaic">${mosaicHtml}</div>
        </div>
        <div class="day-body">
          <span class="day-ghost-num">${i + 1}</span>
          <p class="day-eyebrow">יום ${day.weekday}</p>
          <h3 class="day-date">${day.date}</h3>
          <h4 class="day-title">${day.title}</h4>
          <div class="day-tag-row">${tagsHtml}</div>
          ${logisticsHtml}
          ${blocksHtml}
          ${noteHtml}
        </div>
      </article>
    `;
  }).join('');

  track.innerHTML = html;

  track.querySelectorAll('.mosaic-photo').forEach(el => {
    el.addEventListener('click', () => {
      const idx = DAY_PHOTO_POOL.indexOf(el.dataset.lightboxSrc);
      openLightbox(idx);
    });
  });
}

/* ---------- Romance meter (10 days, 1-5 hearts, saved to localStorage) ---------- */
function renderRomanceMeter() {
  const wrap = document.getElementById('romanceMeter');
  const saved = JSON.parse(localStorage.getItem('romanceMeter') || '{}');

  wrap.innerHTML = TRIP_DAYS.map(day => `
    <div class="romance-day" data-date="${day.date}">
      <span class="romance-day-label">${day.date}</span>
      <div class="romance-hearts">
        ${[1, 2, 3, 4, 5].map(n => `<span class="romance-heart" data-value="${n}">❤</span>`).join('')}
      </div>
    </div>
  `).join('');

  wrap.querySelectorAll('.romance-day').forEach(dayEl => {
    const date = dayEl.dataset.date;
    const hearts = [...dayEl.querySelectorAll('.romance-heart')];
    const paint = (val) => hearts.forEach(h => h.classList.toggle('is-active', Number(h.dataset.value) <= val));
    paint(saved[date] || 0);
    hearts.forEach(h => {
      h.addEventListener('click', () => {
        const val = Number(h.dataset.value);
        const current = JSON.parse(localStorage.getItem('romanceMeter') || '{}');
        current[date] = current[date] === val ? val - 1 : val;
        localStorage.setItem('romanceMeter', JSON.stringify(current));
        paint(current[date]);
      });
    });
  });
}

/* ---------- Surprise boxes (flip-open truth-or-dare cards) ---------- */
function renderSurpriseBoxes() {
  const grid = document.getElementById('boxesGrid');
  const opened = new Set(JSON.parse(localStorage.getItem('openedBoxes') || '[]'));

  grid.innerHTML = SURPRISE_BOXES.map((box, i) => `
    <button class="surprise-box ${opened.has(i) ? 'is-open' : ''}" data-index="${i}" type="button" aria-label="קופסה ${i + 1}">
      <span class="surprise-box-inner">
        <span class="surprise-box-face surprise-box-front">
          <span class="surprise-box-icon">🎁</span>
          <span class="surprise-box-num">${i + 1}</span>
        </span>
        <span class="surprise-box-face surprise-box-back">
          <span class="surprise-box-back-icon">${box.icon}</span>
          <span class="surprise-box-text">${box.text}</span>
        </span>
      </span>
    </button>
  `).join('');

  grid.querySelectorAll('.surprise-box').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.dataset.index);
      btn.classList.add('is-open');
      const current = new Set(JSON.parse(localStorage.getItem('openedBoxes') || '[]'));
      current.add(idx);
      localStorage.setItem('openedBoxes', JSON.stringify([...current]));
    });
  });
}

/* ---------- Nav ---------- */
function initNav() {
  const nav = document.getElementById('siteNav');
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');

  const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 60);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('is-open');
    toggle.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  });

  links.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('is-open');
      toggle.classList.remove('is-open');
    });
  });

  const sections = [...document.querySelectorAll('section[id], header[id]')];
  const navLinkFor = id => document.querySelector(`.nav-link[href="#${id}"]`);
  let navTicking = false;
  const updateActiveLink = () => {
    const markerY = window.innerHeight * 0.45;
    let current = sections[0];
    sections.forEach(s => {
      if (s.getBoundingClientRect().top <= markerY) current = s;
    });
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('is-active'));
    const link = navLinkFor(current.id);
    if (link) link.classList.add('is-active');
    navTicking = false;
  };
  updateActiveLink();
  window.addEventListener('scroll', () => {
    if (navTicking) return;
    navTicking = true;
    requestAnimationFrame(updateActiveLink);
  }, { passive: true });
}

/* ---------- Reveal on scroll ---------- */
function initRevealAnimations() {
  const els = [...document.querySelectorAll('.reveal')];
  let ticking = false;

  const revealVisible = () => {
    const vh = window.innerHeight;
    els.forEach(el => {
      if (el.classList.contains('is-visible')) return;
      const rect = el.getBoundingClientRect();
      if (rect.top < vh * 0.9 && rect.bottom > 0) el.classList.add('is-visible');
    });
    ticking = false;
  };

  revealVisible();
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(revealVisible);
  }, { passive: true });
  window.addEventListener('resize', revealVisible);
}

/* ---------- Live flight timer (days:hours:minutes:seconds) ---------- */
function initFlightTimer() {
  const wrap = document.getElementById('flightTimer');
  const label = document.getElementById('flightTimerLabel');
  const grid = document.getElementById('flightTimerGrid');
  const flight = new Date(TRIP_CONFIG.flightDateTime);
  const end = new Date(TRIP_CONFIG.endDate + 'T23:59:59');
  const msPerDay = 1000 * 60 * 60 * 24;

  const values = {
    days: grid.querySelector('[data-unit="days"]'),
    hours: grid.querySelector('[data-unit="hours"]'),
    minutes: grid.querySelector('[data-unit="minutes"]'),
    seconds: grid.querySelector('[data-unit="seconds"]'),
  };
  const pad = (n) => String(n).padStart(2, '0');

  let intervalId = null;

  const showStaticMessage = (html) => {
    if (intervalId) clearInterval(intervalId);
    wrap.classList.add('is-live-note');
    label.innerHTML = html;
    grid.style.display = 'none';
  };

  const tick = () => {
    const now = new Date();
    const diff = flight - now;

    if (diff <= 0) {
      if (now <= end) {
        const dayNum = Math.min(TRIP_DAYS.length, Math.floor((now - flight) / msPerDay) + 1);
        showStaticMessage(`אנחנו באיטליה! <strong>יום ${dayNum}</strong> מתוך ${TRIP_DAYS.length} 🍷`);
      } else {
        showStaticMessage(`הטיול נגמר, אבל הזיכרונות נשארים <strong>לנצח</strong> ❤️`);
      }
      return;
    }

    const days = Math.floor(diff / msPerDay);
    const hours = Math.floor((diff % msPerDay) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    values.days.textContent = pad(days);
    values.hours.textContent = pad(hours);
    values.minutes.textContent = pad(minutes);
    values.seconds.textContent = pad(seconds);
  };

  tick();
  intervalId = setInterval(tick, 1000);
}

/* ---------- Tally counters (localStorage) ---------- */
function initTallyCounters() {
  document.querySelectorAll('[data-tally]').forEach(widget => {
    const key = 'tally_' + widget.dataset.tally;
    const saved = JSON.parse(localStorage.getItem(key) || '{"a":0,"b":0}');

    const scoreA = widget.querySelector('.tally-score[data-side="a"]');
    const scoreB = widget.querySelector('.tally-score[data-side="b"]');
    scoreA.textContent = saved.a;
    scoreB.textContent = saved.b;

    widget.querySelectorAll('.tally-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const side = btn.dataset.side;
        const current = JSON.parse(localStorage.getItem(key) || '{"a":0,"b":0}');
        current[side] += 1;
        localStorage.setItem(key, JSON.stringify(current));
        scoreA.textContent = current.a;
        scoreB.textContent = current.b;
      });
    });
  });
}

/* ---------- Single counter (pizza count) ---------- */
function initSingleCounter() {
  document.querySelectorAll('[data-counter]').forEach(widget => {
    const key = 'counter_' + widget.dataset.counter;
    const valueEl = widget.querySelector('[data-value]');
    let value = Number(localStorage.getItem(key) || 0);
    valueEl.textContent = value;

    widget.querySelectorAll('.counter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (btn.dataset.action === 'inc') value += 1;
        if (btn.dataset.action === 'dec') value = Math.max(0, value - 1);
        localStorage.setItem(key, value);
        valueEl.textContent = value;
      });
    });
  });
}

/* ---------- Lightbox ---------- */
let lightboxIndex = 0;
function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const img = document.getElementById('lightboxImg');
  const closeBtn = document.getElementById('lightboxClose');
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');

  const close = () => {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
  };
  const show = (i) => {
    lightboxIndex = (i + DAY_PHOTO_POOL.length) % DAY_PHOTO_POOL.length;
    img.src = DAY_PHOTO_POOL[lightboxIndex];
  };

  closeBtn.addEventListener('click', close);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) close(); });
  prevBtn.addEventListener('click', () => show(lightboxIndex - 1));
  nextBtn.addEventListener('click', () => show(lightboxIndex + 1));

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(lightboxIndex + 1);
    if (e.key === 'ArrowRight') show(lightboxIndex - 1);
  });

  window.openLightboxRef = (i) => {
    show(i);
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
  };
}
function openLightbox(i) { window.openLightboxRef(i); }

/* ---------- Map ---------- */
function initMap() {
  const el = document.getElementById('tripMap');
  if (!el || typeof L === 'undefined') return;

  const cities = {
    napoli: { name: 'נאפולי', coords: [40.8518, 14.2681], info: '3 לילות (מפוזרים) — הגעה, מעבר ויציאה' },
    roma: { name: 'רומא', coords: [41.9028, 12.4964], info: '2 לילות — 1&ndash;2.9' },
    sorrento: { name: 'סורנטו', coords: [40.6263, 14.3757], info: '4 לילות — 4&ndash;7.9' },
    positano: { name: 'פוזיטנו', coords: [40.6280, 14.4847], info: 'לילה אחד — 8.9' },
    capri: { name: 'קאפרי', coords: [40.5532, 14.2429], info: 'יום טיול — 5.9' },
    amalfi: { name: 'אמלפי', coords: [40.6340, 14.6027], info: 'יום טיול — 6.9' },
  };

  const map = L.map(el, { scrollWheelZoom: false }).setView([40.95, 14.5], 8);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 17,
  }).addTo(map);

  const goldIcon = (label) => L.divIcon({
    className: 'trip-marker',
    html: `<div style="background:#6d1f2e;color:#f8f2e6;border:2px solid #c9a24b;border-radius:50%;width:34px;height:34px;display:flex;align-items:center;justify-content:center;font-family:'Playfair Display',serif;font-weight:700;box-shadow:0 4px 12px rgba(0,0,0,.3);">${label}</div>`,
    iconSize: [34, 34],
    iconAnchor: [17, 17],
  });

  const order = ['napoli', 'roma', 'napoli', 'sorrento', 'positano', 'napoli'];
  const routeCoords = order.map(k => cities[k].coords);
  L.polyline(routeCoords, { color: '#6d1f2e', weight: 3, opacity: 0.75, dashArray: '1 10', lineCap: 'round' }).addTo(map);

  ['sorrento', 'sorrento'].forEach((base, idx) => {
    const target = idx === 0 ? cities.capri.coords : cities.amalfi.coords;
    L.polyline([cities[base].coords, target], { color: '#6b7a45', weight: 2, opacity: 0.7, dashArray: '4 8' }).addTo(map);
  });

  let stopNum = 0;
  Object.entries(cities).forEach(([key, city]) => {
    stopNum += 1;
    L.marker(city.coords, { icon: goldIcon(stopNum) })
      .addTo(map)
      .bindPopup(`<b>${city.name}</b><br>${city.info}`);
  });
}
