document.addEventListener('DOMContentLoaded', () => {

    /* ------------------------------
       Intersection Observer for Animations
    ------------------------------ */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2 /* Trigger when 20% of element is visible */
    };

    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Run once
            }
        });
    }, observerOptions);

    // Observe text
    const textElements = document.querySelectorAll('.animate-text');
    textElements.forEach(el => animationObserver.observe(el));

    // Observe cards
    const cardElements = document.querySelectorAll('.animate-card');
    cardElements.forEach(el => animationObserver.observe(el));

    // Observe Grid Items (Trigger visibility for CSS transitions)
    const gridItems = document.querySelectorAll('.grid-item');
    const gridObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Delays are handled by CSS :nth-child
                gridObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    gridItems.forEach(item => {
        gridObserver.observe(item);

        // Active State Click Handler
        item.addEventListener('click', () => {
            // Remove active from all
            gridItems.forEach(i => i.classList.remove('active'));
            // Add to clicked
            item.classList.add('active');
        });
    });


    /* ------------------------------
       Logic from previous script.js
       (Retaining sticky header, dropdowns, modal etc)
    ------------------------------ */

    // Sticky Header
    const header = document.querySelector('#main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // Device Dropdown Logic
    const deviceSelect = document.getElementById('device-select');
    const brandSelect = document.getElementById('brand-select');
    const modelSelect = document.getElementById('model-select');

    if (deviceSelect && brandSelect) {
        // Mock data
        const brandsByDevice = {
            'Laptop': ['Apple', 'Dell', 'HP', 'Lenovo'],
            'Desktop': ['Dell', 'HP', 'Lenovo', 'Custom'],
            'Projector': ['Epson', 'BenQ', 'Optoma'],
            'MacBook': ['Apple']
        };

        deviceSelect.addEventListener('change', function () {
            const device = this.value;
            brandSelect.innerHTML = '<option>Select Brand</option>';
            modelSelect.innerHTML = '<option>Select Model</option>';

            if (brandsByDevice[device]) {
                brandsByDevice[device].forEach(brand => {
                    const option = document.createElement('option');
                    option.value = brand;
                    option.textContent = brand;
                    brandSelect.appendChild(option);
                });
            }
        });

        brandSelect.addEventListener('change', function () {
            modelSelect.innerHTML = '<option>Select Model</option>';
            // Mock models
            const models = ['Model X', 'Model Y', 'Pro Series', 'Air Series'];
            models.forEach(model => {
                const option = document.createElement('option');
                option.value = model;
                option.textContent = model;
                modelSelect.appendChild(option);
            });
        });
    }

    // Modal Logic
    const quoteBtn = document.getElementById('get-quote-btn');
    const modal = document.getElementById('quote-modal');
    const closeModal = document.querySelector('.close-modal');

    if (quoteBtn && modal) {
        quoteBtn.addEventListener('click', () => {
            modal.style.display = 'block';
        });

        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        window.addEventListener('click', (e) => {
            if (e.target == modal) {
                modal.style.display = 'none';
            }
        });
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close others
            faqItems.forEach(i => {
                if (i !== item) i.classList.remove('active');
            });
            item.classList.toggle('active');
        });
    });

    // Video Vault Playlist Logic
    const playlistItems = document.querySelectorAll('.playlist-item');
    const mainPlayer = document.getElementById('main-video-player');

    function loadVideo(videoId) {
        // Adding origin parameter helps fix Error 153 and permission issues
        const origin = window.location.origin === 'null' ? '' : `&origin=${window.location.origin}`;
        mainPlayer.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&rel=0&enablejsapi=1${origin}`;
    }

    if (playlistItems.length && mainPlayer) {
        // Note: Auto-loading removed here because the HTML src handles the initial state.
        // This prevents double-loading or configuration errors on first load.

        playlistItems.forEach(item => {
            item.addEventListener('click', () => {
                const videoId = item.getAttribute('data-video-id');
                if (!videoId) return;

                loadVideo(videoId);

                playlistItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
            });
        });
    }

    // Comparison Tabs Logic
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-tab');

            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            document.getElementById(target).classList.add('active');
        });
    });

    // Testimonials Slider Logic
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.testimonial-dots span');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(s => s.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));

        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }

    if (dots.length) {
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => showSlide(index));
        });

        // Auto-advance testimonials
        setInterval(() => {
            let next = (currentSlide + 1) % slides.length;
            showSlide(next);
        }, 6000);
    }

});