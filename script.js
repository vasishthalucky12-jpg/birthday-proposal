/* ============================================ */
/*  CINEMATIC BIRTHDAY SURPRISE — BANGARAM ❤️   */
/*  Crafted for LO's Wife                       */
/* ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initGiftBoxSurprise();
  initThemeEngine();
  initLovePromiseRoulette();
  initMusicToggle();
  initHeartBurstOnClick();
  initFireworks();
  initFloatingPetals();
  initMultiStepQuiz();
  initPostQuizSurprise();
  initLoveLetterModal();
  initAutoMusicOnInteraction();
});

let cardSequenceRun = 0;

/* ============================================================ */
/*  SCENE 1 - 5: GIFT BOX & CARD SHUFFLE ENGINE                 */
/* ============================================================ */

function initGiftBoxSurprise() {
  const scene1 = document.getElementById('giftBoxScene');
  const sceneShuffle = document.getElementById('photoShuffleScene');
  const glassStage = document.getElementById('glassBannerStage');
  const sceneMessage = document.getElementById('birthdayMessageScene');
  const replayBtn = document.getElementById('resetSurpriseBtn');
  if (!scene1) return;

  let openingTimers = [];
  const clearOpening = () => {
    cardSequenceRun += 1;
    openingTimers.forEach(clearTimeout);
    openingTimers = [];
    document.getElementById('memoryFlight')?.remove();
    document.getElementById('rouletteGlass')?.remove();
    stopCylinderAnimation();
  };
  const delay = (fn, ms) => openingTimers.push(setTimeout(fn, ms));

  const beginOpening = () => {
    clearOpening();
    scene1.classList.remove('fade-out', 'hidden', 'birthday-start', 'celebrating', 'cake-assembling', 'cake-ready', 'popper-encore');
    scene1.style.display = 'flex';
    void scene1.offsetWidth;
    document.body.classList.add('opening-cake');
    document.body.classList.remove('opening-celebrate');
    scene1.classList.add('celebrating', 'cake-assembling');
    sceneShuffle?.classList.add('hidden');
    glassStage?.classList.add('hidden');
    sceneMessage?.classList.add('hidden');

    // 0–7s: the cake completes its full assembly before the birthday reveal.
    delay(() => scene1.classList.add('cake-ready'), 7000);
    delay(() => {
      scene1.classList.remove('cake-assembling');
      scene1.classList.add('birthday-start');
      document.body.classList.remove('opening-cake');
      document.body.classList.add('opening-celebrate');
      triggerConfetti(10000);
      spawnHeartBurst(window.innerWidth / 2, window.innerHeight * 0.48, 28);
    }, 7000);
    // Retrigger party poppers during the full 10-second celebration.
    delay(() => {
      scene1.classList.remove('popper-encore');
      void scene1.offsetWidth;
      scene1.classList.add('popper-encore');
      spawnHeartBurst(window.innerWidth * 0.18, window.innerHeight * 0.42, 10);
      spawnHeartBurst(window.innerWidth * 0.82, window.innerHeight * 0.42, 10);
    }, 10500);
    delay(() => {
      scene1.classList.remove('popper-encore');
      void scene1.offsetWidth;
      scene1.classList.add('popper-encore');
    }, 13800);
    // The birthday scene still has its full celebration, then the card sequence begins.
    delay(() => scene1.classList.add('fade-out'), 15800);
    delay(() => {
      scene1.classList.add('hidden');
      scene1.style.display = 'none';
      document.body.classList.remove('opening-celebrate');
      sceneShuffle?.classList.remove('hidden');
      runCardShuffleDeal();
    }, 17000);
  };

  beginOpening();
  replayBtn?.addEventListener('click', beginOpening);
}

/* SCENE 3: ONE CONTINUOUS 7-SECOND PHOTO STACK → SHUFFLE → 3D CYLINDRICAL CAROUSEL */
function calculateCylinderRadius() {
  const w = window.innerWidth;
  let cardWidth;
  if (w <= 480) {
    cardWidth = Math.max(90, Math.min(w * 0.23, 110));
  } else if (w <= 768) {
    cardWidth = Math.max(115, Math.min(w * 0.17, 140));
  } else {
    cardWidth = Math.max(135, Math.min(w * 0.12, 168));
  }
  const total = 11;
  const gap = w <= 480 ? 14 : 24;
  const radius = Math.round((cardWidth + gap) / (2 * Math.tan(Math.PI / total)));
  return Math.max(w <= 480 ? 195 : 290, radius);
}

function runCardShuffleDeal() {
  const photoPaths = [
    'PHOTOS/WhatsApp Image 2026-08-29 at 12.04.09 PM.jpeg',
    'PHOTOS/WhatsApp Image 2026-08-29 at 12.04.10 PM.jpeg',
    'PHOTOS/WhatsApp Image 2026-08-29 at 12.04.24 PM.jpeg',
    'PHOTOS/WhatsApp Image 2026-08-29 at 12.04.25 PM.jpeg',
    'PHOTOS/WhatsApp Image 2026-08-29 at 12.04.26 PM (1).jpeg',
    'PHOTOS/WhatsApp Image 2026-08-29 at 12.04.26 PM.jpeg',
    'PHOTOS/WhatsApp Image 2026-08-29 at 12.04.27 PM (1).jpeg',
    'PHOTOS/WhatsApp Image 2026-08-29 at 12.04.27 PM.jpeg',
    'PHOTOS/WhatsApp Image 2026-08-29 at 12.04.29 PM.jpeg',
    'PHOTOS/WhatsApp Image 2026-08-29 at 12.04.31 PM.jpeg',
    'PHOTOS/WhatsApp Image 2026-08-29 at 12.04.32 PM.jpeg'
  ];
  const flight = document.createElement('div');
  const sequenceRun = ++cardSequenceRun;
  const totalPhotos = photoPaths.length;
  const orbitRadius = calculateCylinderRadius();
  const stackX = [-18, 14, -10, 21, -23, 8, 18, -15, 4, 24, -6];
  const stackY = [8, -4, 13, 2, -10, 16, -13, 5, -16, 11, -1];
  const stackTurn = [-9, 6, -5, 11, -12, 4, 9, -7, 2, 13, -3];
  const shuffleA = [-160, -96, -44, 32, 108, 169, 130, 56, -24, -100, -151];
  const shuffleB = [105, 146, 70, -35, -132, -175, -92, -14, 67, 151, 20];

  document.getElementById('memoryFlight')?.remove();
  stopCylinderAnimation();
  flight.id = 'memoryFlight';
  flight.className = 'memory-flight cards-stack';
  document.body.appendChild(flight);

  const position = document.createElement('div');
  position.className = 'roulette-position';
  const track = document.createElement('div');
  track.id = 'rouletteTrack';
  track.className = 'roulette-track';
  position.appendChild(track);
  flight.appendChild(position);

  photoPaths.forEach((src, index) => {
    const card = document.createElement('figure');
    // Compute 3D cylinder angle for each photo
    const angleDeg = (360 / totalPhotos) * index;
    card.className = 'flying-photo';
    card.style.setProperty('--photo-index', index);
    card.style.setProperty('--stack-x', `${stackX[index]}px`);
    card.style.setProperty('--stack-y', `${stackY[index]}px`);
    card.style.setProperty('--stack-turn', `${stackTurn[index]}deg`);
    card.style.setProperty('--stack-scale', (0.78 + index * 0.014).toFixed(3));
    card.style.setProperty('--stack-z', `${index * 5}px`);
    card.style.setProperty('--shuffle-a-x', `${shuffleA[index]}px`);
    card.style.setProperty('--shuffle-a-y', `${((index % 4) - 1.5) * 42}px`);
    card.style.setProperty('--shuffle-b-x', `${shuffleB[index]}px`);
    card.style.setProperty('--shuffle-b-y', `${((index % 3) - 1) * 54}px`);
    card.style.setProperty('--shuffle-a-turn', `${stackTurn[index] * -1.25}deg`);
    card.style.setProperty('--shuffle-b-turn', `${stackTurn[index] * 1.4}deg`);
    card.style.setProperty('--shuffle-delay', `${index * 42}ms`);
    card.style.setProperty('--orbit-angle', `${angleDeg}deg`);
    card.style.setProperty('--orbit-radius', `${orbitRadius}px`);
    card.innerHTML = `<img src="${src}" alt="Memory ${index + 1}"><figcaption>${index % 2 ? '✨ A little memory' : '❤️ Our moment'}</figcaption>`;
    track.appendChild(card);
  });

  document.documentElement.style.setProperty('--wheel-radius', `${orbitRadius}px`);

  const stage = (fn, delay) => setTimeout(() => {
    if (sequenceRun === cardSequenceRun && document.body.contains(flight)) fn();
  }, delay);
  requestAnimationFrame(() => {
    if (sequenceRun === cardSequenceRun) flight.classList.add('cards-stack-ready');
  });
  stage(() => { flight.classList.remove('cards-stack'); flight.classList.add('cards-flowing'); }, 1200);
  stage(() => { flight.classList.remove('cards-flowing'); flight.classList.add('cards-shuffling'); }, 2650);
  stage(() => { flight.classList.remove('cards-shuffling'); flight.classList.add('cards-gathering'); }, 4400);
  stage(() => { flight.classList.remove('cards-gathering'); flight.classList.add('cards-organizing'); }, 5300);
  stage(() => { flight.classList.remove('cards-organizing'); flight.classList.add('cards-settling'); }, 6700);
  stage(transitionToMemoryOrbit, 7000);
}

