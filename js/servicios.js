/**
 * servicios.js
 * Lógica específica para la página de servicios.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Parallax muy sutil para las formas visuales de servicios
    const visuals = document.querySelectorAll('.visual-placeholder');
    
    if (visuals.length > 0) {
        window.addEventListener('scroll', () => {
            window.requestAnimationFrame(() => {
                visuals.forEach(visual => {
                    const rect = visual.getBoundingClientRect();
                    const visibleRatio = (window.innerHeight - rect.top) / window.innerHeight;
                    
                    // Solo animar si está en viewport
                    if(visibleRatio > 0 && visibleRatio < 1.5) {
                        // Rotación sutil
                        const rotation = (visibleRatio - 0.5) * 15; // -7.5deg to 7.5deg
                        
                        // Ignorar el cubo porque ya está rotado a 45deg
                        if(!visual.classList.contains('cube')) {
                            visual.style.transform = `rotate(${rotation}deg)`;
                        }
                    }
                });
            });
        }, { passive: true });
    }
});
