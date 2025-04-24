// Carosello
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-item');
const indicatorsContainer = document.querySelector('.carousel-indicators');
const totalSlides = slides.length;

// Crea indicatori dinamicamente
for (let i = 0; i < totalSlides; i++) {
    const indicator = document.createElement('div');
    indicator.classList.add('indicator');
    if (i === 0) indicator.classList.add('active');
    indicator.addEventListener('click', () => goToSlide(i));
    indicatorsContainer.appendChild(indicator);
}

const indicators = document.querySelectorAll('.indicator');

function updateCarousel() {
    const carouselInner = document.querySelector('.carousel-inner');
    carouselInner.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Aggiorna indicatori
    indicators.forEach((indicator, index) => {
        if (index === currentSlide) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

function moveSlide(direction) {
    currentSlide += direction;
    
    if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    } else if (currentSlide >= totalSlides) {
        currentSlide = 0;
    }
    
    updateCarousel();
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
}

// Auto-play (opzionale)
let slideInterval = setInterval(() => {
    moveSlide(1);
}, 5000);

// Pause on hover
const carousel = document.querySelector('.carousel');
carousel.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
});

carousel.addEventListener('mouseleave', () => {
    slideInterval = setInterval(() => {
        moveSlide(1);
    }, 5000);
});

// Filtri collezione
const searchInput = document.getElementById('search');
const flagCards = document.querySelectorAll('.flag-card');

searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    
    flagCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('.flag-description').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

// Paginazione
const pageBtns = document.querySelectorAll('.page-btn');

pageBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        pageBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});

// Inizializza
updateCarousel();