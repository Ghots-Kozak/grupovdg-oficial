/**
 * navigation.js
 * Maneja la lógica del header corporativo, scroll, y menú móvil off-canvas.
 */

document.addEventListener('DOMContentLoaded', () => {
    const headerToggle = document.querySelector('.header__toggle');
    const headerMenu = document.querySelector('.header__menu');
    const header = document.querySelector('.header');

    // Menú móvil
    if (headerToggle && headerMenu) {
        headerToggle.addEventListener('click', () => {
            headerMenu.classList.toggle('is-open');
            // Cambiar icono de hamburguesa a cruz
            if (headerMenu.classList.contains('is-open')) {
                headerToggle.innerHTML = '<i class="ph ph-x"></i>';
            } else {
                headerToggle.innerHTML = '<i class="ph ph-list"></i>';
            }
        });
    }

    // Comportamiento de Scroll (Header Colapsable)
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }, { passive: true });
    }
});
