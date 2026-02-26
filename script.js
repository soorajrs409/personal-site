/**
 * RESEARCH_ORIENTED // LOGIC_SCRIPT
 * Features: Neural network background, professional scroll reveal, and technical metadata logging.
 */

// 1. Neural Network Animation Engine
function initNeuralNetwork() {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const container = document.getElementById('canvas-container');

  if (!container) return;
  container.appendChild(canvas);

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  const points = [];
  const pointCount = 60; // Optimal density for performance/visibility
  const connectionDist = 180;

  class Point {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
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
      ctx.fillStyle = 'rgba(0, 112, 243, 0.4)';
      ctx.fill();
    }
  }

  // Populate network nodes
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
          ctx.strokeStyle = `rgba(0, 112, 243, ${0.15 * (1 - dist / connectionDist)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animate);
  }

  animate();

  // Responsive canvas resizing
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      points.forEach(p => p.reset()); // Re-distribute points on resize
    }, 200);
  });
}

// 2. High-Precision Scroll Reveal
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target); // Trigger once
      }
    });
  }, observerOptions);

  reveals.forEach(el => revealObserver.observe(el));
}

// 3. Technical Component Metadata Trace
function initMetadataTrace() {
  document.querySelectorAll('.card, .timeline-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
      const label = el.querySelector('.label')?.innerText || 'DATA_NODE';
      const heading = el.querySelector('h3')?.innerText || 'UNIT';
      console.debug(`[ENGINE] TRACING_COMPONENT: ${label} // IDENTIFIER: ${heading}`);
    });
  });
}

// 4. Mobile Navigation Logic
function initMobileNav() {
  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');
  const overlay = document.getElementById('nav-overlay');
  const navLinks = document.querySelectorAll('#nav-links a');

  if (!toggle || !links || !overlay) return;

  const toggleMenu = () => {
    toggle.classList.toggle('active');
    links.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
  };

  toggle.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', toggleMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (links.classList.contains('active')) {
        toggleMenu();
      }
    });
  });
}

// 5. Global Initialization
document.addEventListener('DOMContentLoaded', () => {
  initNeuralNetwork();
  initScrollReveal();
  initMetadataTrace();
  initMobileNav();
});
