// Preloader avec barre de progression (15 secondes)
document.addEventListener('DOMContentLoaded', function () {
    const preloader = document.querySelector('.preloader');
    const progressBar = document.getElementById('progressBar');
    let progress = 0;

    // Mise à jour de la barre de progression toutes les 150ms (15 secondes / 100 = 150ms)
    const interval = setInterval(() => {
        progress += 1;
        progressBar.style.width = progress + '%';

        if (progress >= 100) {
            clearInterval(interval);
            // Attendre 500ms supplémentaires pour montrer 100% avant de cacher
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                    // Initialiser les sliders après que le preloader est caché
                    initializeSwipers();
                }, 500);
            }, 500);
        }
    }, 100); // 100ms * 100 = 10 secondes

    // Fonction pour initialiser tous les Swipers
    function initializeSwipers() {
        // Main slider
        new Swiper('.main-swiper', {
            loop: true,
            speed: 800,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination-center',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            on: {
                init: function () {
                    // Animation pour le premier slide
                    const firstSlideContent = document.querySelector('.swiper-slide-active .slide-content');
                    if (firstSlideContent) {
                        firstSlideContent.classList.add('animate__fadeInUp');
                    }
                },
                slideChangeTransitionStart: function () {
                    // Réinitialiser les animations
                    const slideContents = document.querySelectorAll('.slide-content');
                    slideContents.forEach(content => {
                        content.classList.remove('animate__fadeInUp');
                    });
                },
                slideChangeTransitionEnd: function () {
                    // Ajouter l'animation au slide actif
                    const activeSlideContent = document.querySelector('.swiper-slide-active .slide-content');
                    if (activeSlideContent) {
                        activeSlideContent.classList.add('animate__fadeInUp');
                    }
                }
            }
        });

        // Testimonials slider
        new Swiper('.testimonials-swiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 4000,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                992: {
                    slidesPerView: 3,
                }
            }
        });
    }

    // Header sticky
    window.addEventListener('scroll', function () {
        const header = document.querySelector('.main-header');
        if (window.scrollY > 100) {
            header.classList.add('sticky-top');
        } else {
            header.classList.remove('sticky-top');
        }
    });

    // Animation au scroll
    const animateElements = document.querySelectorAll('[data-animation]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const animation = entry.target.getAttribute('data-animation');
                const delay = entry.target.getAttribute('data-delay') || 0;

                setTimeout(() => {
                    entry.target.classList.add('animate__' + animation);
                }, delay);

                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animateElements.forEach(el => {
        observer.observe(el);
    });
});