document.addEventListener('DOMContentLoaded', function() {
    // Make top-level dropdown buttons clickable for navigation on desktop; mobile handled by nav-scroll.js
    const dropdownBtns = document.querySelectorAll('.dropdown > .dropbtn');

    const isDesktopPointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const isMobileScreen = () => window.matchMedia('(max-width: 992px)').matches;

    dropdownBtns.forEach(btn => {
        // If href is missing or '#', set sensible defaults based on label
        const label = btn.textContent.trim().toLowerCase();
        const href = btn.getAttribute('href');
        if (!href || href === '#') {
            if (label === 'students') btn.setAttribute('href', 'students.html');
            if (label === 'institute') btn.setAttribute('href', 'institute.html');
            if (label === 'industry') btn.setAttribute('href', 'industry.html');
        }

        // Navigate on click anywhere on the button on DESKTOP only
        btn.addEventListener('click', function(e) {
            if (isMobileScreen()) return; // allow nav-scroll.js to handle mobile (toggle dropdown)
            const to = this.getAttribute('href');
            if (to && to !== '#') window.location.href = to;
        });

        // Show/hide dropdown on hover only for desktop pointers
        if (isDesktopPointer.matches) {
            const parent = btn.parentElement;
            parent.addEventListener('mouseover', function() {
                const dropdown = this.querySelector('.dropdown-content');
                if (dropdown) dropdown.style.display = 'flex';
            });
            parent.addEventListener('mouseout', function() {
                const dropdown = this.querySelector('.dropdown-content');
                if (dropdown) dropdown.style.display = '';
            });
        }
    });
});