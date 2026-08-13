/**
 * animations.js
 * Maneja las animaciones basadas en scroll usando IntersectionObserver
 */

document.addEventListener('DOMContentLoaded', () => {
    // Configuración del observer
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.15 // Se activa cuando el 15% del elemento es visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Añadimos la clase que detona la animación CSS de entrada
                entry.target.classList.add('is-visible');
                // Al entrar, restauramos el delay por si tiene uno configurado
                entry.target.style.transitionDelay = ''; 
            } else {
                // Cuando el usuario sigue vagando (scrolling) y el elemento sale de pantalla,
                // se desvanece para que vuelva a aparecer cuando vuelva a hacer scroll.
                
                // Removemos el delay para que el fade out sea inmediato y no se atasque
                entry.target.style.transitionDelay = '0ms';
                entry.target.classList.remove('is-visible');
            }
        });
    }, observerOptions);

    // Seleccionamos todos los elementos con clases de animación
    const animatedElements = document.querySelectorAll('.fade-in, .slide-up, .slide-left, .slide-right, .scale-in');
    
    animatedElements.forEach(el => observer.observe(el));

    // ==========================================
    // Sistema Global de Partículas Tecnológicas
    // ==========================================
    const isMobile = window.innerWidth <= 768;
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        // Asegurar que la sección sea un contenedor relativo
        if (getComputedStyle(section).position === 'static') {
            section.style.position = 'relative';
        }
        
        const particleContainer = document.createElement('div');
        particleContainer.className = 'particles-container';
        
        // Generar algunas partículas en desktop, menos en mobile
        const baseCount = isMobile ? 5 : 12;
        const particleCount = Math.floor(Math.random() * (isMobile ? 4 : 8)) + baseCount;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Propiedades aleatorias para aspecto tecnológico
            const size = Math.floor(Math.random() * 4) + 2; // 2px a 6px
            const left = Math.floor(Math.random() * 100); // Posición horizontal
            const delay = Math.floor(Math.random() * 5); // Retraso inicial
            const duration = Math.floor(Math.random() * 10) + 15; // Velocidad de subida (15s a 25s)
            const horizontalMove = Math.random() > 0.5 ? 1 : -1; // Dirección horizontal
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${left}%`;
            particle.style.setProperty('--move-x', `${horizontalMove * (Math.random() * 100)}px`);
            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `${delay}s`;
            
            particleContainer.appendChild(particle);
        }
        
        // Insertar al inicio de la sección
        section.insertBefore(particleContainer, section.firstChild);
    });
});