/* 🔮 PHASE 7: 3D CYLINDRICAL CAROUSEL ROTATION ENGINE & DRAG CONTROL */
let cylinderAnimationId = null;
let cylinderRotation = 0;
let isDraggingCylinder = false;
let dragStartX = 0;
let dragStartAngle = 0;
let dragInitialized = false;

function transitionToMemoryOrbit() {
  const flight = document.getElementById('memoryFlight');
  const track = document.getElementById('rouletteTrack');
  const glassStage = document.getElementById('glassBannerStage');
  const sceneMessage = document.getElementById('birthdayMessageScene');
  if (!flight) return;

  flight.classList.remove('photos-entering', 'photos-roaming', 'photos-slowing', 'photos-curving', 'photos-building', 'cards-stack', 'cards-stack-ready', 'cards-shuffling', 'cards-gathering', 'cards-organizing', 'cards-settling');
  track?.classList.add('orbit-mode');

  glassStage?.classList.remove('hidden');
  setTimeout(() => sceneMessage?.classList.remove('hidden'), 1200);

  startCylinderAnimation();
}

function startCylinderAnimation() {
  stopCylinderAnimation();

  const track = document.getElementById('rouletteTrack');
  if (!track) return;

  function loop() {
    if (!isDraggingCylinder) {
      // Smooth continuous 3D rotation around Y axis (approx 0.22 deg per frame)
      cylinderRotation = (cylinderRotation + 0.22) % 360;
      track.style.transform = `rotateY(${cylinderRotation}deg)`;
    }
    cylinderAnimationId = requestAnimationFrame(loop);
  }

  cylinderAnimationId = requestAnimationFrame(loop);
  initCylinderDrag();
}

function stopCylinderAnimation() {
  if (cylinderAnimationId) {
    cancelAnimationFrame(cylinderAnimationId);
    cylinderAnimationId = null;
  }
}

function initCylinderDrag() {
  if (dragInitialized) return;
  dragInitialized = true;

  function onPointerDown(e) {
    // Prevent dragging when interacting with quiz button or other UI buttons
    if (e.target.closest('#quizStartBannerBtn') || e.target.closest('.banner-quiz-cta') || e.target.closest('.action-pill-btn') || e.target.closest('.theme-btn') || e.target.closest('#musicBtn') || e.target.closest('#quizModal')) {
      return;
    }
    const track = document.getElementById('rouletteTrack');
    if (!track) return;

    isDraggingCylinder = true;
    dragStartX = e.clientX;
    dragStartAngle = cylinderRotation;
    track.classList.add('dragging');
  }

  function onPointerMove(e) {
    if (!isDraggingCylinder) return;
    const track = document.getElementById('rouletteTrack');
    if (!track) return;

    const deltaX = e.clientX - dragStartX;
    // Drag left -> rotates cylinder left, Drag right -> rotates cylinder right
    cylinderRotation = (dragStartAngle + deltaX * 0.38) % 360;
    track.style.transform = `rotateY(${cylinderRotation}deg)`;
  }

  function onPointerUp() {
    if (!isDraggingCylinder) return;
    isDraggingCylinder = false;
    const track = document.getElementById('rouletteTrack');
    if (track) track.classList.remove('dragging');
  }

  window.addEventListener('pointerdown', onPointerDown, { passive: true });
  window.addEventListener('pointermove', onPointerMove, { passive: true });
  window.addEventListener('pointerup', onPointerUp, { passive: true });
  window.addEventListener('pointercancel', onPointerUp, { passive: true });

  window.addEventListener('resize', () => {
    const newRadius = calculateCylinderRadius();
    document.documentElement.style.setProperty('--wheel-radius', `${newRadius}px`);
    document.querySelectorAll('.flying-photo').forEach(photo => {
      photo.style.setProperty('--orbit-radius', `${newRadius}px`);
    });
  });
}

/* ============================================ */
/*  THEME ENGINE — 4 ROMANTIC PALETTES          */
/* ============================================ */

let currentTheme = 'blush';
const themePalettes = {
  blush:       [['#ff85a1', '#ffb3c1', '#c9184a'], ['#ff4d6d', '#ff758f', '#fff0f3']],
  velvet:      [['#d90429', '#ffd166', '#ef233c'], ['#9b2226', '#ff4d6d', '#ffba08']],
  starlight:   [['#c77dff', '#e0aaff', '#7b2cbf'], ['#9d4edd', '#f368e0', '#48cae4']],
  candlelight: [['#ffb703', '#fcbf49', '#d62828'], ['#f77f00', '#ffd166', '#fb8500']]
};

function initThemeEngine() {
  const btns = document.querySelectorAll('.theme-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const theme = btn.dataset.theme;
      if (!theme) return;

      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Preserve any extra body classes (opening-cake, opening-celebrate, etc.)
      const preserveClasses = [...document.body.classList].filter(c => !c.startsWith('theme-'));
      document.body.className = '';
      preserveClasses.forEach(c => document.body.classList.add(c));
      document.body.classList.add(`theme-${theme}`);
      currentTheme = theme;

      spawnHeartBurst(window.innerWidth / 2, 100, 15);
    });
  });
}

/* ============================================ */
/*  LOVE ROULETTE PROMISES MODAL                */
/* ============================================ */

const promisesList = [
  "❤️ Hold your hand through every chapter of our story",
  "♾️ Grow old with you & celebrate your wildest dreams",
  "🎂 Make you smile on every single sunrise & sunset",
  "🫂 Give you endless warm hugs whenever life gets heavy",
  "✨ Be your biggest fan in everything you do, always",
  "💖 Love you endlessly today, tomorrow & in every lifetime",
  "🌹 Surprise you with roses when you least expect it",
  "💍 Choose you again & again in every universe",
  "🌙 Whisper 'I love you' under every moonlit sky",
  "🏡 Build a home full of laughter, love & little us-es",
  "💌 Write you love letters even when we are 80",
  "🌅 Watch every sunset with you by my side, forever"
];

