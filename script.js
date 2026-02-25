/**
 * DEDSEC_LOGIC // WATCH_DOGS_2_THEME
 * Features: Randomized glitching, chaotic text reveal, and noise generation.
 */

const charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/\\';

// 1. DedSec Chaos Background (Noise & Glitches)
function initDedSecBg() {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const container = document.getElementById('canvas-container');

  if (!container) return;
  container.appendChild(canvas);

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  function draw() {
    // Faint noise background
    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const val = Math.random() * 255;
      data[i] = val;     // R
      data[i + 1] = val;   // G
      data[i + 2] = val;   // B
      data[i + 3] = 15;    // A (very subtle)
    }
    ctx.putImageData(imageData, 0, 0);

    // Random Glitch Rectangles
    if (Math.random() > 0.9) {
      ctx.fillStyle = Math.random() > 0.5 ? '#faff00' : '#ff003c';
      ctx.fillRect(
        Math.random() * width,
        Math.random() * height,
        Math.random() * 200,
        Math.random() * 5
      );
    }

    // Random Character Glitches
    if (Math.random() > 0.8) {
      ctx.fillStyle = '#ffffff';
      ctx.font = '10px monospace';
      ctx.fillText(
        charSet[Math.floor(Math.random() * charSet.length)],
        Math.random() * width,
        Math.random() * height
      );
    }
  }

  setInterval(draw, 50);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });
}

// 2. Aggressive Scramble Reveal
function scrambleText(element) {
  const originalText = element.getAttribute('data-text') || element.innerText;
  if (!element.getAttribute('data-text')) element.setAttribute('data-text', originalText);

  let iteration = 0;
  const interval = setInterval(() => {
    element.innerText = originalText
      .split('')
      .map((letter, index) => {
        if (index < iteration) return originalText[index];
        return charSet[Math.floor(Math.random() * charSet.length)];
      })
      .join('');

    if (iteration >= originalText.length) clearInterval(interval);
    iteration += 1 / 2; // Slower, more "calculated" reveal
  }, 20);
}

// 3. UI Jitter (Subtle element displacement)
function initJitter() {
  const elements = document.querySelectorAll('.project, .metric, .timeline-item');

  setInterval(() => {
    elements.forEach(el => {
      if (Math.random() > 0.99) {
        const x = (Math.random() - 0.5) * 4;
        const y = (Math.random() - 0.5) * 4;
        el.style.transform = `translate(${x}px, ${y}px) rotate(${(Math.random() - 0.5) * 1}deg)`;
        setTimeout(() => el.style.transform = '', 100);
      }
    });
  }, 100);
}

// 4. Initialization
document.addEventListener('DOMContentLoaded', () => {
  initDedSecBg();
  initJitter();

  const revealItems = document.querySelectorAll('.reveal');
  const checkReveal = () => {
    const trigger = window.innerHeight * 0.9;
    revealItems.forEach(item => {
      if (item.getBoundingClientRect().top < trigger) {
        item.classList.add('is-visible');
        if (!item.hasAttribute('data-scrambled')) {
          const h = item.querySelector('h1, h2, h3');
          if (h) scrambleText(h);
          item.setAttribute('data-scrambled', 'true');
        }
      }
    });
  };

  window.addEventListener('scroll', checkReveal);
  checkReveal();

  // Hover triggers
  document.querySelectorAll('h1, h2, h3').forEach(h => {
    h.addEventListener('mouseenter', () => scrambleText(h));
  });
});
