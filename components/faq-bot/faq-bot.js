/* ==========================================================================
   FAQ BOT LOGIC - GRUPO VDG (EVOLUCIÓN)
   ========================================================================== */

const faqBotState = {
    isOpen: false,
    isInitialized: false,
    interactionCount: 0,
    currentPage: window.location.pathname.split('/').pop() || 'index.html',
    history: []
};

document.addEventListener("DOMContentLoaded", () => {
    // 1. Cargar el componente HTML
    fetch('components/faq-bot/faq-bot.html')
        .then(response => {
            if (!response.ok) throw new Error("No se pudo cargar el HTML del bot");
            return response.text();
        })
        .then(html => {
            const wrapper = document.createElement('div');
            wrapper.innerHTML = html;
            document.body.appendChild(wrapper.firstElementChild);
            initFaqBot();
        })
        .catch(err => {
            console.error("Error cargando FAQ Bot:", err);
            console.log("Asegúrate de ejecutar esto mediante un servidor local (ej. Live Server)");
        });
});

function initFaqBot() {
    // Referencias DOM
    const bubble = document.getElementById('faqBotBubble');
    const windowEl = document.getElementById('faqBotWindow');
    const closeBtn = document.getElementById('faqBotClose');
    const messagesContainer = document.getElementById('faqBotMessages');
    const inputField = document.getElementById('faqBotInput');
    const sendBtn = document.getElementById('faqBotSend');

    // Datos de preguntas frecuentes (FAQ) avanzados
    const faqData = {
        1: {
            id: 1,
            question: "¿Qué servicios ofrece GRUPO VDG?",
            answer: "GRUPO VDG desarrolla soluciones tecnológicas orientadas a resolver necesidades reales de las empresas. Trabajamos en desarrollo de software, consultoría, seguridad, ciberseguridad, automatización e inteligencia artificial.",
            category: "servicios",
            targetPage: "servicios.html",
            targetLabel: "Conocer nuestros servicios",
            relatedQuestions: [2, 6]
        },
        2: {
            id: 2,
            question: "¿Desarrollan software personalizado?",
            answer: "Sí. Diseñamos soluciones de software adaptadas al problema, objetivos y procesos de cada organización.",
            category: "servicios",
            targetPage: "servicios.html",
            targetLabel: "Ver servicios de desarrollo",
            relatedQuestions: [1, 9]
        },
        3: {
            id: 3,
            question: "¿Trabajan con Inteligencia Artificial?",
            answer: "Sí. La Inteligencia Artificial forma parte de nuestras líneas de innovación. Exploramos soluciones de automatización, asistentes y agentes inteligentes aplicados a necesidades empresariales.",
            category: "tecnologia",
            targetPage: "tecnologia.html",
            targetLabel: "Explorar tecnología",
            relatedQuestions: [4]
        },
        4: {
            id: 4,
            question: "¿Qué es un agente de IA?",
            answer: "Un agente de IA puede analizar información, tomar decisiones dentro de reglas establecidas y ejecutar determinadas tareas. En GRUPO VDG buscamos aplicar este tipo de tecnología a procesos que realmente aporten valor.",
            category: "tecnologia",
            targetPage: "tecnologia.html",
            targetLabel: "Conocer nuestra tecnología",
            relatedQuestions: [3]
        },
        5: {
            id: 5,
            question: "¿Ofrecen servicios de ciberseguridad?",
            answer: "Sí. Contamos con soluciones enfocadas en fortalecer la seguridad tecnológica y reducir riesgos relacionados con la información y los sistemas.",
            category: "servicios",
            targetPage: "servicios.html",
            targetLabel: "Explorar servicios",
            relatedQuestions: [1, 6]
        },
        6: {
            id: 6,
            question: "¿Ofrecen consultoría tecnológica?",
            answer: "Sí. Analizamos las necesidades tecnológicas de cada organización para ayudar a identificar oportunidades de mejora y soluciones adecuadas.",
            category: "servicios",
            targetPage: "servicios.html",
            targetLabel: "Conocer consultoría",
            relatedQuestions: [1, 7]
        },
        7: {
            id: 7,
            question: "¿Pueden automatizar procesos?",
            answer: "Sí. Podemos identificar procesos repetitivos y plantear soluciones de automatización que ayuden a mejorar eficiencia, tiempos y operación.",
            category: "servicios",
            targetPage: "servicios.html",
            targetLabel: "Ver soluciones",
            relatedQuestions: [3, 9]
        },
        8: {
            id: 8,
            question: "¿Trabajan con empresas?",
            answer: "Sí. GRUPO VDG está orientado a colaborar con organizaciones que buscan desarrollar, modernizar o mejorar sus capacidades tecnológicas.",
            category: "nosotros",
            targetPage: "nosotros.html",
            targetLabel: "Conocer GRUPO VDG",
            relatedQuestions: [10, 14]
        },
        9: {
            id: 9,
            question: "¿Pueden integrar diferentes sistemas?",
            answer: "Sí. Podemos trabajar con integraciones entre sistemas, servicios y APIs para facilitar el intercambio de información entre diferentes plataformas.",
            category: "servicios",
            targetPage: "servicios.html",
            targetLabel: "Conocer servicios",
            relatedQuestions: [2, 7]
        },
        10: {
            id: 10,
            question: "¿Cómo inicia un proyecto?",
            answer: "Todo comienza entendiendo el problema. Analizamos la necesidad, objetivos y contexto para posteriormente plantear una estrategia tecnológica adecuada.",
            category: "nosotros",
            targetPage: "nosotros.html",
            targetLabel: "Conocer nuestra metodología",
            relatedQuestions: [8, 11]
        },
        11: {
            id: 11,
            question: "¿Puedo solicitar una cotización?",
            answer: "Por supuesto. Puedes compartirnos la información de tu proyecto para conocer tus necesidades y evaluar contigo los siguientes pasos.",
            category: "contacto",
            targetPage: "contacto.html",
            targetLabel: "Solicitar cotización",
            relatedQuestions: [15, 12]
        },
        12: {
            id: 12,
            question: "¿Cómo puedo contactar a GRUPO VDG?",
            answer: "Puedes comunicarte con nosotros mediante WhatsApp, correo electrónico o llamada. También puedes utilizar nuestro formulario de contacto.",
            category: "contacto",
            targetPage: "contacto.html",
            targetLabel: "Contactar ahora",
            relatedQuestions: [13, 11]
        },
        13: {
            id: 13,
            question: "¿Puedo solicitar una asesoría?",
            answer: "Sí. Puedes explicarnos brevemente tu necesidad y nuestro equipo podrá analizar contigo las posibles alternativas.",
            category: "contacto",
            targetPage: "contacto.html",
            targetLabel: "Solicitar asesoría",
            relatedQuestions: [12, 15]
        },
        14: {
            id: 14,
            question: "¿Trabajan con proyectos pequeños y grandes?",
            answer: "Cada proyecto se analiza individualmente. Nuestro objetivo es entender el alcance y encontrar una solución adecuada a las necesidades reales del cliente.",
            category: "nosotros",
            targetPage: "nosotros.html",
            targetLabel: "Conocer GRUPO VDG",
            relatedQuestions: [8, 10]
        },
        15: {
            id: 15,
            question: "¿Cómo puedo explicarles mi proyecto?",
            answer: "Puedes utilizar nuestro formulario para explicarnos tu idea, problema, objetivo o necesidad tecnológica. No necesitas tener definida toda la solución.",
            category: "contacto",
            targetPage: "contacto.html",
            targetLabel: "Hablar sobre mi proyecto",
            relatedQuestions: [11, 13]
        }
    };

    const introPhrases = [
        "Claro.",
        "Por supuesto.",
        "Buena pregunta.",
        "Te explico.",
        "Entiendo."
    ];

    // --- FUNCIONES DE INTERFAZ ---

    function toggleBot() {
        if (faqBotState.isOpen) {
            windowEl.classList.remove('faq-bot-open');
            windowEl.classList.add('faq-bot-closing');
            setTimeout(() => {
                windowEl.style.display = 'none';
                windowEl.classList.remove('faq-bot-closing');
            }, 300);
            faqBotState.isOpen = false;
        } else {
            windowEl.style.display = 'flex';
            setTimeout(() => {
                windowEl.classList.add('faq-bot-open');
            }, 10);
            faqBotState.isOpen = true;
            
            if (!faqBotState.isInitialized) {
                showInitialMessages();
                faqBotState.isInitialized = true;
            }
            setTimeout(() => inputField.focus(), 350);
        }
    }

    function addMessage(text, sender, isHtml = false) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `faq-bot-message ${sender}`;
        
        if (isHtml) {
            msgDiv.innerHTML = text; 
        } else {
            msgDiv.textContent = text; 
        }
        
        messagesContainer.appendChild(msgDiv);
        scrollToBottom();
        return msgDiv; 
    }

    function showTypingIndicator(text = "") {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'faq-bot-message bot faq-bot-system-msg';
        
        let content = '';
        if (text) {
            content = `<span>${text}</span>`;
        } else {
            content = '<div class="faq-bot-typing"><span></span><span></span><span></span></div>';
        }
        
        msgDiv.innerHTML = content;
        messagesContainer.appendChild(msgDiv);
        scrollToBottom();
        return msgDiv;
    }

    function scrollToBottom() {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // --- LÓGICA CONVERSACIONAL ---

    function showInitialMessages() {
        addMessage("Hola, soy el asistente virtual de GRUPO VDG.", 'bot');
        
        setTimeout(() => {
            addMessage("Por ahora estoy configurado para responder preguntas frecuentes. Escribe únicamente el número de la pregunta que deseas consultar.", 'bot');
            
            setTimeout(() => {
                showQuestionsList();
            }, 800);
        }, 800);
    }

    function showQuestionsList() {
        let questionsHtml = '<div class="faq-bot-questions-title">PREGUNTAS FRECUENTES</div><div class="faq-bot-questions-list">';
        for (let i = 1; i <= 15; i++) {
            questionsHtml += `<p><strong>${i}.</strong> ${faqData[i].question}</p>`;
        }
        questionsHtml += '</div>';
        
        addMessage(questionsHtml, 'bot', true);
    }

    function handleUserInput(forcedInput = null) {
        const rawText = forcedInput !== null ? forcedInput : inputField.value.trim();
        if (rawText === "") return;
        
        addMessage(rawText, 'user');
        inputField.value = '';
        
        const num = parseInt(rawText);
        const lowerText = rawText.toLowerCase();

        // 1. Validaciones básicas sin razonamiento profundo
        if (lowerText.includes("hola")) {
            setTimeout(() => addMessage("Para esta versión de demostración, escribe únicamente el número de la pregunta que deseas consultar.", 'bot'), 500);
            return;
        }
        if (lowerText === "uno" || lowerText === "dos" || lowerText === "tres") {
            setTimeout(() => addMessage("Escribe el número correspondiente. Por ejemplo: 1.", 'bot'), 500);
            return;
        }
        if (isNaN(num) || num < 1 || num > 15) {
            setTimeout(() => addMessage("Por favor, selecciona una opción del 1 al 15.", 'bot'), 500);
            return;
        }

        // 2. Proceso Simulado de Razonamiento
        processSmartResponse(num);
    }

    function processSmartResponse(id) {
        const data = faqData[id];
        faqBotState.interactionCount++;
        
        // Comprobar memoria/historial de conversación
        const previousContext = faqBotState.history.length > 0 ? faqBotState.history[faqBotState.history.length - 1].category : null;
        faqBotState.history.push(data);

        // A. Estado de Pensamiento
        const thinkingIndicator = showTypingIndicator("Analizando tu consulta...");
        
        setTimeout(() => {
            thinkingIndicator.remove();
            
            // B. Intro Contextual 
            let introText = "";
            if (previousContext === data.category && faqBotState.history.length > 1) {
                if (data.category === 'tecnologia') introText = "Veo que estás explorando nuestra parte de Inteligencia Artificial y Tecnología. ";
                else if (data.category === 'servicios') introText = "Siguiendo con el tema de nuestros servicios. ";
                else introText = introPhrases[Math.floor(Math.random() * introPhrases.length)] + " ";
            } else {
                introText = introPhrases[Math.floor(Math.random() * introPhrases.length)] + " ";
            }
            
            addMessage(introText + data.answer, 'bot');
            
            // C. Navegación e integraciones
            setTimeout(() => {
                showNavigationCTA(data);
                
                // Mostrar sugerencias relacionadas si existen
                if (data.relatedQuestions && data.relatedQuestions.length > 0) {
                    setTimeout(() => showSuggestions(data.relatedQuestions), 800);
                }
            }, 600);

        }, 600 + Math.random() * 300); // 600 - 900ms simulación
    }

    function showNavigationCTA(data) {
        // Verificar si ya estamos en la página
        if (faqBotState.currentPage === data.targetPage) {
            const currentSectionName = data.targetPage.replace('.html', '').toUpperCase();
            addMessage(`Ya estás en nuestra sección de ${currentSectionName}. Aquí puedes consultar la información relacionada.`, 'bot');
        } else {
            let msg = `Si quieres profundizar, puedo llevarte a nuestra sección relacionada.`;
            if (data.category === 'contacto') {
                msg = "¿Quieres contarnos qué necesitas?";
            }
            
            let html = `
                ${msg}
                <a href="${data.targetPage}" class="faq-bot-nav-btn">${data.targetLabel}</a>
            `;
            addMessage(html, 'bot', true);
            
            // Adjuntar evento de animación para los nuevos botones inyectados
            attachNavigationEvents();
        }
    }

    function showSuggestions(relatedIds) {
        let html = `<div style="font-size: 0.85rem; color: var(--faq-bot-dark); margin-bottom: 0.5rem;">También podría interesarte:</div>`;
        
        // Limitar a máximo 2
        const idsToShow = relatedIds.slice(0, 2);
        
        idsToShow.forEach(id => {
            html += `<button class="faq-bot-suggestion" data-question="${id}">${faqData[id].question}</button>`;
        });
        
        // Botón discreto de reinicio
        html += `<button class="faq-bot-suggestion" id="faqBotResetBtn" style="background:transparent; border:none; text-decoration:underline; color:var(--faq-bot-dark); margin-top:0.5rem; width:100%;">Ver las 15 preguntas de nuevo</button>`;

        const msgDiv = addMessage(html, 'bot', true);
        
        // Agregar eventos a sugerencias
        const suggestionBtns = msgDiv.querySelectorAll('button[data-question]');
        suggestionBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const qId = e.target.getAttribute('data-question');
                handleUserInput(qId);
            });
        });

        const resetBtn = msgDiv.querySelector('#faqBotResetBtn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                showQuestionsList();
            });
        }
    }

    function attachNavigationEvents() {
        const navLinks = messagesContainer.querySelectorAll('.faq-bot-nav-btn');
        navLinks.forEach(link => {
            // Prevenir múltiples eventos
            if(link.hasAttribute('data-bound')) return;
            link.setAttribute('data-bound', 'true');
            
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetUrl = link.getAttribute('href');
                
                // Microanimación antes de navegar
                link.style.opacity = '0.5';
                link.style.transform = 'scale(0.95)';
                
                setTimeout(() => {
                    window.location.href = targetUrl;
                }, 250);
            });
        });
    }

    // --- EVENT LISTENERS GLOBALES ---
    bubble.addEventListener('click', toggleBot);
    closeBtn.addEventListener('click', toggleBot);
    
    sendBtn.addEventListener('click', () => handleUserInput());
    inputField.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleUserInput();
        }
    });
}
