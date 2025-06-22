document.addEventListener('DOMContentLoaded', () => {
    // Select ALL elements that have the 'data-include' attribute
    const includeElements = document.querySelectorAll('[data-include]');

    includeElements.forEach(el => {
        const url = el.getAttribute('data-include');
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
                }
                return response.text();
            })
            .then(data => {
                el.innerHTML = data;

                // --- HEADER-SPECIFIC LOGIC ---
                // Only run these functions if we just loaded the header.
                if (el.tagName.toLowerCase() === 'header') {
                    // Disable search bar if requested
                    if (el.dataset.searchDisabled === 'true') {
                        const searchBar = el.querySelector('.search-bar');
                        if (searchBar) {
                            searchBar.remove();
                        }
                    }
                    // Set the active navigation link
                    setActiveNavLink();
                }
            })
            .catch(error => console.error('Error loading file:', error));
    });

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
                    if (dropdownBtn) dropdownBtn.classList.add('active');
                }
                linkFound = true;
            }
        });

        if (!linkFound && currentPage === 'index.html') {
             document.querySelector('header nav a[href="index.html"]').classList.add('active');
        }
    }
});