function initLovePromiseRoulette() {
  const modal = document.getElementById('promiseModal');
  const openBtn = document.getElementById('spinPromisesBtn');
  const closeBtn = document.getElementById('promiseClose');
  const spinBtn = document.getElementById('spinNowBtn');
  const wheel = document.getElementById('promiseWheel');
  const resultDiv = document.getElementById('promiseResult');

  if (openBtn && modal) {
    openBtn.addEventListener('click', () => modal.classList.add('visible'));
  }
  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => modal.classList.remove('visible'));
  }

  let currentRotation = 0;
  if (spinBtn && wheel) {
    spinBtn.addEventListener('click', () => {
      const randomIndex = Math.floor(Math.random() * promisesList.length);
      const sectorAngle = 360 / promisesList.length;
      const targetAngle = 360 * 5 + (randomIndex * sectorAngle) + sectorAngle / 2;

      currentRotation += targetAngle;
      wheel.style.transform = `rotate(${currentRotation}deg)`;

      if (resultDiv) resultDiv.innerHTML = "Spinning with love... ✨";

      setTimeout(() => {
        if (resultDiv) resultDiv.innerHTML = promisesList[randomIndex];
        spawnHeartBurst(window.innerWidth / 2, window.innerHeight / 2, 20);
      }, 3500);
    });
  }
}

/* ============================================ */
/*  BACKGROUND MUSIC AUDIO PLAYER               */
/* ============================================ */

let bgmAudio = null;
let isPlaying = false;

function startMusic() {
  if (bgmAudio && isPlaying) return;

  if (!bgmAudio) {
    bgmAudio = new Audio('WhatsApp Audio 2026-08-29 at 10.51.45 AM.aac');
    bgmAudio.loop = true;
  }

  bgmAudio.volume = 0;
  bgmAudio.play().then(() => {
    isPlaying = true;
    updateMusicIcon();

    let vol = 0;
    const fadeIn = setInterval(() => {
      vol += 0.03;
      if (vol >= 0.75) {
        vol = 0.75;
        clearInterval(fadeIn);
      }
      bgmAudio.volume = vol;
    }, 50);
  }).catch(() => {
    isPlaying = false;
    updateMusicIcon();
  });
}

function stopMusic() {
  if (!bgmAudio) return;

  let vol = bgmAudio.volume;
  const fadeOut = setInterval(() => {
    vol -= 0.05;
    if (vol <= 0) {
      vol = 0;
      clearInterval(fadeOut);
      bgmAudio.pause();
      isPlaying = false;
      updateMusicIcon();
    }
    bgmAudio.volume = vol;
  }, 50);
}

function initMusicToggle() {
  const btn = document.getElementById('musicBtn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    if (isPlaying) stopMusic();
    else startMusic();
  });
}

function updateMusicIcon() {
  const on = document.getElementById('iconOn');
  const off = document.getElementById('iconOff');
  if (!on || !off) return;

  if (isPlaying) {
    on.classList.remove('hidden');
    off.classList.add('hidden');
  } else {
    on.classList.add('hidden');
    off.classList.remove('hidden');
  }
}

/* ============================================ */
/*  FIREWORKS & SPARKLE PARTICLES               */
/* ============================================ */

function initFireworks() {
  const canvas = document.getElementById('fireworksCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const rockets = [];
  const sparks = [];

  function spawnRocket() {
    const x = Math.random() * canvas.width * 0.8 + canvas.width * 0.1;
    const targetY = Math.random() * canvas.height * 0.35 + canvas.height * 0.08;
    const activePalettes = themePalettes[currentTheme] || themePalettes.blush;

    rockets.push({
      x,
      y: canvas.height + 10,
      targetY,
      speed: 3.5 + Math.random() * 3.5,
      trail: [],
      palette: activePalettes[Math.floor(Math.random() * activePalettes.length)],
    });
  }

  function explode(x, y, palette) {
    const count = 45 + Math.floor(Math.random() * 35);
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 / count) * i + (Math.random() - 0.5) * 0.4;
      const speed = 1.5 + Math.random() * 4.5;
      sparks.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        gravity: 0.035 + Math.random() * 0.02,
        alpha: 1,
        decay: 0.008 + Math.random() * 0.012,
        size: Math.random() * 2.2 + 0.6,
        color: palette[Math.floor(Math.random() * palette.length)],
      });
    }
  }

  function animate() {
    ctx.fillStyle = 'rgba(10, 5, 14, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = rockets.length - 1; i >= 0; i--) {
      const r = rockets[i];
      r.y -= r.speed;
      ctx.beginPath();
      ctx.arc(r.x, r.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = r.palette[0];
      ctx.fill();

      if (r.y <= r.targetY) {
        explode(r.x, r.y, r.palette);
        rockets.splice(i, 1);
      }
    }

    for (let i = sparks.length - 1; i >= 0; i--) {
      const s = sparks[i];
      s.x += s.vx;
      s.vy += s.gravity;
      s.y += s.vy;
      s.alpha -= s.decay;

      if (s.alpha <= 0) {
        sparks.splice(i, 1);
        continue;
      }

      ctx.globalAlpha = s.alpha;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fillStyle = s.color;
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    requestAnimationFrame(animate);
  }

  setInterval(() => {
    if (Math.random() > 0.3) spawnRocket();
  }, 2200);

  animate();
}

function initHeartBurstOnClick() {
  window.addEventListener('click', (e) => {
    if (e.target.closest('button') || e.target.closest('.theme-btn') || e.target.closest('#giftBoxContainer')) return;
    spawnHeartBurst(e.clientX, e.clientY, 6);
  });
}

function spawnHeartBurst(x, y, count = 8) {
  const symbols = ['❤️', '💖', '✨', '♾️', '💘', '🌸', '🎂'];
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.innerText = symbols[Math.floor(Math.random() * symbols.length)];
    el.style.position = 'fixed';
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.fontSize = `${Math.random() * 16 + 14}px`;
    el.style.pointerEvents = 'none';
    el.style.zIndex = '9999';
    el.style.transition = 'all 1.2s cubic-bezier(0.15, 0.85, 0.35, 1.2)';

    document.body.appendChild(el);

    const angle = Math.random() * Math.PI * 2;
    const dist = Math.random() * 80 + 30;
    const destX = x + Math.cos(angle) * dist;
    const destY = y + Math.sin(angle) * dist - 40;

    requestAnimationFrame(() => {
      el.style.transform = `translate(${destX - x}px, ${destY - y}px) scale(1.4) rotate(${Math.random() * 40 - 20}deg)`;
      el.style.opacity = '0';
    });

    setTimeout(() => el.remove(), 1200);
  }
}

/* ============================================================ */
/*  INTERACTIVE 3-QUESTION SURPRISE QUIZ & CONFETTI ENGINE      */
/* ============================================================ */

let currentGradientIndex = 0;
const romanticSoftGradients = [
  'radial-gradient(circle at 50% 40%, #2e0f24 0%, #150612 100%)',
  'radial-gradient(circle at 40% 60%, #301138 0%, #0e0517 100%)',
  'radial-gradient(circle at 60% 30%, #381223 0%, #13030e 100%)',
  'radial-gradient(circle at 30% 70%, #182045 0%, #06091c 100%)',
  'radial-gradient(circle at 70% 50%, #3d1b1c 0%, #150608 100%)',
  'radial-gradient(circle at 50% 50%, #271238 0%, #0c0214 100%)',
  'radial-gradient(circle at 35% 35%, #132d2f 0%, #041214 100%)',
  'radial-gradient(circle at 65% 65%, #3c1a32 0%, #170715 100%)',
  'radial-gradient(circle at 50% 30%, #40142b 0%, #180511 100%)'
];

let resetQuizStateGlobal = null;

