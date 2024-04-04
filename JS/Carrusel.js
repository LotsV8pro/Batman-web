// Script para el carrusel
const carousel = document.querySelector('.carousel');
const images = document.querySelectorAll('.carousel img');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');

const totalImages = images.length;
const visibleImages = 3; // Número de imágenes visibles a la vez
let currentIndex = 0;
let intervalId;

// Función para mostrar las imágenes visibles
const showVisibleImages = (startIndex) => {
    // Oculta todas las imágenes primero
    images.forEach(img => img.style.display = 'none');

    // Muestra solo las imágenes visibles según el índice actual
    for (let i = startIndex; i < startIndex + visibleImages && i < totalImages; i++) {
        images[i].style.display = 'block';
    }
};

// Función para aplicar el filtro blur a las imágenes laterales dependiendo de la imagen central
const applyBlur = () => {
    const centralIndex = Math.floor(visibleImages / 2); // Índice de la imagen central
    for (let i = 0; i < totalImages; i++) {
        if (i < currentIndex + centralIndex || i > currentIndex + centralIndex) {
            images[i].style.filter = 'blur(5px)'; // Aplica blur a las imágenes anteriores y posteriores
        } else {
            images[i].style.filter = 'none'; // Elimina el filtro de la imagen central
        }
    }
};

// Función para avanzar al siguiente conjunto de imágenes
const nextImages = () => {
    if (currentIndex < totalImages - visibleImages) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }
    showVisibleImages(currentIndex);
    applyBlur();
};

// Función para retroceder al conjunto anterior de imágenes
const prevImages = () => {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = totalImages - visibleImages;
    }
    showVisibleImages(currentIndex);
    applyBlur();
};

// Función para avanzar al siguiente conjunto de imágenes automáticamente
const autoNextImages = () => {
    intervalId = setInterval(() => {
        if (currentIndex < totalImages - visibleImages) {
            nextImages();
        } else {
            currentIndex = 0;
            showVisibleImages(currentIndex);
            applyBlur();
        }
    }, 5000); // Cambia la imagen cada 5 segundos (5000 milisegundos)
};

// Iniciar el carrusel automático al cargar la página
autoNextImages();

// Detener el carrusel automático al hacer hover sobre el carrusel
carousel.addEventListener('mouseenter', () => {
    clearInterval(intervalId); // Detiene el intervalo
});

// Reanudar el carrusel automático al salir del hover
carousel.addEventListener('mouseleave', () => {
    autoNextImages(); // Inicia el intervalo nuevamente
});

// Event listener para el botón de avanzar
nextButton.addEventListener('click', nextImages);

// Event listener para el botón de retroceder
prevButton.addEventListener('click', prevImages);

// Muestra las primeras imágenes al cargar la página
showVisibleImages(currentIndex);
applyBlur(); // Aplica el filtro blur inicialmente
