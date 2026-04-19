/* ============================================
   INDUSTMART — main.js
   Descripción: Interactividad de la landing.
   Comentado para Junior developers.
   ============================================ */


/* ── 1. CANVAS TOGGLE ───────────────────────
   Despliega/oculta la card del Canvas Model.

   Cómo funciona:
   - El CSS pone max-height: 0 en .canvas-collapse
   - Al añadir la clase .open, max-height: 600px
   - CSS tiene transition, así que anima suave.
   - Eso es más elegante que usar display:none
     porque display no puede animarse con CSS. */

function toggleCanvas() {
  const btn = document.getElementById('canvasBtn');
  const box = document.getElementById('canvasBox');

  // classList.contains() → ¿tiene esta clase? true/false
  const isOpen = box.classList.contains('open');

  if (isOpen) {
    // Remover clase = vuelve a max-height: 0 con animación
    box.classList.remove('open');
    btn.classList.remove('open');
    btn.querySelector('.btn-text').textContent = 'Ver Canvas completo';
  } else {
    // Añadir clase = expande con animación
    box.classList.add('open');
    btn.classList.add('open');
    btn.querySelector('.btn-text').textContent = 'Ocultar Canvas';
  }
}


/* ── 2. INTERSECTION OBSERVER ───────────────
   Activa animaciones fadeUp cuando el elemento
   entra al viewport (lo que ve el usuario).

   Alternativa vieja (mala): escuchar el evento
   scroll y calcular posiciones con JS → lento.
   
   IntersectionObserver → el navegador lo hace
   de forma nativa y eficiente. */

document.addEventListener('DOMContentLoaded', function () {

  // Selecciona todas las cards
  const cards = document.querySelectorAll('.card');

  // Crea el observador
  // entries = lista de elementos que cambiaron de estado
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {

      // isIntersecting = true cuando el elemento es visible
      if (entry.isIntersecting) {
        // Activa la animación CSS (estaba "paused" en el CSS)
        entry.target.style.animationPlayState = 'running';

        // Opcional: dejar de observar una vez que ya animó
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1  // Activa cuando el 10% del elemento es visible
  });

  // Inicializar: pausar la animación y empezar a observar
  cards.forEach(function (card) {
    card.style.animationPlayState = 'paused';
    observer.observe(card);
  });


  /* ── 3. NAV LINK ACTIVO ─────────────────────
     Marca como "activo" el link del nav según
     la sección visible en pantalla.

     Útil para darle feedback visual al usuario
     sobre dónde se encuentra en la página. */

  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('nav a');

  const navObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        // Quitar clase activa de todos los links
        navLinks.forEach(function (link) {
          link.classList.remove('active');
        });

        // Añadir clase activa al link que corresponde a la sección visible
        // entry.target.id = el id de la section (ej: "vision")
        // el selector busca el <a> cuyo href termina en ese id
        const activeLink = document.querySelector('nav a[href="#' + entry.target.id + '"]');
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
  }, {
    // rootMargin: el trigger ocurre cuando la sección
    // está en la mitad superior de la pantalla
    rootMargin: '-40% 0px -55% 0px'
  });

  sections.forEach(function (section) {
    navObserver.observe(section);
  });


  /* ── 4. SMOOTH REVEAL DE CARDS DOFA ────────
     Las cards del DOFA también entran con
     animación al hacer scroll. */

  const dofaCards = document.querySelectorAll('.dofa-card, .info-card, .vision-card');

  const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  dofaCards.forEach(function (el) {
    // Añade clase base para que el CSS pueda animarla
    el.classList.add('reveal-on-scroll');
    revealObserver.observe(el);
  });

});


/* ── 5. UTILIDAD: Scroll suave a sección ────
   Si el navegador no soporta scroll-behavior: smooth
   en CSS, esta función sirve como fallback.
   
   Uso en HTML: onclick="scrollTo('vision')" */

function scrollToSection(sectionId) {
  const target = document.getElementById(sectionId);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}