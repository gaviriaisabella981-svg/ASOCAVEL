/* ============================================
   ASOCAVEL — equipo.js
   Interactividad de la página de equipo.
   ============================================ */


/* ── 1. DATOS DEL EQUIPO ────────────────────
   Modifica este array con los datos reales.
   Cuando tengas las fotos, pon la ruta en "img".
   Ejemplo de ruta: "./img/nombre.jpg"
   El score va de 0 a 100. */

const members = [
  { name: "Thomas Restrepo", role: "Investigador",      initials: "I1", score: 866, img: "./img/tomas.png" },
  { name: "Isabella Gaviria", role: "Diseño",     initials: "I2", score: 1000, img: "./img/isabella.png" },
  { name: "Mariana Arepas", role: "Líder",  initials: "I3", score: 1000, img: "./img/mariana.png" },
  { name: "Samuel Perez", role: "Evaluador",  initials: "I4", score: 631, img: "./img/samuel.png" },
  { name: "Mariana Zuluaga ", role: "Desarrollo", initials: "I5", score: 732, img: "./img/marianaz.png" },
];


/* ── 2. GENERAR LAS FLIP CARDS ──────────────
   En vez de escribir el HTML a mano para cada
   integrante, usamos JS para generarlo en loop.
   Así si agregas un integrante al array,
   aparece automáticamente sin tocar el HTML. */

document.addEventListener('DOMContentLoaded', function () {

  const grid = document.getElementById('flipGrid');

  members.forEach(function (m) {

    /* Crear el wrapper (la "caja" con perspectiva) */
    const wrapper = document.createElement('div');
    wrapper.className = 'flip-wrapper';

    /* ── HTML de la cara FRONTAL ──────────────
       Muestra: avatar con iniciales, nombre,
       rol, puntaje numérico y barra de progreso.
       El data-score guarda el valor para la
       animación de la barra (ver sección 3). */
    const frontHTML = `
      <div class="flip-front">
        <div class="member-avatar">${m.initials}</div>
        <div class="member-name">${m.name}</div>
        <div class="member-role">${m.role}</div>
        <div class="score-label">Puntaje</div>
        <div class="score-value">${m.score}</div>
        <div class="score-max">/ 100</div>
        <div class="score-bar-wrap">
          <div class="score-bar" style="width: 0%" data-score="${m.score}"></div>
        </div>
        <div class="flip-hint">toca para ver foto →</div>
      </div>`;

    /* ── HTML de la cara TRASERA ──────────────
       Si el integrante ya tiene foto → muestra img.
       Si no → muestra icono placeholder.
       Operador ternario: condición ? siVerdad : siFalso */
    const backHTML = m.img
      ? `<div class="flip-back">
           <img class="back-img" src="${m.img}" alt="${m.name}">
           <div class="back-overlay">
             <div class="back-name">${m.name}</div>
             <span class="back-tag">${m.role}</span>
           </div>
         </div>`
      : `<div class="flip-back">
           <div class="no-img">👤</div>
           <div class="back-overlay">
             <div class="back-name">${m.name}</div>
             <span class="back-tag">Foto próximamente</span>
           </div>
         </div>`;

    /* Ensamblar: flip-card contiene ambas caras */
    wrapper.innerHTML = `<div class="flip-card">${frontHTML}${backHTML}</div>`;

    /* ── El clic voltea la card ───────────────
       classList.toggle() → si tiene la clase la
       quita, si no la tiene la añade.
       El CSS hace el resto: .flipped → rotateY(180deg)
       con la transición cubic-bezier suave. */
    wrapper.addEventListener('click', function () {
      this.classList.toggle('flipped');
    });

    grid.appendChild(wrapper);
  });


  /* ── 3. ANIMAR BARRAS DE PUNTAJE ────────────
     Usamos IntersectionObserver para detectar
     cuándo el grid de cards entra al viewport.
     En ese momento, animamos las barras de 0%
     al valor real del score del integrante.

     ¿Por qué no al cargar la página?
     Porque si la sección está abajo y el usuario
     no ha hecho scroll, la animación pasaría
     sin que nadie la vea. Así esperamos a que
     sea visible para dispararla. */

  const scoreObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {

        /* Buscar todas las barras y animar cada una */
        document.querySelectorAll('.score-bar').forEach(function (bar) {
          /* data-score contiene el número (ej: "92")
             El CSS transition: width 1s ease hace la animación */
          bar.style.width = bar.dataset.score + '%';
        });

        /* Desconectar: solo animamos una vez */
        scoreObserver.disconnect();
      }
    });
  }, { threshold: 0.2 }); /* 0.2 = cuando el 20% del grid es visible */

  const flipGrid = document.getElementById('flipGrid');
  if (flipGrid) {
    scoreObserver.observe(flipGrid);
  }

});


/* ── 4. CÓMO AGREGAR TU FOTO ─────────────────
   Cuando tengas las imágenes de los integrantes:

   1. Guarda la foto en la carpeta ./img/
      (misma carpeta donde está el HTML)

   2. En el array members de arriba, cambia:
      img: ""
      por:
      img: "./img/nombre-del-archivo.jpg"

   3. Guarda y recarga el navegador.
      La cara trasera mostrará la foto automáticamente.

   Formatos soportados: .jpg, .jpeg, .png, .webp
   Tamaño recomendado: cuadrada, mínimo 300x300px
────────────────────────────────────────────── */