const slide = document.querySelector('.carousel-slide');
const nextBtn = document.querySelector('#nextBtn');
const prevBtn = document.querySelector('#prevBtn');
const container = document.querySelector('.carousel-container');

let autoPlayInterval;

function moverSiguiente() {
    const firstImg = slide.firstElementChild;
    const size = firstImg.clientWidth + parseInt(getComputedStyle(slide).gap);

    // 1. Aplicamos la transición lenta
    slide.style.transition = "transform 1.5s ease-in-out";
    slide.style.transform = `translateX(${-size}px)`;

    // 2. Al terminar, reordenamos
    slide.addEventListener('transitionend', function alTerminar() {
        slide.style.transition = "none";
        slide.appendChild(firstImg);
        slide.style.transform = "translateX(0)";
        slide.removeEventListener('transitionend', alTerminar);
    });
}

// Función para iniciar el movimiento automático
function startAutoPlay() {
    autoPlayInterval = setInterval(moverSiguiente, 3500); // Se mueve cada 3.5 segundos
}

// Función para detenerlo (útil cuando el usuario interactúa)
function stopAutoPlay() {
    clearInterval(autoPlayInterval);
}

// EVENTOS
nextBtn.addEventListener('click', () => {
    stopAutoPlay(); // Detenemos el auto si el usuario hace click
    moverSiguiente();
    startAutoPlay(); // Reiniciamos el contador
});

// Iniciar al cargar la página
startAutoPlay();

// OPCIONAL: Pausar cuando el mouse está encima del carrusel
container.addEventListener('mouseenter', stopAutoPlay);
container.addEventListener('mouseleave', startAutoPlay);

const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("imgFull");
const closeBtn = document.querySelector(".close-modal");

// 1. Evento para abrir el modal al hacer clic en cualquier imagen del slide
slide.addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG') {
        stopAutoPlay(); // Frenamos el carrusel para que no se mueva atrás
        modal.style.display = "flex";
        modalImg.src = e.target.src;
    }
});

// 2. Evento para cerrar el modal
closeBtn.onclick = function() {
    modal.style.display = "none";
    startAutoPlay(); // Reanudamos el movimiento automático
}

// 3. Cerrar también si hace clic en el fondo negro
modal.onclick = function(e) {
    if (e.target === modal) {
        modal.style.display = "none";
        startAutoPlay();
    }
}