function initMultiStepQuiz() {
  const bannerBtn = document.getElementById('quizStartBannerBtn');
  const modal = document.getElementById('quizModal');
  const closeBtn = document.getElementById('quizCloseBtn');
  const backdrop = document.getElementById('quizBackdrop');

  // Step Containers
  const step1 = document.getElementById('quizStep1');
  const step2 = document.getElementById('quizStep2');
  const step3 = document.getElementById('quizStep3');
  const finalResult = document.getElementById('quizFinalResult');

  // Dots & Lines
  const dot1 = document.getElementById('dot1');
  const dot2 = document.getElementById('dot2');
  const dot3 = document.getElementById('dot3');
  const line1 = document.getElementById('line1');
  const line2 = document.getElementById('line2');

  // Question 1 elements
  const q1YesBtn = document.getElementById('q1YesBtn');
  const q1NoBtn = document.getElementById('q1NoBtn');
  const quizEmoji1 = document.getElementById('quizEmoji1');
  const quizSub1 = document.getElementById('quizSub1');
  const quizBtnGroup1 = document.getElementById('quizBtnGroup1');
  let q1NoCount = 0;
  let q1Answered = false;

  // Question 2 elements
  const q2YesBtn = document.getElementById('q2YesBtn');
  const q2NoBtn = document.getElementById('q2NoBtn');
  const quizEmoji2 = document.getElementById('quizEmoji2');
  const quizSub2 = document.getElementById('quizSub2');
  const quizBtnGroup2 = document.getElementById('quizBtnGroup2');
  let q2NoCount = 0;
  let q2Answered = false;

  // Question 3 elements
  const kidBtns = document.querySelectorAll('.kid-opt-btn');
  const finalResultTitle = document.getElementById('finalResultTitle');
  const finalResultDetail = document.getElementById('finalResultDetail');
  const scrollToLetterBtn = document.getElementById('scrollToLetterBtn');

  // Open Quiz Modal from 3D Rotating Carousel Banner Button
  if (bannerBtn) {
    bannerBtn.addEventListener('click', () => {
      // Automatically stop background music upon clicking banner
      stopMusic();

      if (modal) modal.classList.add('visible');
      if (typeof resetQuizStateGlobal === 'function') resetQuizStateGlobal();
      spawnHeartBurst(window.innerWidth / 2, window.innerHeight / 2, 20);
    });
  }

  function closeQuiz() {
    if (modal) modal.classList.remove('visible');
    if (q1NoBtn) q1NoBtn.classList.remove('jumping');
    if (q2NoBtn) q2NoBtn.classList.remove('jumping');
  }

  if (closeBtn) closeBtn.addEventListener('click', closeQuiz);
  if (backdrop) backdrop.addEventListener('click', closeQuiz);

  resetQuizStateGlobal = function resetQuizState() {
    q1NoCount = 0;
    q1Answered = false;
    q2NoCount = 0;
    q2Answered = false;

    // Show Step 1, hide others
    step1.classList.remove('hidden');
    step2.classList.add('hidden');
    step3.classList.add('hidden');
    finalResult.classList.add('hidden');

    // Reset Progress Bar
    dot1.classList.add('active');
    dot2.classList.remove('active');
    dot3.classList.remove('active');
    line1.classList.remove('filled');
    line2.classList.remove('filled');

    // Reset Buttons and Emojis
    if (quizBtnGroup1) quizBtnGroup1.classList.remove('hide-buttons');
    if (q1YesBtn) {
      q1YesBtn.style.opacity = '1';
      q1YesBtn.style.transform = 'scale(1)';
    }
    if (q1NoBtn) {
      q1NoBtn.style.opacity = '1';
      q1NoBtn.style.transform = 'scale(1)';
      q1NoBtn.classList.remove('jumping');
      q1NoBtn.style.position = '';
      q1NoBtn.style.left = '';
      q1NoBtn.style.top = '';
    }
    if (quizEmoji1) quizEmoji1.textContent = '🥰💘';
    if (quizSub1) quizSub1.textContent = 'Be honest… my heart is listening 👀💗';

    if (quizBtnGroup2) quizBtnGroup2.classList.remove('hide-buttons');
    if (q2YesBtn) {
      q2YesBtn.style.opacity = '1';
      q2YesBtn.style.transform = 'scale(1)';
    }
    if (q2NoBtn) {
      q2NoBtn.style.opacity = '1';
      q2NoBtn.style.transform = 'scale(1)';
      q2NoBtn.classList.remove('jumping');
      q2NoBtn.style.position = '';
      q2NoBtn.style.left = '';
      q2NoBtn.style.top = '';
    }
    if (quizEmoji2) quizEmoji2.textContent = '💍🥹';
    if (quizSub2) quizSub2.textContent = 'Say yes… I have a forever planned with you ♾️😘';
    document.body.style.background = '';
  };

  // --- QUESTION 1 LOGIC ---
  if (q1NoBtn) {
    q1NoBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (q1Answered) return;

      q1NoCount++;
      spawnHeartBurst(e.clientX, e.clientY, 8);
      jumpButtonRandomly(q1NoBtn);

      // Change background soft gradient
      currentGradientIndex = (currentGradientIndex + 1) % romanticSoftGradients.length;
      document.body.style.background = romanticSoftGradients[currentGradientIndex];

      // After 2 clicks change emoji to 🥺
      if (q1NoCount >= 2) {
        quizEmoji1.textContent = '🥺';
        quizEmoji1.style.transform = 'scale(1.35) rotate(-6deg)';
        setTimeout(() => { quizEmoji1.style.transform = 'scale(1)'; }, 300);
        quizSub1.textContent = "Bangaram please... don't say no! 🥺❤️";
      } else {
        quizSub1.textContent = "Wait, are you sure? Think again Bangaram! 🥺💖";
      }
    });
  }

  if (q1YesBtn) {
    q1YesBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (q1Answered) return;
      q1Answered = true;

      spawnHeartBurst(e.clientX, e.clientY, 30);
      quizEmoji1.textContent = '🥰💘';
      quizSub1.textContent = 'I knew it! You love me the most! 💘😘';

      // 5-second Confetti effect
      triggerConfetti(5000);

      // Smoothly hide both YES and NO buttons after 1 second, then switch to Question 2
      setTimeout(() => {
        quizBtnGroup1.classList.add('hide-buttons');
        q1YesBtn.style.opacity = '0';
        q1YesBtn.style.transform = 'scale(0.5)';
        q1NoBtn.style.opacity = '0';
        q1NoBtn.style.transform = 'scale(0.5)';

        setTimeout(() => {
          q1NoBtn.classList.remove('jumping');
          step1.classList.add('hidden');
          step2.classList.remove('hidden');

          // Update Progress Bar
          line1.classList.add('filled');
          dot2.classList.add('active');
        }, 600);
      }, 1000);
    });
  }

  // --- QUESTION 2 LOGIC ---
  if (q2NoBtn) {
    q2NoBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (q2Answered) return;

      q2NoCount++;
      spawnHeartBurst(e.clientX, e.clientY, 8);
      jumpButtonRandomly(q2NoBtn);

      // Change background soft gradient
      currentGradientIndex = (currentGradientIndex + 1) % romanticSoftGradients.length;
      document.body.style.background = romanticSoftGradients[currentGradientIndex];

      // After 2 clicks change emoji to 🥺
      if (q2NoCount >= 2) {
        quizEmoji2.textContent = '🥺';
        quizEmoji2.style.transform = 'scale(1.35) rotate(-6deg)';
        setTimeout(() => { quizEmoji2.style.transform = 'scale(1)'; }, 300);
        quizSub2.textContent = "Hey! You're my wife forever! You have to say YES! 🥺❤️";
      } else {
        quizSub2.textContent = "There is no escape from my love, Bangaram! 🥺💍";
      }
    });
  }

  if (q2YesBtn) {
    q2YesBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (q2Answered) return;
      q2Answered = true;

      spawnHeartBurst(e.clientX, e.clientY, 35);
      quizEmoji2.textContent = '💍🥹';
      quizSub2.textContent = 'Forever & always… in this life and all to come! ♾️❤️😘';

      // 5-second Confetti effect
      triggerConfetti(5000);

      // Smoothly hide both YES and NO buttons after 1 second, then switch to Question 3
      setTimeout(() => {
        quizBtnGroup2.classList.add('hide-buttons');
        q2YesBtn.style.opacity = '0';
        q2YesBtn.style.transform = 'scale(0.5)';
        q2NoBtn.style.opacity = '0';
        q2NoBtn.style.transform = 'scale(0.5)';

        setTimeout(() => {
          q2NoBtn.classList.remove('jumping');
          step2.classList.add('hidden');
          step3.classList.remove('hidden');

          // Update Progress Bar
          line2.classList.add('filled');
          dot3.classList.add('active');
        }, 600);
      }, 1000);
    });
  }

  // --- QUESTION 3 LOGIC (4 OPTIONS — ONLY 99+ WORKS, REST JUMP) ---
  const kidsResponses = {
    '99': "⚽🏏 Haha! Our very own cricket & football team! Get ready for the wildest and happiest adventure ever, Bangaram! 🤣❤️"
  };

  const quizEmoji3 = document.getElementById('quizEmoji3');
  const quizSub3 = document.getElementById('quizSub3');
  let kidJumpCount = 0;

  kidBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const choice = btn.dataset.kids;

      // Only 99+ kids actually works
      if (choice === '99') {
        spawnHeartBurst(e.clientX, e.clientY, 40);
        triggerConfetti(5000);

        // Reset any jumping buttons back to normal
        kidBtns.forEach(b => {
          b.classList.remove('jumping');
          b.style.position = '';
          b.style.left = '';
          b.style.top = '';
          b.style.transform = '';
        });

        step3.classList.add('hidden');
        const quizModal = document.getElementById('quizModal');
        if (quizModal) quizModal.classList.remove('visible');
        setTimeout(() => startPostQuizSurprise(), 520);
        return;
      }

      // Other buttons jump to random spots!
      kidJumpCount++;
      e.preventDefault();
      e.stopPropagation();

      spawnHeartBurst(e.clientX, e.clientY, 8);
      jumpButtonRandomly(btn);

      // Change background gradient
      currentGradientIndex = (currentGradientIndex + 1) % romanticSoftGradients.length;
      document.body.style.background = romanticSoftGradients[currentGradientIndex];

      // Fun messages
      if (kidJumpCount >= 3) {
        if (quizEmoji3) quizEmoji3.textContent = '🥺';
        if (quizSub3) quizSub3.textContent = "Bangaram please! Only 99+ is the right answer! 🥺⚽";
      } else if (kidJumpCount >= 2) {
        if (quizSub3) quizSub3.textContent = "Haha! That button ran away! Try 99+ kids! 😜🏏";
      } else {
        if (quizSub3) quizSub3.textContent = "Oops! That's not the right answer! 😄💖";
      }
    });
  });

  // Scroll down to love letter button
  if (scrollToLetterBtn) {
    scrollToLetterBtn.addEventListener('click', () => {
      closeQuiz();
      const loveLetter = document.getElementById('birthdayMessageScene');
      if (loveLetter) {
        loveLetter.scrollIntoView({ behavior: 'smooth', block: 'start' });
        spawnHeartBurst(window.innerWidth / 2, window.innerHeight / 2, 20);
      }
    });
  }
}

