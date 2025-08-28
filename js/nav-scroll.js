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
            btn.addEventListener('click', function () {
                const to = this.getAttribute('href');
                if (to && to !== '#') {
                    window.location.href = to;
                }
            });
        }
    });

    // Ensure Login button opens login page on all pages
    const loginBtn = document.querySelector('.login-btn');
    if (loginBtn) {
        if (!loginBtn.getAttribute('href') || loginBtn.getAttribute('href') === '#') {
            loginBtn.setAttribute('href', 'login.html');
        }
        // Fallback redirect if some script prevents default
        loginBtn.addEventListener('click', function (e) {
            if (!this.getAttribute('href')) {
                e.preventDefault();
                window.location.href = 'login.html';
            }
        });
    }

    // ===== Global responsive navbar (works across pages) =====
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.navbar .nav-links');

    // Apply top padding to body on mobile so content isn't hidden behind fixed navbar
    function applyNavOffset() {
        if (navbar && window.matchMedia('(max-width: 992px)').matches) {
            document.body.style.paddingTop = navbar.offsetHeight + 'px';
        } else {
            document.body.style.paddingTop = '';
        }
    }
    applyNavOffset();
    window.addEventListener('resize', applyNavOffset);

    // Inject hamburger toggle if not present
    if (navbar && navLinks && !navbar.querySelector('.nav-toggle')) {
        const toggle = document.createElement('button');
        toggle.className = 'nav-toggle';
        toggle.setAttribute('aria-label', 'Toggle menu');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-controls', 'primaryNav');
        // Bars
        for (let i = 0; i < 3; i++) {
            const bar = document.createElement('span');
            bar.className = 'bar';
            toggle.appendChild(bar);
        }
        // Ensure nav list has an id
        if (!navLinks.id) navLinks.id = 'primaryNav';
        // Place toggle before nav-links
        navLinks.parentNode.insertBefore(toggle, navLinks);
    }

    const toggleBtn = document.querySelector('.navbar .nav-toggle');
    if (toggleBtn && navbar) {
        toggleBtn.addEventListener('click', function () {
            const open = navbar.classList.toggle('nav-open');
            toggleBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
    }

    // Mobile dropdown tap behavior
    function isMobile() { return window.matchMedia('(max-width: 992px)').matches; }

    if (navLinks) {
        // Mobile behavior: first tap opens submenu; second tap navigates (if href is not '#')
        navLinks.querySelectorAll('.dropdown > .dropbtn').forEach(btn => {
            btn.addEventListener('click', function (e) {
                if (!isMobile()) return; // Desktop: default behavior
                const li = this.parentElement;
                const href = (this.getAttribute('href') || '').trim();
                const alreadyOpen = li.classList.contains('open');

                // Close other open dropdowns
                navLinks.querySelectorAll('.dropdown.open').forEach(d => { if (d !== li) d.classList.remove('open'); });

                if (!alreadyOpen) {
                    // First tap: open submenu
                    e.preventDefault();
                    li.classList.add('open');
                } else {
                    // Second tap: navigate if a valid href exists; otherwise toggle close
                    if (!href || href === '#') {
                        e.preventDefault();
                        li.classList.remove('open');
                    }
                    // else: allow navigation
                }
            });
        });

        // Close menu after selecting any link
        navLinks.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', function () {
                if (isMobile() && navbar) {
                    navbar.classList.remove('nav-open');
                    if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }
});