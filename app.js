/* ===== Particle System ===== */
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
const PARTICLE_COUNT = 55;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.4;
    this.speedY = (Math.random() - 0.5) * 0.4;
    this.opacity = Math.random() * 0.4 + 0.1;
    this.hue = Math.random() > 0.5 ? 263 : 199; // purple or blue
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < -5 || this.x > canvas.width + 5 ||
      this.y < -5 || this.y > canvas.height + 5) {
      this.reset();
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${this.hue}, 80%, 70%, ${this.opacity})`;
    ctx.fill();
  }
}

function initParticles() {
  particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle());
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animate);
}

resizeCanvas();
initParticles();
animate();

window.addEventListener('resize', () => {
  resizeCanvas();
  initParticles();
});

/* ===== Button interaction ===== */
const notifyBtn = document.getElementById('notify-btn');

notifyBtn.addEventListener('click', () => {
  notifyBtn.querySelector('span').textContent = 'Segera Hadir..';
  notifyBtn.style.background = 'linear-gradient(135deg, #34d399, #38bdf8)';
  notifyBtn.querySelector('svg').style.display = 'none';
  notifyBtn.disabled = true;

  // Reset setelah 3 detik
  setTimeout(() => {
    notifyBtn.querySelector('span').textContent = 'Pantau Perkembangan';
    notifyBtn.style.background = '';
    notifyBtn.querySelector('svg').style.display = '';
    notifyBtn.disabled = false;
  }, 3000);
});
