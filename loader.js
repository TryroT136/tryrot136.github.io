// This is the updated content for loader.js
document.addEventListener('DOMContentLoaded', () => {
    const headerPlaceholder = document.querySelector('header[data-include]');
    if (headerPlaceholder) {
        const url = headerPlaceholder.getAttribute('data-include');
        fetch(url)
            .then(response => response.text())
            .then(data => {
                headerPlaceholder.innerHTML = data;

                // --- THIS IS THE NEW LOGIC ---
                // Check if the placeholder has the 'data-search-disabled' attribute.
                if (headerPlaceholder.dataset.searchDisabled === 'true') {
                    const searchBar = headerPlaceholder.querySelector('.search-bar');
                    if (searchBar) {
                        searchBar.remove(); // If the attribute is found, remove the search bar.
                    }
                }
                // --- END NEW LOGIC ---

                setActiveNavLink();
            });
    }

    function setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('header nav a');
        
        navLinks.forEach(link => link.classList.remove('active'));

        let linkFound = false;

        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href');
            if (linkPage === currentPage) {
                link.classList.add('active');

                if (link.closest('.dropdown-content')) {
                    const dropdownBtn = link.closest('.dropdown').querySelector('.dropbtn');
                    if (dropdownBtn) {
                        dropdownBtn.classList.add('active');
                    }
                }
                linkFound = true;
            }
        });

        if (!linkFound && currentPage === 'index.html') {
             document.querySelector('header nav a[href="index.html"]').classList.add('active');
        }
    }
});