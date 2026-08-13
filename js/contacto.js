/**
 * contacto.js
 * Maneja la simulación del envío del formulario corporativo y la redirección a mailto.
 */

document.addEventListener('DOMContentLoaded', () => {

    // Lógica del Formulario (Simulación de envío y redirección a correo corporativo)
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = document.getElementById('btnText');
    const formFeedback = document.getElementById('formFeedback');
    const resetBtn = document.getElementById('resetBtn');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Evitar recarga de la página

            // 1. Mostrar estado de carga en el botón
            const originalText = btnText.innerText;
            btnText.innerText = "Procesando solicitud...";
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';
            submitBtn.style.cursor = 'wait';

            // 2. Capturar los datos introducidos por el cliente
            const nombre = document.getElementById('nombre').value;
            const empresa = document.getElementById('empresa').value || 'Sin empresa';
            const correo = document.getElementById('correo').value;

            // Obtener el texto legible del servicio seleccionado (ej. "Desarrollo de Software")
            const selectServicio = document.getElementById('servicio');
            const servicioTexto = selectServicio.options[selectServicio.selectedIndex].text;

            const mensaje = document.getElementById('mensaje').value;

            // 3. Simular tiempo de procesamiento (2 segundos)
            setTimeout(() => {
                // 4. Construir la URL mailto dinámica
                const destinatario = 'victor.castro@grupovdg.com';
                const subject = encodeURIComponent(`Nuevo Prospecto Web: ${servicioTexto} - ${empresa}`);

                // Estructurar el cuerpo del correo de manera corporativa y limpia
                const cuerpoTexto = `Hola equipo de GRUPO VDG,\n\nSe ha recibido una nueva solicitud de contacto desde el sitio web:\n\n* Datos del Prospecto:\n- Nombre: ${nombre}\n- Empresa: ${empresa}\n- Correo: ${correo}\n- Servicio de interés: ${servicioTexto}\n\n* Mensaje / Reto Técnico:\n${mensaje}\n\nSaludos.`;

                const body = encodeURIComponent(cuerpoTexto);
                const mailtoURL = `mailto:${destinatario}?subject=${subject}&body=${body}`;

                // 5. Ejecutar la apertura del cliente de correo nativo del usuario (Outlook, Mail, Gmail, etc.)
                window.location.href = mailtoURL;

                // 6. Ocultar formulario visualmente y mostrar feedback de éxito
                form.style.display = 'none';
                formFeedback.style.display = 'block';

                // 7. Resetear estado del botón para futuros envíos por si regresan al formulario
                btnText.innerText = originalText;
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
                submitBtn.style.cursor = 'pointer';

                console.log("Datos capturados y enviados al cliente de correo exitosamente.");

            }, 2000); // 2 segundos de simulación para dar sensación tecnológica
        });
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            // Reiniciar formulario para una nueva solicitud
            form.reset();
            formFeedback.style.display = 'none';
            form.style.display = 'block';
        });
    }

    // Lógica para pre-seleccionar el select si el usuario viene de otra página con el parámetro URL ?service=...
    const urlParams = new URLSearchParams(window.location.search);
    const serviceParam = urlParams.get('service');
    if (serviceParam) {
        const selectServicio = document.getElementById('servicio');
        if (selectServicio) {
            selectServicio.value = serviceParam;
        }
    }

    // Lógica del Slideshow de Información Útil (Conservado intacto)
    const slideshowContainer = document.getElementById('infoSlideshow');
    if (slideshowContainer) {
        const slides = slideshowContainer.querySelectorAll('.slide-item');
        let currentSlide = 0;

        if (slides.length > 1) {
            setInterval(() => {
                // Quitar active de la actual
                slides[currentSlide].classList.remove('active');

                // Calcular siguiente
                currentSlide = (currentSlide + 1) % slides.length;

                // Poner active a la siguiente
                slides[currentSlide].classList.add('active');
            }, 5000); // Cambiar cada 5 segundos
        }
    }
});