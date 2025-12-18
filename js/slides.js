class SlidesPresentation {
    constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.currentIndex = 0;
        this.isAnimating = false;

        this.init();
    }

    init() {
        this.showSlide(0);
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
        this.triggerAnimations();
    }

    handleKeyPress(event) {
        if (this.isAnimating) return;

        if (event.key === 'ArrowDown') {
            event.preventDefault();
            this.nextSlide();
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            this.prevSlide();
        }
    }

    nextSlide() {
        if (this.currentIndex < this.slides.length - 1) {
            this.currentIndex++;
            this.transition();
        }
    }

    prevSlide() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.transition();
        }
    }

    transition() {
        this.isAnimating = true;
        this.showSlide(this.currentIndex);

        setTimeout(() => {
            this.isAnimating = false;
        }, 1000);
    }

    showSlide(index) {
        this.slides.forEach(slide => slide.classList.remove('active'));
        this.slides[index].classList.add('active');
        this.triggerAnimations();
    }

    triggerAnimations() {
        const activeSlide = this.slides[this.currentIndex];
        const animatedElements = activeSlide.querySelectorAll('[class*="reveal-"]');

        animatedElements.forEach(el => el.classList.remove('active'));

        animatedElements.forEach((el) => {
            const delay = parseFloat(el.style.transitionDelay) || 0;
            setTimeout(() => {
                el.classList.add('active');
            }, delay * 1000 + 150);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new SlidesPresentation();
    console.log('✅ Presentation loaded');
});

// LIGHTBOX
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const screenshots = document.querySelectorAll('.screenshot-compact');
const closeBtn = document.querySelector('.close-btn');
const overlay = document.querySelector('.lightbox-overlay');

screenshots.forEach(item => {
    item.addEventListener('click', () => {
        const imgSource = item.querySelector('img').src;
        lightboxImg.src = imgSource;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

closeBtn.addEventListener('click', closeLightbox);
overlay.addEventListener('click', closeLightbox);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
    }
});
