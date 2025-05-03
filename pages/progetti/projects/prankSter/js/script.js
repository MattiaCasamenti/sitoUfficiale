document.addEventListener('DOMContentLoaded', function() {
    const logo = document.getElementById('logo');
    const container = document.querySelector('.contenitore');
    
    // Assicurati che l'immagine sia caricata prima di iniziare l'animazione
    logo.onload = initAnimation;
    if (logo.complete) initAnimation(); // Se l'immagine è già caricata
    
    function initAnimation() {
        // Dimensioni aggiornate
        const containerRect = container.getBoundingClientRect();
        const logoRect = logo.getBoundingClientRect();
        
        // Posizione iniziale casuale
        let x = Math.random() * (containerRect.width - logoRect.width);
        let y = Math.random() * (containerRect.height - logoRect.height);
        
        // Velocità iniziale
        let speedFactor = getRandomSpeedFactor();
        let xSpeed = speedFactor;
        let ySpeed = speedFactor;
        let angle = 0;
        let angleSpeed = speedFactor * 0.5;
        
        // Gestione del ridimensionamento
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                const newContainerRect = container.getBoundingClientRect();
                // Mantieni il logo dentro i nuovi bordi
                x = Math.min(Math.max(x, 0), newContainerRect.width - logoRect.width);
                y = Math.min(Math.max(y, 0), newContainerRect.height - logoRect.height);
            }, 100);
        });
        
        function getRandomSpeedFactor() {
            return Math.random() * 2 + 1;
        }
        
        function updatePosition() {
            const containerRect = container.getBoundingClientRect();
            const logoRect = logo.getBoundingClientRect();
            
            x += xSpeed;
            y += ySpeed;
            
            // Collisione con i bordi
            if (x <= 0 || x + logoRect.width >= containerRect.width) {
                xSpeed *= -1;
                adjustSpeedsAndRotation();
                x = x <= 0 ? 0 : containerRect.width - logoRect.width;
            }
            
            if (y <= 0 || y + logoRect.height >= containerRect.height) {
                ySpeed *= -1;
                adjustSpeedsAndRotation();
                y = y <= 0 ? 0 : containerRect.height - logoRect.height;
            }
            
            angle += angleSpeed;
            
            logo.style.position = 'absolute';
            logo.style.left = `${x}px`;
            logo.style.top = `${y}px`;
            logo.style.transform = `rotate(${angle}deg)`;
            
            requestAnimationFrame(updatePosition);
        }
        
        function adjustSpeedsAndRotation() {
            speedFactor = getRandomSpeedFactor();
            xSpeed = (xSpeed < 0 ? -1 : 1) * speedFactor;
            ySpeed = (ySpeed < 0 ? -1 : 1) * speedFactor;
            angleSpeed = speedFactor * 0.5;
        }
        
        updatePosition();
    }
	function animateOnScroll() {
    const elements = document.querySelectorAll('.container > *');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// Esegui l'animazione quando la pagina è completamente caricata
window.addEventListener('load', () => {
    animateOnScroll();
    
    // Aggiungi un effetto di particelle al contenitore del logo
    const container = document.querySelector('.contenitore');
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '3px';
        particle.style.height = '3px';
        particle.style.backgroundColor = 'rgba(0, 255, 255, 0.7)';
        particle.style.borderRadius = '50%';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.pointerEvents = 'none';
        particle.style.animation = `floatParticle ${Math.random() * 5 + 5}s infinite ease-in-out`;
        container.appendChild(particle);
    }
});

// Aggiungi queste animazioni al tuo CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes floatParticle {
        0%, 100% { transform: translate(0, 0); opacity: 0.7; }
        25% { transform: translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px); }
        50% { transform: translate(${Math.random() * 30 - 15}px, ${Math.random() * 30 - 15}px); opacity: 0.3; }
        75% { transform: translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px); }
    }
`;
document.head.appendChild(style);
});