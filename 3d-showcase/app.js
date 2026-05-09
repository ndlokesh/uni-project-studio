/* =============================================
   3D Showcase — Main Script
   Three.js + GSAP + Interactions
   ============================================= */

// ── Wait for DOM ──
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initCursor();
  initHero3D();
  initParticles();
  initTiltCards();
  initInteractive3D();
  initScrollAnimations();
});

// ── NAV SCROLL ──
function initNav() {
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });
}

// ── CUSTOM CURSOR ──
function initCursor() {
  if (window.innerWidth < 1024) return;
  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (!dot || !ring) return;
  document.addEventListener('mousemove', e => {
    dot.style.left = e.clientX + 'px';
    dot.style.top = e.clientY + 'px';
    setTimeout(() => {
      ring.style.left = e.clientX + 'px';
      ring.style.top = e.clientY + 'px';
    }, 80);
  });
  document.querySelectorAll('a,button,.tilt-card,.showcase-item').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
  });
}

// ── HERO 3D SCENE (Three.js) ──
function initHero3D() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Lighting
  const ambient = new THREE.AmbientLight(0x8b5cf6, 0.3);
  scene.add(ambient);
  const point1 = new THREE.PointLight(0x8b5cf6, 2, 20);
  point1.position.set(3, 3, 3);
  scene.add(point1);
  const point2 = new THREE.PointLight(0x06b6d4, 1.5, 20);
  point2.position.set(-3, -2, 4);
  scene.add(point2);

  // Floating geometries
  const geoGroup = new THREE.Group();
  const mat1 = new THREE.MeshStandardMaterial({
    color: 0x8b5cf6, wireframe: true, transparent: true, opacity: 0.6,
    emissive: 0x8b5cf6, emissiveIntensity: 0.2
  });
  const mat2 = new THREE.MeshStandardMaterial({
    color: 0x06b6d4, wireframe: true, transparent: true, opacity: 0.5,
    emissive: 0x06b6d4, emissiveIntensity: 0.2
  });
  const mat3 = new THREE.MeshStandardMaterial({
    color: 0xffffff, wireframe: true, transparent: true, opacity: 0.15,
    emissive: 0xffffff, emissiveIntensity: 0.05
  });

  const ico = new THREE.Mesh(new THREE.IcosahedronGeometry(1.2, 1), mat1);
  ico.position.set(1.5, 0.5, 0);
  geoGroup.add(ico);

  const torus = new THREE.Mesh(new THREE.TorusGeometry(0.8, 0.25, 16, 40), mat2);
  torus.position.set(-1.8, -0.5, -1);
  geoGroup.add(torus);

  const octa = new THREE.Mesh(new THREE.OctahedronGeometry(0.6, 0), mat1);
  octa.position.set(0, -1.5, 0.5);
  geoGroup.add(octa);

  const ring = new THREE.Mesh(new THREE.TorusGeometry(1.8, 0.02, 8, 80), mat3);
  ring.rotation.x = Math.PI / 3;
  geoGroup.add(ring);

  const ring2 = new THREE.Mesh(new THREE.TorusGeometry(2.2, 0.015, 8, 100), mat3);
  ring2.rotation.x = -Math.PI / 4;
  ring2.rotation.y = Math.PI / 6;
  geoGroup.add(ring2);

  // Small floating spheres
  for (let i = 0; i < 30; i++) {
    const s = new THREE.Mesh(
      new THREE.SphereGeometry(0.03 + Math.random() * 0.04, 8, 8),
      new THREE.MeshStandardMaterial({
        color: Math.random() > 0.5 ? 0x8b5cf6 : 0x06b6d4,
        emissive: Math.random() > 0.5 ? 0x8b5cf6 : 0x06b6d4,
        emissiveIntensity: 0.8,
      })
    );
    s.position.set(
      (Math.random() - 0.5) * 6,
      (Math.random() - 0.5) * 6,
      (Math.random() - 0.5) * 4
    );
    s.userData = { speed: 0.002 + Math.random() * 0.005, offset: Math.random() * Math.PI * 2 };
    geoGroup.add(s);
  }

  scene.add(geoGroup);

  // Mouse parallax
  let mouseX = 0, mouseY = 0;
  document.addEventListener('mousemove', e => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    const t = performance.now() * 0.001;
    ico.rotation.x += 0.003;
    ico.rotation.y += 0.005;
    torus.rotation.x += 0.005;
    torus.rotation.z += 0.003;
    octa.rotation.y += 0.008;
    octa.rotation.z += 0.004;
    ring.rotation.z += 0.002;
    ring2.rotation.z -= 0.001;

    geoGroup.children.forEach(child => {
      if (child.userData.speed) {
        child.position.y += Math.sin(t + child.userData.offset) * 0.002;
      }
    });

    geoGroup.rotation.y += (mouseX * 0.3 - geoGroup.rotation.y) * 0.02;
    geoGroup.rotation.x += (-mouseY * 0.2 - geoGroup.rotation.x) * 0.02;

    point1.position.x = Math.sin(t * 0.5) * 4;
    point1.position.y = Math.cos(t * 0.3) * 3;
    point2.position.x = Math.cos(t * 0.4) * 3;

    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

// ── PARTICLES BACKGROUND ──
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const count = window.innerWidth < 768 ? 40 : 80;
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: 1 + Math.random() * 1.5,
      alpha: 0.1 + Math.random() * 0.3
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(139,92,246,${p.alpha})`;
      ctx.fill();
    });

    // Lines between close particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(139,92,246,${0.06 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// ── 3D TILT CARDS ──
function initTiltCards() {
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotateX = ((y - cy) / cy) * -8;
      const rotateY = ((x - cx) / cx) * 8;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
      card.style.setProperty('--mx', (x / rect.width * 100) + '%');
      card.style.setProperty('--my', (y / rect.height * 100) + '%');
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
  });
}

// ── INTERACTIVE 3D MODEL ──
function initInteractive3D() {
  const canvas = document.getElementById('model-canvas');
  if (!canvas) return;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
  camera.position.z = 4;
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Lights
  scene.add(new THREE.AmbientLight(0xffffff, 0.4));
  const spot = new THREE.PointLight(0x8b5cf6, 3, 20);
  spot.position.set(3, 3, 3);
  scene.add(spot);
  const spot2 = new THREE.PointLight(0x06b6d4, 2, 20);
  spot2.position.set(-3, -2, 3);
  scene.add(spot2);

  // Knot geometry
  const knotGeo = new THREE.TorusKnotGeometry(1, 0.35, 128, 32);
  const knotMat = new THREE.MeshPhysicalMaterial({
    color: 0x8b5cf6,
    metalness: 0.3,
    roughness: 0.2,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
    emissive: 0x2d1b69,
    emissiveIntensity: 0.3,
    transparent: true,
    opacity: 0.9
  });
  const knot = new THREE.Mesh(knotGeo, knotMat);
  scene.add(knot);

  // Wire overlay
  const wireKnot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(1.01, 0.36, 64, 16),
    new THREE.MeshBasicMaterial({ color: 0x06b6d4, wireframe: true, transparent: true, opacity: 0.15 })
  );
  scene.add(wireKnot);

  // Orbiting ring
  const orbitRing = new THREE.Mesh(
    new THREE.TorusGeometry(2, 0.01, 8, 100),
    new THREE.MeshBasicMaterial({ color: 0x8b5cf6, transparent: true, opacity: 0.3 })
  );
  orbitRing.rotation.x = Math.PI / 2.5;
  scene.add(orbitRing);

  // Drag rotation
  let isDragging = false, prevX = 0, prevY = 0, rotVelX = 0, rotVelY = 0;
  canvas.addEventListener('pointerdown', e => { isDragging = true; prevX = e.clientX; prevY = e.clientY; });
  canvas.addEventListener('pointermove', e => {
    if (!isDragging) return;
    rotVelY = (e.clientX - prevX) * 0.01;
    rotVelX = (e.clientY - prevY) * 0.01;
    prevX = e.clientX;
    prevY = e.clientY;
  });
  canvas.addEventListener('pointerup', () => isDragging = false);
  canvas.addEventListener('pointerleave', () => isDragging = false);

  function animate() {
    requestAnimationFrame(animate);
    const t = performance.now() * 0.001;
    if (!isDragging) {
      rotVelX *= 0.96;
      rotVelY *= 0.96;
      knot.rotation.y += 0.005;
      knot.rotation.x += 0.002;
    }
    knot.rotation.y += rotVelY;
    knot.rotation.x += rotVelX;
    wireKnot.rotation.copy(knot.rotation);
    orbitRing.rotation.z = t * 0.3;
    spot.position.x = Math.sin(t) * 4;
    spot.position.y = Math.cos(t * 0.5) * 3;
    renderer.render(scene, camera);
  }
  animate();

  const ro = new ResizeObserver(() => {
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  });
  ro.observe(canvas);
}

// ── GSAP SCROLL ANIMATIONS ──
function initScrollAnimations() {
  gsap.registerPlugin(ScrollTrigger);

  // Hero entrance
  gsap.to('.hero-title', { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: 'power3.out' });
  gsap.to('.hero-desc', { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: 'power3.out' });
  gsap.to('.hero-btns', { opacity: 1, y: 0, duration: 1, delay: 0.7, ease: 'power3.out' });

  // Reveal all .reveal elements
  gsap.utils.toArray('.reveal').forEach((el, i) => {
    gsap.to(el, {
      opacity: 1, y: 0, duration: 0.8, delay: i * 0.08,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true }
    });
  });

  // Parallax on section backgrounds
  gsap.utils.toArray('.parallax-bg').forEach(bg => {
    gsap.to(bg, {
      yPercent: -20,
      scrollTrigger: { trigger: bg, start: 'top bottom', end: 'bottom top', scrub: 1 }
    });
  });

  // Cinematic section transitions
  gsap.utils.toArray('section').forEach(sec => {
    gsap.fromTo(sec, { opacity: 0.6 }, {
      opacity: 1, duration: 0.5,
      scrollTrigger: { trigger: sec, start: 'top 80%', end: 'top 20%', scrub: 1 }
    });
  });
}
