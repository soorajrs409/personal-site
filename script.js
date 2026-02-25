// Matrix Digital Rain Effect
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const container = document.getElementById('canvas-container');

if (container) {
  container.appendChild(canvas);

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$@#%&*^';
  const fontSize = 16;
  const columns = width / fontSize;
  const drops = Array(Math.floor(columns)).fill(1);

  function draw() {
    ctx.fillStyle = 'rgba(5, 5, 5, 0.05)';
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = '#00f3ff';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
      const text = characters.charAt(Math.floor(Math.random() * characters.length));
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  setInterval(draw, 33);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });
}

// Reveal on Scroll
const reveals = document.querySelectorAll('.reveal');

function checkReveal() {
  const triggerBottom = window.innerHeight * 0.8;

  reveals.forEach(reveal => {
    const revealTop = reveal.getBoundingClientRect().top;
    if (revealTop < triggerBottom) {
      reveal.classList.add('is-visible');
    }
  });
}

window.addEventListener('scroll', checkReveal);
checkReveal();

// "Hacking" Text Effect for Headers
function hackText(element) {
  const originalText = element.innerText;
  const iterations = originalText.length;
  let count = 0;

  const interval = setInterval(() => {
    element.innerText = originalText.split('')
      .map((char, index) => {
        if (index < count) return originalText[index];
        return characters[Math.floor(Math.random() * characters.length)];
      })
      .join('');

    if (count >= iterations) clearInterval(interval);
    count += 1 / 3;
  }, 30);
}

document.querySelectorAll('h1, h2').forEach(header => {
  header.addEventListener('mouseover', () => hackText(header));
});

// Sound Effect Placeholder (Optional)
// We could add subtle hover sounds here if desired.
