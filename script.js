/* ============================================================
   OBLIQUE — editorial landing page (concept piece)
   GSAP (ScrollTrigger / ScrollSmoother / SplitText) + Three.js
   ============================================================ */

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

/* Landing page with a preloader — always start at the top.
   clearScrollMemory stops ScrollTrigger re-applying the old scroll
   position on refresh() after reloads. */
ScrollTrigger.clearScrollMemory('manual');
window.scrollTo(0, 0);

const isTouch = window.matchMedia('(hover: none)').matches;
const isMobile = window.matchMedia('(max-width: 820px)').matches;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Smooth scrolling ---------- */
const smoother = ScrollSmoother.create({
  wrapper: '#smooth-wrapper',
  content: '#smooth-content',
  smooth: reducedMotion ? 0 : 1.2,
  effects: !reducedMotion && !isMobile,
  normalizeScroll: false,
});

/* ---------- Preloader ---------- */
const preloader = document.getElementById('preloader');
const counter = document.getElementById('preloaderCount');
const countState = { v: 0 };

const countTween = gsap.to(countState, {
  v: 100,
  duration: 1.4,
  ease: 'power2.inOut',
  onUpdate: () => (counter.textContent = Math.round(countState.v)),
  paused: true,
});

let heroSplit;

function buildSplits() {
  document.querySelectorAll('[data-split-chars]').forEach((el) => {
    const split = new SplitText(el, { type: 'chars', charsClass: 'char' });
    gsap.set(el, { overflow: 'hidden' });
    if (el.classList.contains('hero__title')) {
      heroSplit = split;
      gsap.set(split.chars, { yPercent: 110 });
      return;
    }
    gsap.set(split.chars, { yPercent: 110 });
    gsap.to(split.chars, {
      yPercent: 0,
      stagger: 0.035,
      duration: 0.9,
      ease: 'power4.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
  });

  document.querySelectorAll('[data-split-lines]').forEach((el) => {
    const split = new SplitText(el, {
      type: 'lines',
      linesClass: 'line',
      mask: 'lines',
    });
    gsap.set(split.lines, { yPercent: 105 });
    if (el.classList.contains('hero__lede')) {
      el.dataset.heroLede = '1';
      return;
    }
    gsap.to(split.lines, {
      yPercent: 0,
      stagger: 0.09,
      duration: 1,
      ease: 'power4.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    });
  });
}

function introReveal() {
  const tl = gsap.timeline();
  tl.to(preloader, {
    clipPath: 'inset(0 0 100% 0)',
    duration: 0.9,
    ease: 'power4.inOut',
  })
    .set(preloader, { display: 'none' })
    .to(
      heroSplit.chars,
      { yPercent: 0, stagger: 0.045, duration: 1.1, ease: 'power4.out' },
      '-=0.35'
    )
    .to(
      document.querySelectorAll('.hero__lede .line'),
      { yPercent: 0, stagger: 0.09, duration: 1, ease: 'power4.out' },
      '-=0.7'
    )
    .from(
      ['.hero__meta', '.hero__cue', '.hero__scrollhint', '.rail'],
      { autoAlpha: 0, y: 18, stagger: 0.08, duration: 0.7, ease: 'power3.out' },
      '-=0.6'
    );
}

gsap.set(preloader, { clipPath: 'inset(0 0 0% 0)' });

/* Gate on fonts only — the hero is pure type, so there is no reason to
   hold the curtain for below-the-fold images. */
document.fonts.ready.then(() => {
  buildSplits();
  buildPanelSplits();
  ScrollTrigger.refresh();
  countTween.play();
  countTween.eventCallback('onComplete', introReveal);
});

/* Fallback: never trap the user behind the preloader */
setTimeout(() => {
  if (preloader.style.display !== 'none' && !countTween.isActive() && countState.v === 0) {
    if (!heroSplit) {
      buildSplits();
      buildPanelSplits();
    }
    introReveal();
  }
}, 5000);

/* ---------- Scroll cue bounce ---------- */
gsap.to('#heroCue', {
  y: 14,
  duration: 1.1,
  ease: 'sine.inOut',
  yoyo: true,
  repeat: -1,
});

/* ---------- Works: pinned horizontal scroll ---------- */
const track = document.getElementById('worksTrack');
const worksSection = document.getElementById('works');

function getScrollAmount() {
  return track.scrollWidth - (window.innerWidth - getRailWidth());
}
function getRailWidth() {
  return isMobile ? 0 : 64;
}

const worksTween = gsap.to(track, {
  x: () => -getScrollAmount(),
  ease: 'none',
  scrollTrigger: {
    trigger: worksSection,
    start: 'top top',
    end: () => '+=' + getScrollAmount(),
    pin: true,
    scrub: 1,
    invalidateOnRefresh: true,
    anticipatePin: 1,
  },
});

/* Panel inner parallax driven by the horizontal tween */
document.querySelectorAll('.panel').forEach((panel) => {
  const media = panel.querySelector('.panel__media');

  gsap.fromTo(
    media,
    { xPercent: 8 },
    {
      xPercent: -8,
      ease: 'none',
      scrollTrigger: {
        trigger: panel,
        containerAnimation: worksTween,
        start: 'left right',
        end: 'right left',
        scrub: true,
      },
    }
  );
});

/* Panel title reveals — split after fonts are ready (called from loader) */
function buildPanelSplits() {
  document.querySelectorAll('.panel').forEach((panel) => {
    const title = panel.querySelector('.panel__title');
    const split = new SplitText(title, { type: 'chars', charsClass: 'char' });
    gsap.set(title, { overflow: 'hidden' });
    gsap.from(split.chars, {
      yPercent: 110,
      stagger: 0.03,
      duration: 0.8,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: panel,
        containerAnimation: worksTween,
        start: 'left 65%',
        once: true,
      },
    });
  });
}

/* ---------- Marquee ---------- */
gsap.to('#marqueeTrack', {
  xPercent: -50,
  duration: 18,
  ease: 'none',
  repeat: -1,
});

/* ---------- Chapter counter ---------- */
const chapterNum = document.getElementById('chapterNum');
document.querySelectorAll('[data-chapter]').forEach((sec) => {
  ScrollTrigger.create({
    trigger: sec,
    start: 'top center',
    end: 'bottom center',
    onToggle: (self) => {
      if (self.isActive) chapterNum.textContent = sec.dataset.chapter;
    },
  });
});

/* ---------- Menu ---------- */
const menu = document.getElementById('menu');
const menuTl = gsap.timeline({ paused: true });
menuTl
  .set(menu, { visibility: 'visible' })
  .to(menu, { clipPath: 'inset(0 0 0% 0)', duration: 0.7, ease: 'power4.inOut' })
  .from(
    '.menu__list a',
    { yPercent: 110, stagger: 0.06, duration: 0.6, ease: 'power3.out' },
    '-=0.25'
  )
  .from('.menu__foot', { autoAlpha: 0, duration: 0.4 }, '-=0.3');

let menuOpen = false;
function toggleMenu(open) {
  menuOpen = open;
  menu.setAttribute('aria-hidden', String(!open));
  /* NB: no scroll lock — smoother.paused() kills later scrollTo() tweens
     and html{overflow:hidden} clamps scrollY to 0. The menu is a fullscreen
     opaque overlay, so background scroll is invisible and harmless. */
  if (open) menuTl.timeScale(1).play();
  else menuTl.timeScale(1.6).reverse();
}
document.getElementById('menuToggle').addEventListener('click', () => toggleMenu(true));
document.getElementById('menuClose').addEventListener('click', () => toggleMenu(false));
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && menuOpen) toggleMenu(false);
});

