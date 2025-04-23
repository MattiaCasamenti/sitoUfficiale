document.addEventListener('DOMContentLoaded', function() {
    // Animazione immagine che si muove liberamente
    const crazyImg = document.querySelector('.crazy-move');
    let posX = Math.random() * (window.innerWidth - 300);
    let posY = window.scrollY + Math.random() * (window.innerHeight - 300);
    let speedX = (Math.random() - 0.5) * 5;
    let speedY = (Math.random() - 0.5) * 5;
    
    function moveCrazyImage() {
        // Aggiorna la posizione Y in base allo scroll
        const scrollOffset = window.scrollY;
        const sectionOffset = crazyImg.closest('.content-section').offsetTop;
        const relativeY = posY - sectionOffset;
        
        // Calcola la nuova posizione
        let newX = posX + speedX;
        let newY = relativeY + speedY;
        
        // Confini orizzontali
        if (newX <= 0 || newX >= window.innerWidth - 300) {
            speedX = -speedX * (0.9 + Math.random() * 0.2);
            crazyImg.style.filter = `hue-rotate(${Math.random() * 360}deg)`;
        }
        
        // Confini verticali (relativi alla sezione)
        if (newY <= 0 || newY >= window.innerHeight - 300) {
            speedY = -speedY * (0.9 + Math.random() * 0.2);
            crazyImg.style.borderRadius = `${Math.random() * 50}%`;
        }
        
        // Aggiorna le posizioni
        posX += speedX;
        posY = sectionOffset + newY;
        
        // Applica la nuova posizione
        crazyImg.style.left = `${posX}px`;
        crazyImg.style.top = `${posY}px`;
        
        // Cambia occasionalmente direzione
        if (Math.random() < 0.02) {
            speedX = (Math.random() - 0.5) * 5;
            speedY = (Math.random() - 0.5) * 5;
        }
        
        requestAnimationFrame(moveCrazyImage);
    }
    
    moveCrazyImage();
    
    // Aggiorna la posizione dell'immagine crazy durante lo scroll
    window.addEventListener('scroll', function() {
        const crazyImg = document.querySelector('.crazy-move');
        const section = crazyImg.closest('.content-section');
        const sectionRect = section.getBoundingClientRect();
        
        // Mantieni l'immagine all'interno della sezione visibile
        if (sectionRect.top > window.innerHeight || sectionRect.bottom < 0) {
            crazyImg.style.opacity = '0';
        } else {
            crazyImg.style.opacity = '1';
        }
    });
    
    // Effetto di distorsione per i campi di testo
    const distortingFields = document.querySelectorAll('.distorting input');
    distortingFields.forEach(field => {
        field.addEventListener('focus', function() {
            this.parentElement.style.animation = 'distort 1s infinite';
        });
        
        field.addEventListener('blur', function() {
            this.parentElement.style.animation = 'distort 4s infinite';
        });
    });
    
    // Effetto glitch per i textarea
    const glitchyFields = document.querySelectorAll('.glitchy textarea');
    glitchyFields.forEach(field => {
        field.addEventListener('input', function() {
            if (this.value.length % 5 === 0) {
                this.parentElement.style.animation = 'text-glitch 0.5s infinite';
                setTimeout(() => {
                    this.parentElement.style.animation = 'text-glitch 2s infinite';
                }, 1000);
            }
        });
    });
    
    // Controllo audio
    const audioToggle = document.getElementById('audioToggle');
    const bgAudio = document.getElementById('bgAudio');
    let audioEnabled = false;
    
    audioToggle.addEventListener('click', function() {
        audioEnabled = !audioEnabled;
        
        if (audioEnabled) {
            bgAudio.play();
            this.innerHTML = '<i class="fas fa-volume-mute"></i><span>DISATTIVA AUDIO</span>';
            document.body.classList.add('audio-on');
        } else {
            bgAudio.pause();
            this.innerHTML = '<i class="fas fa-volume-up"></i><span>ATTIVA AUDIO</span>';
            document.body.classList.remove('audio-on');
        }
    });
    
    // Effetto hover sulle immagini
    const animatedImgs = document.querySelectorAll('.animated-img');
    animatedImgs.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.filter = 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.8))';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.filter = 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))';
        });
    });
    
    // Effetto di particelle
    createParticles();
    
    function createParticles() {
        const particleCount = 50;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Posizione e dimensioni casuali
            const size = Math.random() * 10 + 5;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}vw`;
            particle.style.top = `${Math.random() * document.body.scrollHeight}px`;
            
            // Colore casuale
            const hue = Math.random() * 360;
            particle.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;
            
            // Animazione
            const duration = Math.random() * 20 + 10;
            particle.style.animation = `float ${duration}s linear infinite`;
            
            document.body.appendChild(particle);
        }
    }
});