let startPostQuizSurprise = () => {};

/* ============================================================ */
/*  POST-QUIZ INTERACTIVE SURPRISE — INTERACTION-BASED ARCHERY   */
/* ============================================================ */

function initPostQuizSurprise() {
  const sequence = document.getElementById('surpriseSequence');
  const yesBtn = document.getElementById('surpriseYesBtn');
  const noBtn = document.getElementById('surpriseNoBtn');
  const tease = document.getElementById('surpriseTease');
  const giftBox = document.getElementById('surpriseGiftBox');
  const bow = document.getElementById('surpriseBow');
  const letterBtn = document.getElementById('surpriseLetterBtn');
  const photos = [...document.querySelectorAll('.surprise-photo')];
  if (!sequence || !yesBtn || !noBtn || !giftBox || !bow || !letterBtn) return;

  let yesEscapes = 0;
  let giftOpened = false;
  let revealedPhotos = 0;
  let isAnimating = false;
  let shotInFlight = false;
  let pulling = false;
  let pullStartX = 0;
  let pullAmount = 0;
  let activeArrowRAF = null;
  let surpriseTimers = [];

  const addTimer = (fn, delay) => {
    const id = setTimeout(fn, delay);
    surpriseTimers.push(id);
    return id;
  };

  const clearAllTimers = () => {
    surpriseTimers.forEach(id => clearTimeout(id));
    surpriseTimers = [];
  };

  const setTease = (message) => {
    if (tease) tease.textContent = message;
  };

  function getElementCenter(el) {
    const rect = el.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    };
  }

  function drawTrajectoryPath(start, target) {
    let svg = document.getElementById('trajectorySvg');
    if (!svg) {
      svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.id = 'trajectorySvg';
      svg.setAttribute('class', 'trajectory-svg');
      svg.innerHTML = `
        <defs>
          <linearGradient id="trajectoryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#ffe699" stop-opacity="0.95" />
            <stop offset="45%" stop-color="#ff75a0" stop-opacity="0.9" />
            <stop offset="100%" stop-color="#e8175d" stop-opacity="0.95" />
          </linearGradient>
        </defs>
        <path id="trajectoryPathEl" class="trajectory-path" />
      `;
      sequence.appendChild(svg);
    }

    const pathEl = document.getElementById('trajectoryPathEl');
    if (!pathEl) return;

    const dx = target.x - start.x;
    const dy = target.y - start.y;
    const dist = Math.hypot(dx, dy);
    const midX = (start.x + target.x) / 2;
    const midY = (start.y + target.y) / 2;
    // Ballistic arc curving upwards against gravity
    const ctrlX = midX;
    const ctrlY = midY - Math.max(50, dist * 0.22);

    pathEl.setAttribute('d', `M ${start.x} ${start.y} Q ${ctrlX} ${ctrlY} ${target.x} ${target.y}`);
    pathEl.style.opacity = '0.85';
  }

  function clearTrajectoryPath() {
    const pathEl = document.getElementById('trajectoryPathEl');
    if (pathEl) pathEl.style.opacity = '0';
  }

  // Aims at the target photo and WAITS for user interaction (NO auto-shooting)
  function setReadyTarget(photoIndex) {
    if (photoIndex >= photos.length || !sequence.classList.contains('active')) return;
    const targetPhoto = photos[photoIndex];
    if (!targetPhoto) return;

    photos.forEach(p => p.querySelector('.photo-target')?.classList.remove('target-aimed'));
    const targetMarker = targetPhoto.querySelector('.photo-target');
    if (targetMarker) targetMarker.classList.add('target-aimed');

    const bowCenter = getElementCenter(bow);
    const targetCenter = getElementCenter(targetPhoto);

    const angleRad = Math.atan2(targetCenter.y - bowCenter.y, targetCenter.x - bowCenter.x);
    const angleDeg = angleRad * (180 / Math.PI);

    // Smoothly swivel bow to point directly at the active target
    bow.style.setProperty('--aim-angle', `${angleDeg}deg`);

    drawTrajectoryPath(bowCenter, targetCenter);

    // Make bow interactively ready for user tap/click
    bow.classList.add('interactive-ready');
    isAnimating = false;
    shotInFlight = false;
  }

  function spawnArrowTrailParticle(x, y, angleRad) {
    const symbols = ['❤️', '✨', '💖', '✦', '💕'];
    const p = document.createElement('span');
    p.className = 'arrow-trail-particle';
    p.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    const backOffset = 32;
    const px = x - Math.cos(angleRad) * backOffset + (Math.random() - 0.5) * 14;
    const py = y - Math.sin(angleRad) * backOffset + (Math.random() - 0.5) * 14;
    p.style.left = `${px}px`;
    p.style.top = `${py}px`;
    p.style.setProperty('--dx', `${(Math.random() - 0.5) * 22}px`);
    p.style.setProperty('--dy', `${(Math.random() - 0.5) * 22 + 8}px`);
    p.style.setProperty('--rot', `${(Math.random() - 0.5) * 44}deg`);
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 650);
  }

  function animateArrowToTarget({ start, target, targetPhoto, onComplete }) {
    const dx = target.x - start.x;
    const dy = target.y - start.y;
    const dist = Math.hypot(dx, dy);
    const ctrlX = (start.x + target.x) / 2;
    const ctrlY = (start.y + target.y) / 2 - Math.max(50, dist * 0.22);

    const flyingArrow = document.createElement('div');
    flyingArrow.className = 'flying-love-arrow';
    document.body.appendChild(flyingArrow);

    const duration = Math.min(920, Math.max(680, dist * 1.25));
    const startTime = performance.now();
    let lastParticleTime = 0;

    function frame(now) {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const t = progress;

      // Quadratic Bezier interpolation for curved ballistic flight
      const curX = (1 - t) * (1 - t) * start.x + 2 * (1 - t) * t * ctrlX + t * t * target.x;
      const curY = (1 - t) * (1 - t) * start.y + 2 * (1 - t) * t * ctrlY + t * t * target.y;

      // Derivative vector for dynamic tangent rotation
      const derivX = 2 * (1 - t) * (ctrlX - start.x) + 2 * t * (target.x - ctrlX);
      const derivY = 2 * (1 - t) * (ctrlY - start.y) + 2 * t * (target.y - ctrlY);
      const angleRad = Math.atan2(derivY, derivX);
      const angleDeg = angleRad * (180 / Math.PI);

      // Depth scaling from foreground (1.04) to target distance (0.96)
      const scale = 1.04 - (0.08 * progress);

      flyingArrow.style.left = `${curX}px`;
      flyingArrow.style.top = `${curY}px`;
      flyingArrow.style.transform = `translate(-50%, -50%) rotate(${angleDeg}deg) scale(${scale})`;

      if (now - lastParticleTime > 30 && progress < 0.96) {
        lastParticleTime = now;
        spawnArrowTrailParticle(curX, curY, angleRad);
      }

      if (progress < 1) {
        activeArrowRAF = requestAnimationFrame(frame);
      } else {
        flyingArrow.style.transform = `translate(-50%, -50%) rotate(${angleDeg}deg) scale(1.15)`;
        setTimeout(() => flyingArrow.remove(), 260);
        onComplete();
      }
    }

    activeArrowRAF = requestAnimationFrame(frame);
  }

  // TRIGGERED ONLY WHEN USER CLICKS OR TAPS THE BOW
  function handleBowUserShot() {
    if (isAnimating || shotInFlight || !giftOpened || revealedPhotos >= photos.length) return;
    isAnimating = true;
    shotInFlight = true;

    bow.classList.remove('interactive-ready');

    const targetPhoto = photos[revealedPhotos];
    const bowCenter = getElementCenter(bow);
    const targetCenter = getElementCenter(targetPhoto);

    // Realistic draw tension
    bow.classList.add('drawn', 'firing');
    bow.style.setProperty('--pull-distance', '44px');
    bow.style.setProperty('--string-pull-distance', '-20px');

    addTimer(() => {
      bow.classList.remove('drawn');
      bow.style.removeProperty('--pull-distance');
      bow.style.removeProperty('--string-pull-distance');

      clearTrajectoryPath();

      animateArrowToTarget({
        start: bowCenter,
        target: targetCenter,
        targetPhoto,
        onComplete: () => {
          targetPhoto.classList.add('target-hit', 'revealed');
          const marker = targetPhoto.querySelector('.photo-target');
          if (marker) marker.classList.remove('target-aimed');

          spawnHeartBurst(targetCenter.x, targetCenter.y, 24);

          revealedPhotos += 1;
          bow.classList.remove('firing');

          if (revealedPhotos < photos.length) {
            // Settle impact, then aim at next photo and WAIT for the user to click again!
            addTimer(() => {
              setReadyTarget(revealedPhotos);
            }, 500);
          } else {
            // All 3 photos revealed!
            isAnimating = false;
            shotInFlight = false;
            bow.classList.add('complete');
            addTimer(() => sequence.classList.add('show-letter'), 720);
          }
        }
      });
    }, 220);
  }

  const resetSequence = () => {
    clearAllTimers();
    if (activeArrowRAF) {
      cancelAnimationFrame(activeArrowRAF);
      activeArrowRAF = null;
    }
    document.querySelectorAll('.flying-love-arrow, .arrow-trail-particle').forEach(el => el.remove());
    clearTrajectoryPath();
    yesEscapes = 0;
    giftOpened = false;
    revealedPhotos = 0;
    isAnimating = false;
    shotInFlight = false;
    pulling = false;
    pullAmount = 0;
    sequence.className = 'surprise-sequence active show-gate';
    sequence.setAttribute('aria-hidden', 'false');
    yesBtn.style.transform = '';
    noBtn.style.transform = '';
    giftBox.classList.remove('gift-opened');
    bow.classList.remove('pulling', 'drawn', 'firing', 'complete', 'interactive-ready');
    bow.style.removeProperty('--pull-distance');
    bow.style.removeProperty('--string-pull-distance');
    bow.style.removeProperty('--aim-angle');
    photos.forEach(photo => {
      photo.classList.remove('balloon-out', 'revealed', 'target-hit');
      photo.querySelector('.photo-target')?.classList.remove('target-aimed');
    });
    setTease('Choose carefully, Bangaram. ✨');
  };

  startPostQuizSurprise = resetSequence;

  const moveButton = (button, rangeX, rangeY) => {
    const x = Math.round((Math.random() * 2 - 1) * rangeX);
    const y = Math.round((Math.random() * 2 - 1) * rangeY);
    button.style.transform = `translate(${x}px, ${y}px) rotate(${Math.round(Math.random() * 8 - 4)}deg)`;
    button.classList.remove('button-bounce');
    void button.offsetWidth;
    button.classList.add('button-bounce');
  };

  noBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const messages = ['Nice try 😏', 'Not happening 😂', 'Try again!', 'That one is shy 🙈'];
    moveButton(noBtn, Math.min(155, window.innerWidth * 0.26), 96);
    setTease(messages[Math.floor(Math.random() * messages.length)]);
    spawnHeartBurst(event.clientX || window.innerWidth / 2, event.clientY || window.innerHeight / 2, 8);
  });

  yesBtn.addEventListener('click', (event) => {
    event.preventDefault();
    if (yesEscapes < 3) {
      const messages = ['Wait... 👀', 'Too easy 😏', 'Okay okay... 😂'];
      setTease(messages[yesEscapes]);
      yesEscapes += 1;
      moveButton(yesBtn, Math.min(120, window.innerWidth * 0.2), 72);
      return;
    }
    sequence.classList.remove('show-gate');
    sequence.classList.add('show-gift');
    setTease('');
    spawnHeartBurst(event.clientX || window.innerWidth / 2, event.clientY || window.innerHeight / 2, 22);
  });

  giftBox.addEventListener('click', (event) => {
    if (giftOpened) return;
    giftOpened = true;
    giftBox.classList.add('gift-opened');
    triggerConfetti(1400);
    spawnHeartBurst(event.clientX || window.innerWidth / 2, event.clientY || window.innerHeight / 2, 28);
    photos.forEach((photo, index) => {
      addTimer(() => photo.classList.add('balloon-out'), 520 + index * 1120);
    });
    // Bow appears and aims at Photo 1, then WAITS for user click
    addTimer(() => {
      sequence.classList.add('show-bow');
      setReadyTarget(0);
    }, 3920);
  });

  // User click / pointer interaction on the bow
  bow.addEventListener('pointerdown', (event) => {
    if (isAnimating || shotInFlight || !giftOpened || revealedPhotos >= photos.length) return;
    pulling = true;
    pullStartX = event.clientX;
    pullAmount = 0;
    try { bow.setPointerCapture(event.pointerId); } catch (_) {}
    bow.classList.add('pulling');
    event.preventDefault();
  });

  bow.addEventListener('pointermove', (event) => {
    if (!pulling) return;
    const distance = Math.max(0, Math.min(65, pullStartX - event.clientX));
    pullAmount = distance;
    bow.style.setProperty('--pull-distance', `${distance}px`);
    bow.style.setProperty('--string-pull-distance', `${Math.round(distance * -0.45)}px`);
  });

  const onBowPointerUp = (event) => {
    if (!pulling && !event.isTrusted) return;
    if (isAnimating || shotInFlight) return;
    pulling = false;
    try { bow.releasePointerCapture(event.pointerId); } catch (_) {}
    bow.classList.remove('pulling');
    handleBowUserShot();
  };

  bow.addEventListener('pointerup', onBowPointerUp);
  bow.addEventListener('pointercancel', () => {
    pulling = false;
    bow.classList.remove('pulling');
  });

  bow.addEventListener('click', (event) => {
    event.preventDefault();
    if (!isAnimating && !shotInFlight && giftOpened && revealedPhotos < photos.length) {
      handleBowUserShot();
    }
  });

  window.addEventListener('resize', () => {
    if (sequence.classList.contains('active') && sequence.classList.contains('show-bow') && revealedPhotos < photos.length && !shotInFlight) {
      setReadyTarget(revealedPhotos);
    }
  });

  letterBtn.addEventListener('click', () => {
    if (revealedPhotos < photos.length) return;
    sequence.classList.add('letter-opening');
    addTimer(() => {
      sequence.classList.remove('active');
      sequence.setAttribute('aria-hidden', 'true');
      document.dispatchEvent(new CustomEvent('open-surprise-letter'));
    }, 460);
  });
}