document.querySelectorAll('[data-menu-link]').forEach((a) => {
  a.addEventListener('click', (e) => {
    e.preventDefault();
    toggleMenu(false);
    const target = document.querySelector(a.getAttribute('href'));
    /* setTimeout, not gsap.delayedCall — delayedCall tweens can get killed
       by ScrollTrigger refreshes and the scroll never happens */
    setTimeout(() => smoother.scrollTo(target, true, 'top top'), 450);
  });
});

/* ---------- Custom cursor ---------- */
if (!isTouch && !reducedMotion) {
  const cursor = document.getElementById('cursor');
  const label = document.getElementById('cursorLabel');
  const xTo = gsap.quickTo(cursor, 'x', { duration: 0.35, ease: 'power3' });
  const yTo = gsap.quickTo(cursor, 'y', { duration: 0.35, ease: 'power3' });

  window.addEventListener('mousemove', (e) => {
    xTo(e.clientX);
    yTo(e.clientY);
  });

  document.querySelectorAll('[data-cursor="drag"]').forEach((el) => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('is-drag');
      label.textContent = 'DRAG';
    });
    el.addEventListener('mouseleave', () => cursor.classList.remove('is-drag'));
  });
  document.querySelectorAll('a, button').forEach((el) => {
    el.addEventListener('mouseenter', () => cursor.classList.add('is-link'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('is-link'));
  });
}

/* ============================================================
   Three.js — per-image distortion (hover ripple + scroll bend)
   ============================================================ */
const supportsWebGL = (() => {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl') || c.getContext('experimental-webgl'));
  } catch (e) {
    return false;
  }
})();

