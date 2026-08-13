/**
 * nosotros.js
 * Lógica para la vista corporativa (Nosotros).
 * Implementa una red de constelación en Canvas ultra ligera para el Hero.
 */

document.addEventListener('DOMContentLoaded', () => {
    initConstellation();
});

function initConstellation() {
    const canvas = document.getElementById('constellation-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    let width = canvas.width = canvas.parentElement.offsetWidth;
    let height = canvas.height = canvas.parentElement.offsetHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = canvas.parentElement.offsetWidth;
        height = canvas.height = canvas.parentElement.offsetHeight;
    });

    const particles = [];
    const particleCount = window.innerWidth < 768 ? 30 : 60;
    const maxDistance = 120;

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: Math.random() * 1.5 + 0.5
        });
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);
        
        ctx.fillStyle = 'rgba(10, 77, 255, 0.5)';
        ctx.lineWidth = 0.5;

        // Actualizar y dibujar partículas
        for (let i = 0; i < particleCount; i++) {
            let p = particles[i];
            
            p.x += p.vx;
            p.y += p.vy;

            // Rebote en bordes
            if (p.x < 0 || p.x > width) p.vx = -p.vx;
            if (p.y < 0 || p.y > height) p.vy = -p.vy;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();
        }

        // Dibujar líneas entre partículas cercanas
        for (let i = 0; i < particleCount; i++) {
            for (let j = i + 1; j < particleCount; j++) {
                let p1 = particles[i];
                let p2 = particles[j];
                
                let dx = p1.x - p2.x;
                let dy = p1.y - p2.y;
                let dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < maxDistance) {
                    ctx.beginPath();
                    // Opacidad basada en la distancia
                    ctx.strokeStyle = `rgba(10, 77, 255, ${1 - dist/maxDistance})`;
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(draw);
    }

    draw();
}
