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

// Fallback: ensure top-level buttons have valid hrefs across all pages
document.addEventListener('DOMContentLoaded', function () {
    const topBtns = document.querySelectorAll('.navbar .dropdown > .dropbtn');
    topBtns.forEach(btn => {
        const label = (btn.textContent || '').trim().toLowerCase();
        const current = btn.getAttribute('href');
        // Mark Resources parent for styling and logic
        if (label === 'resources' && btn.parentElement && !btn.parentElement.classList.contains('resources')) {
            btn.parentElement.classList.add('resources');
        }
        if (!current || current === '#') {
            if (label === 'students') btn.setAttribute('href', 'students.html');
            if (label === 'institute') btn.setAttribute('href', 'institute.html');
            if (label === 'industry') btn.setAttribute('href', 'industry.html');
            if (label === 'resources') btn.setAttribute('href', 'blogs.html'); // landing for resources
        }
        // Ensure navigation in case other handlers prevent default (desktop only)
        btn.addEventListener('click', function () {
            const to = this.getAttribute('href');
            if (to && to !== '#') {
                // On desktop allow default; on mobile separate handler manages navigation
                if (window.matchMedia('(min-width: 993px)').matches) {
                    window.location.href = to;
                }
            }
        });
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

    // Inject a floating circular Back button at bottom (except on index.html)
    const currentPage = (window.location.pathname.split('/').pop() || '').toLowerCase();
    const isHome = currentPage === '' || currentPage === 'index.html';
    if (!isHome && !document.querySelector('.floating-back-btn')) {
        const shouldShowBack = (window.history.length > 1) || (document.referrer && document.referrer !== '');
        if (shouldShowBack) {
            const btn = document.createElement('button');
            btn.className = 'floating-back-btn';
            btn.type = 'button';
            btn.setAttribute('aria-label', 'Go back to previous page');
            btn.innerHTML = '<span class="chev" aria-hidden="true"></span>';
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                if (window.history.length > 1) {
                    window.history.back();
                    return;
                }
                if (document.referrer) {
                    try {
                        const ref = new URL(document.referrer);
                        if (ref.origin === window.location.origin) {
                            window.location.href = document.referrer;
                            return;
                        }
                    } catch (_) { }
                }
                window.location.href = 'index.html';
            });
            document.body.appendChild(btn);
        }
    }

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
        // Mobile behavior:
        // - Students/Institute/Industry navigate directly (no submenu)
        // - Resources toggles its submenu (second-level) with Jobs and Blogs
        navLinks.querySelectorAll('.dropdown > .dropbtn').forEach(btn => {
            btn.addEventListener('click', function (e) {
                if (!isMobile()) return; // Desktop: default behavior
                const li = this.parentElement;
                const label = (this.textContent || '').trim().toLowerCase();
                const href = (this.getAttribute('href') || '').trim();

                if (label === 'resources') {
                    // Toggle only Resources submenu
                    e.preventDefault();
                    // Close other dropdowns
                    navLinks.querySelectorAll('.dropdown.open').forEach(d => { if (d !== li) d.classList.remove('open'); });
                    li.classList.toggle('open');
                    return;
                }

                // For other top-level buttons: navigate directly
                if (!href || href === '#') {
                    e.preventDefault();
                } else {
                    e.preventDefault();
                    window.location.href = href;
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