if (!isMobile && !isTouch && !reducedMotion && supportsWebGL && window.THREE) {
  const FRAG = `
    precision mediump float;
    uniform sampler2D uTexture;
    uniform float uTime;
    uniform float uHoverState;
    uniform vec2 uHover;
    uniform float uVelocity;
    uniform float uPlaneRatio;
    uniform float uImageRatio;
    varying vec2 vUv;

    void main() {
      // object-fit: cover
      vec2 scale = (uPlaneRatio > uImageRatio)
        ? vec2(1.0, uImageRatio / uPlaneRatio)
        : vec2(uPlaneRatio / uImageRatio, 1.0);
      vec2 uv = (vUv - 0.5) * scale + 0.5;

      // scroll bend — wave along x driven by scroll velocity
      uv.y += sin(uv.x * 3.14159) * uVelocity * 0.035;

      // hover ripple
      float d = distance(vUv, uHover);
      float ripple = sin(d * 24.0 - uTime * 4.0) * exp(-d * 4.5) * uHoverState * 0.025;
      uv += normalize(vUv - uHover + 0.0001) * ripple;

      // chromatic shift scaled by motion
      float shift = uVelocity * 0.012 + uHoverState * 0.006;
      float r = texture2D(uTexture, uv + vec2(shift, 0.0)).r;
      float g = texture2D(uTexture, uv).g;
      float b = texture2D(uTexture, uv - vec2(shift, 0.0)).b;
      gl_FragColor = vec4(r, g, b, 1.0);
    }
  `;

  const VERT = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  // shared, smoothed scroll velocity
  let velTarget = 0;
  let velCurrent = 0;
  ScrollTrigger.create({
    onUpdate: (self) => {
      velTarget = gsap.utils.clamp(-1, 1, self.getVelocity() / 2500);
    },
  });

  const glItems = [];

  class DistortImage {
    constructor(img) {
      this.img = img;
      this.container = img.parentElement;
      this.ready = false;

      this.scene = new THREE.Scene();
      this.camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, 0.1, 10);
      this.camera.position.z = 1;

      this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      this.uniforms = {
        uTexture: { value: null },
        uTime: { value: 0 },
        uHoverState: { value: 0 },
        uHover: { value: new THREE.Vector2(0.5, 0.5) },
        uVelocity: { value: 0 },
        uPlaneRatio: { value: 1 },
        uImageRatio: { value: 1 },
      };

      const loader = new THREE.TextureLoader();
      loader.setCrossOrigin('anonymous');
      loader.load(
        img.currentSrc || img.src,
        (tex) => {
          tex.minFilter = THREE.LinearFilter;
          this.uniforms.uTexture.value = tex;
          this.uniforms.uImageRatio.value = tex.image.width / tex.image.height;

          this.mesh = new THREE.Mesh(
            new THREE.PlaneGeometry(1, 1),
            new THREE.ShaderMaterial({ uniforms: this.uniforms, fragmentShader: FRAG, vertexShader: VERT })
          );
          this.scene.add(this.mesh);

          this.resize();
          this.container.appendChild(this.renderer.domElement);
          this.img.style.visibility = 'hidden'; // keep <img> for a11y / fallback
          this.ready = true;
        },
        undefined,
        () => { /* texture failed (offline/CORS) — keep plain <img> */ }
      );

      this.container.addEventListener('mousemove', (e) => {
        const r = this.container.getBoundingClientRect();
        this.uniforms.uHover.value.set(
          (e.clientX - r.left) / r.width,
          1 - (e.clientY - r.top) / r.height
        );
      });
      this.container.addEventListener('mouseenter', () =>
        gsap.to(this.uniforms.uHoverState, { value: 1, duration: 0.6, ease: 'power2.out' })
      );
      this.container.addEventListener('mouseleave', () =>
        gsap.to(this.uniforms.uHoverState, { value: 0, duration: 0.6, ease: 'power2.out' })
      );

      window.addEventListener('resize', () => this.resize());
    }

    resize() {
      const r = this.container.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) return;
      this.renderer.setSize(r.width, r.height);
      this.uniforms.uPlaneRatio.value = r.width / r.height;
    }

    render(t) {
      if (!this.ready) return;
      const r = this.container.getBoundingClientRect();
      if (r.right < 0 || r.left > window.innerWidth || r.bottom < 0 || r.top > window.innerHeight) return;
      this.uniforms.uTime.value = t;
      this.uniforms.uVelocity.value = velCurrent;
      this.renderer.render(this.scene, this.camera);
    }
  }

  document.querySelectorAll('.gl-image').forEach((img) => {
    const init = () => glItems.push(new DistortImage(img));
    if (img.complete && img.naturalWidth) init();
    else img.addEventListener('load', init, { once: true });
  });

  gsap.ticker.add((time) => {
    velCurrent += (velTarget - velCurrent) * 0.08;
    velTarget *= 0.92; // decay toward rest
    glItems.forEach((item) => item.render(time));
  });
}

/* ---------- Keep ScrollTrigger honest on resize ---------- */
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => ScrollTrigger.refresh(), 250);
});
