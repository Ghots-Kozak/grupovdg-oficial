/**
 * animations.js
 * Maneja las animaciones basadas en scroll usando IntersectionObserver
 */

document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            } else {
                // Remover clase al salir del viewport permite animación bidireccional
                entry.target.classList.remove('is-visible');
            }
        });
    }, { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.15 });

    const animatedElements = document.querySelectorAll('.fade-in, .slide-up, .slide-left, .slide-right, .scale-in, .animated-heading');
    animatedElements.forEach(el => observer.observe(el));
});
