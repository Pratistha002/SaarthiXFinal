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

// Fallback: make 'Students' top-level button navigate on all pages that don't include dropdown-nav.js
// This ensures clicking 'Students' always goes to students.html from any page where this script is loaded.
document.addEventListener('DOMContentLoaded', function () {
    const studentBtns = document.querySelectorAll('.navbar .dropdown > .dropbtn');
    studentBtns.forEach(btn => {
        const label = (btn.textContent || '').trim().toLowerCase();
        if (label === 'students') {
            const href = btn.getAttribute('href');
            if (!href || href === '#') {
                btn.setAttribute('href', 'students.html');
            }
            btn.addEventListener('click', function (e) {
                const to = this.getAttribute('href');
                if (to && to !== '#') {
                    window.location.href = to;
                }
            });
        }
    });
});