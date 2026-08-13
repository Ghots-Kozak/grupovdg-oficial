/**
 * home.js
 * Lógica específica para la página de inicio.
 * - Generador de partículas ligeras para el fondo del Hero.
 * - Efectos parallax ligeros.
 */

document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initParallax();
});

/**
 * Crea partículas de forma dinámica para no ensuciar el HTML.
 * Usa CSS puro para la animación, optimizando el rendimiento.
 */
function initParticles() {
    const container = document.getElementById('particles-container');
    if (!container) return;

    // Número de partículas (mantener bajo para rendimiento)
    const particleCount = window.innerWidth < 768 ? 25 : 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Posición aleatoria
        const posX = Math.random() * 100; // Porcentaje del ancho
        
        // Tamaño aleatorio
        const size = Math.random() * 3 + 1; // 1px a 4px
        
        // Duración de animación aleatoria
        const duration = Math.random() * 15 + 10; // 10s a 25s
        
        // Retraso inicial aleatorio
        const delay = Math.random() * 10; // 0s a 10s
        
        particle.style.left = `${posX}%`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        
        // Opacidad inicial un poco más fuerte
        particle.style.opacity = Math.random() * 0.4 + 0.3;

        container.appendChild(particle);
    }
}

/**
 * Parallax súper ligero atado al scroll.
 */
function initParallax() {
    const heroContent = document.querySelector('.hero__content');
    const heroBg = document.querySelector('.hero__background');
    
    if(!heroContent || !heroBg) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.scrollY;
                
                // Solo animar si estamos en la parte superior (Hero visible)
                if (scrolled < window.innerHeight) {
                    // Mover el contenido ligeramente hacia abajo
                    heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
                    // Cambiar opacidad del contenido
                    heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 1.5;
                }
                
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}
