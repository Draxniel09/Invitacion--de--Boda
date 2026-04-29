document.addEventListener('DOMContentLoaded', function() {
    const envelopeScreen = document.getElementById('envelope-screen');
    const flap = document.getElementById('flap');
    const seal = document.getElementById('seal');
    const mainInvitation = document.getElementById('main-invitation');

    envelopeScreen.addEventListener('click', function() {
        // Evitá que vuelva a ejecutar si ya está abierto
        if (flap.classList.contains('open')) return;

        // 1. Abrimos solapa y desvanece el sello
        flap.classList.add('open');
        seal.style.opacity = '0';
        seal.style.transform = 'translate(-50%, -50%) scale(0)';
        
        // 2. Esperamos que la solapa se abra y deslizamos el sobre entero hacia arriba (fade out)
        setTimeout(() => {
            envelopeScreen.classList.add('fade-out');
            
            // 3. Cuando el sobre se fue de pantalla, revelamos la invitación
            setTimeout(() => {
                envelopeScreen.style.display = 'none';
                mainInvitation.classList.add('visible');
                
                // INICIAR AOS RECIÉN ACÁ, para que la animación no se dispare a oscuras
                AOS.init({
                    duration: 1500,
                    easing: 'ease-out-cubic',
                    once: true,
                    offset: 20
                });
            }, 800); 
        }, 700); 
    });

    // === LÓGICA DEL CONTADOR DE TIEMPO (COUNTDOWN) ===
    const eventDate = new Date("Jun 20, 2026 14:00:00").getTime();
    
    // Función que actualiza el contador cada 1 segundo (1000 ms)
    const countdownInterval = setInterval(function() {
        const now = new Date().getTime();
        const distance = eventDate - now;

        // Si por alguna razón los divs no existen, abortamos silenciosamente
        if (!document.getElementById('days')) return;

        if (distance >= 0) {
            // Cálculos matemáticos usando módulo para obtener remanentes precisos
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Inyectar en el DOM forzando diseño de dos dígitos (ej: "03" en vez de "3")
            document.getElementById('days').innerText = days < 10 ? "0" + days : days;
            document.getElementById('hours').innerText = hours < 10 ? "0" + hours : hours;
            document.getElementById('minutes').innerText = minutes < 10 ? "0" + minutes : minutes;
            document.getElementById('seconds').innerText = seconds < 10 ? "0" + seconds : seconds;
        } else {
            // Cuando la fecha se supera
            clearInterval(countdownInterval);
            document.querySelector('.countdown-wrapper').innerHTML = 
                "<h3 style='color: var(--gold-light); font-family: var(--font-serif); font-size: 1.5rem;'>¡EL GRAN DÍA HA LLEGADO!</h3>";
        }
    }, 1000);
});