/**
 * RESEARCH_ORIENTED // LOGIC_SCRIPT
 * Features: Neural network background, smooth reveal, and clean interactions.
 */

// 1. Neural Network Animation
function initNeuralNetwork() {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const container = document.getElementById('canvas-container');

  if (!container) return;
  container.appendChild(canvas);

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  const points = [];
  const pointCount = 60;
  const connectionDist = 180;

  class Point {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = (Math.random() - 0.5) * 0.3;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, 1.5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 112, 243, 0.3)';
      ctx.fill();
    }
  }

  for (let i = 0; i < pointCount; i++) {
    points.push(new Point());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < points.length; i++) {
      const p1 = points[i];
      p1.update();
      p1.draw();

      for (let j = i + 1; j < points.length; j++) {
        const p2 = points[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < connectionDist) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(0, 112, 243, ${0.1 * (1 - dist / connectionDist)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animate);
  }

  animate();

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });
}

// 2. Professional Scroll Reveal
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  function checkReveal() {
    const triggerBottom = window.innerHeight * 0.85;

    reveals.forEach(reveal => {
      const revealTop = reveal.getBoundingClientRect().top;
      if (revealTop < triggerBottom) {
        reveal.classList.add('is-visible');
      }
    });
  }

  window.addEventListener('scroll', checkReveal);
  checkReveal();
}

// 3. Metadata Hover (Console Log for academic feel)
function initHoverLabels() {
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      const label = card.querySelector('.label')?.innerText || 'DATA_NODE';
      console.debug(`[SYSTEM] INSPECTING_COMPONENT: ${label}`);
    });
  });
}

// 4. Initialization
document.addEventListener('DOMContentLoaded', () => {
  initNeuralNetwork();
  initScrollReveal();
  initHoverLabels();
});
