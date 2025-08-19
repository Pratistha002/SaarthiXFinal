document.addEventListener('DOMContentLoaded', function() {
    // Get all dropdown buttons
    const dropdownBtns = document.querySelectorAll('.dropdown .dropbtn');
    
    // Ensure clicking the button always navigates to its href
    dropdownBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                // Force navigation to avoid any interference
                window.location.href = href;
            }
        });
        
        // Show dropdown on hover
        btn.parentElement.addEventListener('mouseover', function() {
            const dropdown = this.querySelector('.dropdown-content');
            if (dropdown) {
                dropdown.style.display = 'flex';
            }
        });
        
        // Hide dropdown when not hovered
        btn.parentElement.addEventListener('mouseout', function() {
            const dropdown = this.querySelector('.dropdown-content');
            if (dropdown) {
                dropdown.style.display = '';
            }
        });
    });
});