function jumpButtonRandomly(btn) {
  btn.classList.add('jumping');

  const padding = 25;
  const btnWidth = btn.offsetWidth || 130;
  const btnHeight = btn.offsetHeight || 50;

  const maxLeft = Math.max(padding, window.innerWidth - btnWidth - padding);
  const maxTop = Math.max(80, window.innerHeight - btnHeight - padding);

  const randomLeft = Math.floor(Math.random() * (maxLeft - padding)) + padding;
  const randomTop = Math.floor(Math.random() * (maxTop - 80)) + 80;

  btn.style.left = `${randomLeft}px`;
  btn.style.top = `${randomTop}px`;
  btn.style.transform = `scale(1.08) rotate(${Math.random() * 16 - 8}deg)`;

  setTimeout(() => {
    btn.style.transform = 'scale(1)';
  }, 250);
}

/* ============================================================ */
/*  5-SECOND CINEMATIC CONFETTI EFFECT                          */
/* ============================================================ */

function triggerConfetti(duration = 5000) {
  let canvas = document.getElementById('confettiCanvas');
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'confettiCanvas';
    document.body.appendChild(canvas);
  }

  canvas.style.display = 'block';
  canvas.style.opacity = '1';
  canvas.style.transition = 'opacity 0.6s ease';

  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();

  const confettiColors = [
    '#ff4d6d', '#ff85a1', '#ffd166', '#06d6a0', '#118ab2',
    '#a0c4ff', '#ffc6ff', '#e0aaff', '#ffffff', '#ffb703', '#f72585'
  ];
  const confettiShapes = ['rect', 'circle', 'heart', 'ribbon'];
  const particles = [];
  const particleCount = 140;

  function createParticle(fromExplosion = false) {
    const shape = confettiShapes[Math.floor(Math.random() * confettiShapes.length)];
    const color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
    const size = Math.random() * 8 + 6;

    let x, y, vx, vy;
    if (fromExplosion) {
      x = window.innerWidth / 2 + (Math.random() - 0.5) * 120;
      y = window.innerHeight / 2 + (Math.random() - 0.5) * 100;
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 12 + 4;
      vx = Math.cos(angle) * speed;
      vy = Math.sin(angle) * speed - 4;
    } else {
      x = Math.random() * canvas.width;
      y = -20;
      vx = (Math.random() - 0.5) * 4;
      vy = Math.random() * 4 + 2.5;
    }

    return {
      x,
      y,
      vx,
      vy,
      size,
      color,
      shape,
      rotation: Math.random() * 360,
      spinSpeed: (Math.random() - 0.5) * 12,
      wobble: Math.random() * 10,
      wobbleSpeed: Math.random() * 0.1 + 0.05,
      gravity: 0.16 + Math.random() * 0.08,
      opacity: 1
    };
  }

  // Seed initial particles with explosive burst
  for (let i = 0; i < particleCount; i++) {
    particles.push(createParticle(true));
  }

  let animationFrameId;
  const startTime = performance.now();

  function render(time) {
    const elapsed = time - startTime;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Continue spawning while within duration
    if (elapsed < duration - 800 && particles.length < particleCount + 50) {
      if (Math.random() < 0.8) {
        particles.push(createParticle(false));
      }
    }

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx + Math.sin(p.wobble) * 1.5;
      p.y += p.vy;
      p.vy += p.gravity;
      p.vx *= 0.98;
      p.rotation += p.spinSpeed;
      p.wobble += p.wobbleSpeed;

      // Start fading during the final 800ms
      if (elapsed > duration - 800) {
        p.opacity = Math.max(0, 1 - (elapsed - (duration - 800)) / 800);
      }

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;

      if (p.shape === 'circle') {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.shape === 'heart') {
        ctx.font = `${p.size * 1.3}px sans-serif`;
        ctx.fillText('💖', -p.size / 2, p.size / 2);
      } else if (p.shape === 'ribbon') {
        ctx.fillRect(-p.size / 2, -p.size * 1.5, p.size / 2, p.size * 3);
      } else {
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      }

      ctx.restore();

      if (p.y > canvas.height + 40 || p.opacity <= 0) {
        if (elapsed < duration - 800) {
          particles[i] = createParticle(false);
        } else {
          particles.splice(i, 1);
        }
      }
    }

    if (elapsed < duration) {
      animationFrameId = requestAnimationFrame(render);
    } else {
      // 5-second mark reached: Smoothly disappear and stop
      canvas.style.opacity = '0';
      setTimeout(() => {
        cancelAnimationFrame(animationFrameId);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.style.display = 'none';
      }, 600);
    }
  }

  animationFrameId = requestAnimationFrame(render);
}

