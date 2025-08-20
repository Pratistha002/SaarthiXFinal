// Hide/show navbar on scroll across pages
(function () {
    let lastScrollY = window.pageYOffset;
    let ticking = false;
    const nav = document.querySelector('nav');
    if (!nav) return;

    // Show nav immediately when mouse enters the nav area
    nav.addEventListener('mouseenter', () => {
        nav.classList.remove('nav-hidden');
    });

    function onScroll() {
        const currentY = window.pageYOffset;
        const delta = currentY - lastScrollY;

        // Ignore tiny scrolls to prevent jitter
        const threshold = 5;
        if (Math.abs(delta) > threshold) {
            if (currentY > 80 && delta > 0) {
                // Scrolling down
                nav.classList.add('nav-hidden');
            } else {
                // Scrolling up or near top
                nav.classList.remove('nav-hidden');
            }
            lastScrollY = currentY;
        }
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(onScroll);
            ticking = true;
        }
    }, { passive: true });

    // Ensure shown at load
    nav.classList.remove('nav-hidden');
})();