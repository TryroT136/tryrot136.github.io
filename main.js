document.addEventListener('DOMContentLoaded', () => {

    const escapeRegExp = (string) => {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    };

    // --- PART 1: PROJECT CARD GENERATOR ---
    const projectContainer = document.getElementById('project-container');
    
    if (projectContainer) {
        const projectElements = document.querySelectorAll('project-card');

        if (projectElements.length === 0) {
            const placeholderHtml = `<div class="no-projects-placeholder"><i class="fa-solid fa-folder-open"></i><h3>Nothing Here Yet</h3><p>This category is empty for now. Check back later for new projects!</p></div>`;
            projectContainer.innerHTML = placeholderHtml;
        } else {
            const pageDefaultIcon = projectContainer.dataset.defaultIcon || 'fa-solid fa-star';
            const iconMap = {
                'python': 'fa-brands fa-python',
                'block': 'fa-solid fa-cube',
                'minecraft': 'fa-solid fa-cube',
                'datapack': 'fa-solid fa-box-open',
                'star': 'fa-solid fa-star',
                'other': 'fa-solid fa-star',
                'config': 'fa-solid fa-gear',
                'code': 'fa-solid fa-file-code',
                'game': 'fa-solid fa-gamepad',
                'shader': 'fa-solid fa-wand-magic-sparkles'
            };

            projectElements.forEach(el => {
                const name = el.getAttribute('name') || 'Unnamed Project';
                const description = el.innerHTML.trim();
                const imgSrc = el.getAttribute('image-src');
                const iconType = el.getAttribute('icon-type');
                
                let buttons = [];
                try { buttons = JSON.parse(el.getAttribute('buttons') || '[]'); } catch (e) { console.error('Invalid JSON for buttons on project:', name, e); }
                const buttonHtml = buttons.map((btn, index) => {
                    let isSecondary = typeof btn.secondary === 'boolean' ? btn.secondary : index > 0;
                    const buttonClass = `button ${isSecondary ? 'secondary' : ''}`;
                    return `<a href="${btn.href}" class="${buttonClass}" target="_blank">${btn.text}</a>`;
                }).join('');

                let iconHtml = '';
                if (imgSrc) {
                    iconHtml = `<img src="${imgSrc}" class="project-image" alt="${name} icon">`;
                } else {
                    // --- NEW ICON LOGIC ---
                    let iconClass = pageDefaultIcon; // Start with the default
                    if (iconType) {
                        if (iconType.startsWith('fa-')) {
                            iconClass = iconType; // Use direct Font Awesome class
                        } else if (iconMap[iconType]) {
                            iconClass = iconMap[iconType]; // Use a preset from the map
                        }
                    }
                    iconHtml = `<i class="${iconClass}"></i>`;
                    // --- END NEW ICON LOGIC ---
                }

                const cardHtml = `<div class="project-card searchable-card"><div class="project-icon">${iconHtml}</div><div class="project-content"><h3>${name}</h3><p>${description}</p><div class="project-links">${buttonHtml}</div></div></div>`;
                el.outerHTML = cardHtml;
            });
        }
    }

    // --- PART 2: SEARCH FUNCTIONALITY ---
    const searchInput = document.getElementById('page-search');
    const clearButton = document.getElementById('clear-search-btn');

    if (searchInput) {
        const searchableCards = document.querySelectorAll('.searchable-card');

        const performSearch = () => {
            const filter = searchInput.value; // Get the raw filter text
            const filterLower = filter.toLowerCase().trim();
            clearButton.style.display = filter ? 'block' : 'none';

            searchableCards.forEach(card => {
                const nameElement = card.querySelector('h3');
                const descriptionElement = card.querySelector('p');
                const linkSpanElement = card.querySelector('span'); 

                let searchableText = '';
                let elementsToHighlight = [];

                if (nameElement) {
                    searchableText = nameElement.textContent.toLowerCase();
                    if (descriptionElement) {
                        searchableText += ' ' + descriptionElement.textContent.toLowerCase();
                    }
                    elementsToHighlight = [nameElement, descriptionElement];
                } else if (linkSpanElement) {
                    searchableText = linkSpanElement.textContent.toLowerCase();
                    elementsToHighlight = [linkSpanElement];
                }

                elementsToHighlight.forEach(el => {
                    if (el) el.innerHTML = el.textContent;
                });

                if (filterLower === '' || searchableText.includes(filterLower)) {
                    card.style.display = '';

                    if (filterLower !== '') {
                        // --- THIS IS THE FIX ---
                        // Use the escaped filter to create a safe regular expression.
                        const escapedFilter = escapeRegExp(filter);
                        const regex = new RegExp(escapedFilter, 'gi');
                        // --- END FIX ---
                        
                        elementsToHighlight.forEach(el => {
                            if (el) el.innerHTML = el.textContent.replace(regex, match => `<mark>${match}</mark>`);
                        });
                    }
                } else {
                    card.style.display = 'none';
                }
            });
        };

        searchInput.addEventListener('input', performSearch);
        clearButton.addEventListener('click', () => {
            searchInput.value = '';
            performSearch();
            searchInput.focus();
        });
    }
});