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
