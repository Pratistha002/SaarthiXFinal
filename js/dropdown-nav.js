document.addEventListener('DOMContentLoaded', function() {
    // Make top-level dropdown buttons clickable for navigation, while preserving hover dropdowns
    const dropdownBtns = document.querySelectorAll('.dropdown > .dropbtn');

    dropdownBtns.forEach(btn => {
        // If href is missing or '#', set sensible defaults based on label
        const label = btn.textContent.trim().toLowerCase();
        const href = btn.getAttribute('href');
        if (!href || href === '#') {
            if (label === 'students') btn.setAttribute('href', 'students.html');
            if (label === 'institute') btn.setAttribute('href', 'institute.html');
            if (label === 'industry') btn.setAttribute('href', 'industry.html');
        }

        // Navigate on click anywhere on the button
        btn.addEventListener('click', function() {
            const to = this.getAttribute('href');
            if (to && to !== '#') window.location.href = to;
        });

        // Show dropdown on hover
        const parent = btn.parentElement;
        parent.addEventListener('mouseover', function() {
            const dropdown = this.querySelector('.dropdown-content');
            if (dropdown) dropdown.style.display = 'flex';
        });

        // Hide dropdown when mouse leaves
        parent.addEventListener('mouseout', function() {
            const dropdown = this.querySelector('.dropdown-content');
            if (dropdown) dropdown.style.display = '';
        });
    });
});