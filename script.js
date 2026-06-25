// ===== Menú móvil =====
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const open = mainNav.classList.toggle('open');
    navToggle.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', String(open));
  });

  mainNav.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      mainNav.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ===== Scroll-spy: resalta la sección activa en el menú =====
const navLinks = Array.from(document.querySelectorAll('.main-nav a'));
const sections = navLinks
  .map((l) => document.querySelector(l.getAttribute('href')))
  .filter(Boolean);

if ('IntersectionObserver' in window && sections.length) {
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const id = '#' + e.target.id;
          navLinks.forEach((l) => l.classList.toggle('active', l.getAttribute('href') === id));
        }
      });
    },
    { rootMargin: '-45% 0px -50% 0px' }
  );
  sections.forEach((s) => spy.observe(s));
}

// ===== Validación del formulario de contacto =====
const form = document.getElementById('leadForm');
const formMsg = document.getElementById('formMsg');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const nombre = (data.get('nombre') || '').toString().trim();
    const email = (data.get('email') || '').toString().trim();
    const telefono = (data.get('telefono') || '').toString().trim();
    const consent = data.get('consent');

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const telOk = telefono.replace(/\D/g, '').length >= 7;

    if (!nombre || !emailOk || !telOk || !consent) {
      setMsg('Por favor completa todos los campos correctamente y acepta la política de privacidad.', 'err');
      return;
    }

    // NOTA: Sin backend, esto solo simula el envío. Conecta aquí tu formulario
    // (Formspree, tu CRM, una función serverless, etc.) para recibir las solicitudes.
    setMsg('¡Gracias, ' + nombre + '! Hemos recibido tu solicitud. Un asesor te contactará pronto.', 'ok');
    form.reset();
  });
}

function setMsg(text, type) {
  if (!formMsg) return;
  formMsg.textContent = text;
  formMsg.className = 'form-msg ' + type;
}

// ===== Año dinámico en el footer (si aplica) =====
document.querySelectorAll('[data-year]').forEach((el) => {
  el.textContent = String(new Date().getFullYear());
});

// ===== Animaciones al hacer scroll (reveal) =====
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReduced && 'IntersectionObserver' in window) {
  // Elementos individuales que aparecen al entrar en pantalla
  const revealSelectors = [
    '.hero-copy > *', '.hero-media', '.section-title', '.feature-card',
    '.trust-item', '.connect-bar',
    '.plan-card', '.plans-highlights div',
    '.cf-copy', '.steps li', '.cov-copy > *', '.stats div',
    '.test-head > *', '.test-card', '.cta-banner', '.faq details', '.contact-card',
  ];
  const revealEls = document.querySelectorAll(revealSelectors.join(','));

  revealEls.forEach((el) => el.classList.add('reveal'));

  // Escalonado: retrasa los hijos dentro de cada grupo para un efecto en cascada
  const stagger = (parentSel, childSel) => {
    document.querySelectorAll(parentSel).forEach((parent) => {
      parent.querySelectorAll(childSel).forEach((child, i) => {
        child.style.transitionDelay = i * 90 + 'ms';
      });
    });
  };
  stagger('.cards-grid', '.feature-card');
  stagger('.plans-grid', '.plan-card');
  stagger('.steps', 'li');
  stagger('.test-grid', '.test-card');
  stagger('.cobertura .stats', 'div');
  stagger('.hero-copy', '*');

  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
  );
  revealEls.forEach((el) => revealObserver.observe(el));
}

// ===== Sombra del header al hacer scroll =====
const header = document.querySelector('.site-header');
if (header) {
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}
