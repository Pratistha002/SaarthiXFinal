document.addEventListener('DOMContentLoaded', function() {
    // Get all dropdown buttons
    const dropdownBtns = document.querySelectorAll('.dropdown .dropbtn');
    
    // Add click event listeners to each dropdown button
    dropdownBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Check if the user clicked directly on the button (not a child element)
            if (e.target === this) {
                // If the button has an href attribute and it's not "#", navigate to that URL
                const href = this.getAttribute('href');
                if (href && href !== '#') {
                    window.location.href = href;
                }
            }
        });
        
        // Add mouseover event to show dropdown
        btn.parentElement.addEventListener('mouseover', function() {
            const dropdown = this.querySelector('.dropdown-content');
            if (dropdown) {
                dropdown.style.display = 'flex';
            }
        });
        
        // Add mouseout event to hide dropdown
        btn.parentElement.addEventListener('mouseout', function() {
            const dropdown = this.querySelector('.dropdown-content');
            if (dropdown) {
                dropdown.style.display = '';
            }
        });
    });
});