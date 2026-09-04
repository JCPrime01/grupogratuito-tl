// Particle background
(function particles(){
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let w, h, particlesArr;

  function resize(){
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  function makeParticle(){
    return {
      x: Math.random() * w,
      y: h + Math.random() * 100,
      r: Math.random() * 2.4 + 0.8,
      speed: Math.random() * 1.1 + 0.5,
      drift: (Math.random() - 0.5) * 0.7,
      alpha: Math.random() * 0.2 + 0.08,
      hue: Math.random() > 0.5 ? '47,143,255' : '139,92,246'
    };
  }

  function init(){
    resize();
    const count = window.innerWidth < 700 ? 32 : 65;
    particlesArr = Array.from({ length: count }, makeParticle);
  }

  function tick(){
    ctx.clearRect(0, 0, w, h);
    particlesArr.forEach(p => {
      p.y -= p.speed;
      p.x += p.drift;
      if (p.y < -10) Object.assign(p, makeParticle(), { y: h + 10 });
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.hue},${p.alpha})`;
      ctx.fill();
    });
    requestAnimationFrame(tick);
  }

  window.addEventListener('resize', resize);

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    init();
    tick();
  }
})();

// Live "just joined" notification feed
(function joinFeed(){
  const el = document.getElementById('joinNotification');
  const textEl = document.getElementById('joinNotificationText');
  if (!el || !textEl) return;

  const names = ['Ivan', 'Diogo', 'Ariel', 'Adriano', 'Luan', 'Thiago', 'Gabriel', 'Hueverton', 'João'];
  let pool = [];

  function nextName(){
    if (pool.length === 0) pool = [...names].sort(() => Math.random() - 0.5);
    return pool.pop();
  }

  function showNext(){
    textEl.innerHTML = `<strong>${nextName()}</strong> acabou de entrar no grupo`;
    el.classList.add('show');

    setTimeout(() => {
      el.classList.remove('show');
    }, 3000);
  }

  setTimeout(showNext, 1200);
  setInterval(showNext, 8000);
})();

// CTA button: hover teases the label, click expands the button to full screen then redirects
(function ctaExpand(){
  const button = document.getElementById('ctaButton');
  const label = document.getElementById('ctaLabel');
  if (!button || !label) return;

  const DEFAULT_LABEL = 'QUERO ENTRAR AGORA';
  const HOVER_LABEL = 'ENTRAR AGORA';
  const CLICK_LABEL = 'ENTRANDO NO GRUPO...';
  let expanding = false;

  button.addEventListener('mouseenter', () => {
    if (!expanding) label.textContent = HOVER_LABEL;
  });

  button.addEventListener('mouseleave', () => {
    if (!expanding) label.textContent = DEFAULT_LABEL;
  });

  button.addEventListener('click', (e) => {
    if (expanding) { e.preventDefault(); return; }
    e.preventDefault();
    expanding = true;
    label.textContent = CLICK_LABEL;

    const rect = button.getBoundingClientRect();
    button.style.position = 'fixed';
    button.style.left = rect.left + 'px';
    button.style.top = rect.top + 'px';
    button.style.width = rect.width + 'px';
    button.style.height = rect.height + 'px';
    button.style.margin = '0';
    button.style.maxWidth = 'none';

    // force reflow so the transition picks up the starting rect
    void button.offsetWidth;

    button.classList.add('expanding');

    const href = button.href;
    setTimeout(() => {
      window.location.href = href;
    }, 650);
  });
})();
