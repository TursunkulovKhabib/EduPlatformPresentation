// 1. Плавный скролл (Lenis)
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    smooth: true,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// 2. Анимация появления при скролле
const observerOptions = {
    root: null,
    threshold: 0.1, // Чуть раньше начинаем анимацию
    rootMargin: "0px"
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal-text, .reveal-card, .reveal-pop').forEach((el) => {
    observer.observe(el);
});

// 3. Клавиатура (вверх/вниз)
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowDown') {
        event.preventDefault();
        lenis.scrollBy(window.innerHeight * 0.8, { duration: 1.2 });
    } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        lenis.scrollBy(-window.innerHeight * 0.8, { duration: 1.2 });
    }
});

// 4. Логика Lightbox (просмотр скриншотов)
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const screenshots = document.querySelectorAll('.screenshot');
const closeBtn = document.querySelector('.close-btn');
const overlay = document.querySelector('.lightbox-overlay');

// Открытие
screenshots.forEach(item => {
    item.addEventListener('click', () => {
        const imgSource = item.querySelector('img').src;
        lightboxImg.src = imgSource;
        lightbox.classList.add('active');
        // Блокируем скролл страницы
        lenis.stop();
        document.body.style.overflow = 'hidden';
    });
});

// Закрытие
function closeLightbox() {
    lightbox.classList.remove('active');
    lenis.start();
    document.body.style.overflow = '';
}

closeBtn.addEventListener('click', closeLightbox);
overlay.addEventListener('click', closeLightbox);

// Закрытие по ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
    }
});

console.log('✅ Interactive presentation ready');
