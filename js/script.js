Reveal.initialize({
    hash: true,
    transition: 'fade',
    transitionSpeed: 'default',
    backgroundTransition: 'fade',

    width: '100%',
    height: '100%',
    margin: 0,

    controls: true,
    progress: true,
    center: true,

    fragments: true,

    keyboard: true,
    overview: true,
    touch: true,

    autoSlide: 0,

    plugins: [ RevealMarkdown, RevealHighlight, RevealNotes, RevealMath.KaTeX ]
});

Reveal.on('slidechanged', (event) => {
    const slide = event.currentSlide;
    if (slide) {
        slide.style.animation = 'none';
        setTimeout(() => {
            slide.style.animation = '';
        }, 10);
    }
});

Reveal.on('fragmentshown', (event) => {
    const fragment = event.fragment;
    fragment.classList.add('visible');
});

Reveal.on('fragmenthidden', (event) => {
    const fragment = event.fragment;
    fragment.classList.remove('visible');
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
        Reveal.slide(0);
    }
});

console.log('%c🎉 HSSE Presentation Ready', 'color: #eae9b8; font-size: 16px; font-weight: bold;');
