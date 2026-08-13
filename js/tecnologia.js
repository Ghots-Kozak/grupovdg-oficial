/**
 * tecnologia.js
 * Lógica para la visualización del ecosistema tecnológico.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Generar un pequeño efecto de destello en las líneas del SVG periódicamente
    const lines = document.querySelectorAll('.ecosystem-lines line');
    
    if(lines.length > 0) {
        setInterval(() => {
            // Seleccionar una línea aleatoria
            const randomLine = lines[Math.floor(Math.random() * lines.length)];
            
            // Efecto de destello
            randomLine.style.stroke = 'rgba(0, 210, 255, 0.8)';
            randomLine.style.strokeWidth = '3';
            
            setTimeout(() => {
                randomLine.style.stroke = 'rgba(10, 77, 255, 0.3)';
                randomLine.style.strokeWidth = '2';
            }, 500);
            
        }, 2000);
    }
});