/* ============================================================ */
/*  CINEMATIC VINTAGE WOODEN TABLE LOVE LETTER SCENE            */
/* ============================================================ */

function initLoveLetterModal() {
  const modal = document.getElementById('loveLetterModal');
  const backdrop = document.getElementById('loveLetterBackdrop');
  const stage = document.getElementById('vintageTableStage');
  const closeBtn = document.getElementById('loveLetterCloseBtn');
  const footerCloseBtn = document.getElementById('letterCloseFooterBtn');
  const replayBtn = document.getElementById('replayUnfoldBtn');
  const sectorBtn = document.getElementById('openLoveLetterBtn');
  const navBtn = document.getElementById('readLoveLetterNavBtn');
  const scrollBtn = document.getElementById('scrollToLetterBtn');
  const envelopeBody = document.querySelector('.envelope-body');
  const envelopeContainer = document.querySelector('.envelope-container');
  const tableRose = document.getElementById('tableRoseContainer');
  const sheet = document.getElementById('vintageIvorySheet');

  let envelopeIsOpening = false;

  function triggerUnfoldingAnimation() {
    if (!sheet) return;
    sheet.style.animation = 'none';
    void sheet.offsetWidth;
    sheet.style.animation = 'sheetSettle 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards';
  }

  function openLetter() {
    if (!modal) return;
    const sceneMessage = document.getElementById('birthdayMessageScene');
    if (sceneMessage) {
      sceneMessage.classList.remove('hidden');
      sceneMessage.style.display = 'block';
    }
    // Make the complete letter visible before starting its entrance animation.
    // The inline display fallback also keeps this reliable if a browser restores
    // the page with an old computed display value.
    modal.style.display = 'flex';
    void modal.offsetWidth;
    modal.classList.add('visible');
    modal.setAttribute('aria-hidden', 'false');
    triggerUnfoldingAnimation();
    spawnHeartBurst(window.innerWidth / 2, window.innerHeight / 2, 28);
  }

  function openWithEnvelopeAnimation() {
    if (envelopeIsOpening) return;
    envelopeIsOpening = true;

    // Step 1: Animate envelope open (flap folds back, paper slides up)
    if (envelopeContainer) {
      envelopeContainer.classList.add('opened');
      spawnHeartBurst(window.innerWidth / 2, window.innerHeight / 2, 18);
    }

    // Step 2: After animation plays, open the full vintage wooden table scene
    setTimeout(() => {
      openLetter();

      // Step 3: Close envelope after modal opens
      setTimeout(() => {
        if (envelopeContainer) envelopeContainer.classList.remove('opened');
        envelopeIsOpening = false;
      }, 600);
    }, 800);
  }

  function closeLetter() {
    if (!modal) return;
    modal.classList.remove('visible');
    modal.setAttribute('aria-hidden', 'true');
    setTimeout(() => {
      if (!modal.classList.contains('visible')) {
        modal.style.display = 'none';
      }
    }, 400);
  }

  // Prevent clicks inside the paper / stage from closing the letter
  if (stage) {
    stage.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }

  // Replay Animation Button
  if (replayBtn) {
    replayBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      spawnHeartBurst(window.innerWidth / 2, window.innerHeight / 2, 15);
      triggerUnfoldingAnimation();
    });
  }

  // Rose Interaction on the Table
  if (tableRose) {
    tableRose.addEventListener('click', (e) => {
      e.stopPropagation();
      spawnHeartBurst(e.clientX || window.innerWidth / 2, e.clientY || window.innerHeight / 2, 20);
      tableRose.style.transform = 'scale(1.25) rotate(-10deg)';
      setTimeout(() => {
        tableRose.style.transform = '';
      }, 400);
    });
  }

  // Open from sector "Open Love Letter" button — with envelope animation
  if (sectorBtn) sectorBtn.addEventListener('click', openWithEnvelopeAnimation);

  // Click on the envelope body itself also opens
  if (envelopeBody) envelopeBody.addEventListener('click', openWithEnvelopeAnimation);

  // Open from top nav "Read My Love Letter" button — direct open
  if (navBtn) navBtn.addEventListener('click', openLetter);
  document.addEventListener('open-surprise-letter', openLetter);

  // Open from quiz final "Read My Love Letter Below" button
  if (scrollBtn) {
    scrollBtn.addEventListener('click', () => {
      // Close quiz first
      const quizModal = document.getElementById('quizModal');
      if (quizModal) quizModal.classList.remove('visible');

      // Directly open the vintage wooden table love letter scene!
      setTimeout(() => {
        openLetter();
      }, 250);
    });
  }

  // Close handlers
  if (closeBtn) closeBtn.addEventListener('click', closeLetter);
  if (footerCloseBtn) footerCloseBtn.addEventListener('click', closeLetter);
  if (backdrop) backdrop.addEventListener('click', closeLetter);
}

/* ============================================================ */
/*  FLOATING ROSE PETALS — DREAMY AMBIENT PARTICLE SYSTEM       */
/* ============================================================ */

function initFloatingPetals() {
  const canvas = document.getElementById('petalsCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const petalColors = {
    blush:       ['#ff85a1', '#ffb3c1', '#ffc6d3', '#ff9ebb', '#ffd6e0'],
    velvet:      ['#d90429', '#ef233c', '#ffd166', '#ff4d6d', '#ffba08'],
    starlight:   ['#c77dff', '#e0aaff', '#9d4edd', '#f368e0', '#b5e8ff'],
    candlelight: ['#ffb703', '#fcbf49', '#f77f00', '#ffd166', '#ff8c42']
  };

  const petals = [];
  const maxPetals = 35;

  function createPetal() {
    const colors = petalColors[currentTheme] || petalColors.blush;
    return {
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * 60,
      size: Math.random() * 12 + 6,
      speedY: Math.random() * 0.8 + 0.3,
      speedX: (Math.random() - 0.5) * 0.6,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 2,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.02 + 0.01,
      wobbleAmp: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.5 + 0.3,
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: Math.random() > 0.4 ? 'petal' : 'heart'
    };
  }

  // Seed initial petals scattered across screen
  for (let i = 0; i < maxPetals; i++) {
    const p = createPetal();
    p.y = Math.random() * canvas.height;
    petals.push(p);
  }

  function drawPetal(p) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate((p.rotation * Math.PI) / 180);
    ctx.globalAlpha = p.opacity;
    ctx.fillStyle = p.color;

    if (p.shape === 'heart') {
      const s = p.size * 0.5;
      ctx.beginPath();
      ctx.moveTo(0, s * 0.3);
      ctx.bezierCurveTo(-s, -s * 0.5, -s * 0.4, -s * 1.2, 0, -s * 0.6);
      ctx.bezierCurveTo(s * 0.4, -s * 1.2, s, -s * 0.5, 0, s * 0.3);
      ctx.fill();
    } else {
      // Organic petal shape
      ctx.beginPath();
      ctx.ellipse(0, 0, p.size * 0.35, p.size, 0, 0, Math.PI * 2);
      ctx.fill();
      // Inner vein highlight
      ctx.globalAlpha = p.opacity * 0.25;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.ellipse(0, 0, p.size * 0.08, p.size * 0.7, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Spawn new petals
    if (petals.length < maxPetals && Math.random() < 0.12) {
      petals.push(createPetal());
    }

    for (let i = petals.length - 1; i >= 0; i--) {
      const p = petals[i];
      p.wobble += p.wobbleSpeed;
      p.x += p.speedX + Math.sin(p.wobble) * p.wobbleAmp;
      p.y += p.speedY;
      p.rotation += p.rotSpeed;

      drawPetal(p);

      // Recycle petals that fall off screen
      if (p.y > canvas.height + 30 || p.x < -30 || p.x > canvas.width + 30) {
        petals[i] = createPetal();
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* ============================================================ */
/*  AUTO-PLAY MUSIC ON FIRST USER INTERACTION                   */
/* ============================================================ */

function initAutoMusicOnInteraction() {
  let triggered = false;
  const handler = () => {
    if (triggered) return;
    triggered = true;
    startMusic();
    window.removeEventListener('click', handler);
    window.removeEventListener('touchstart', handler);
    window.removeEventListener('keydown', handler);
  };
  window.addEventListener('click', handler, { once: false });
  window.addEventListener('touchstart', handler, { once: false });
  window.addEventListener('keydown', handler, { once: false });
}
