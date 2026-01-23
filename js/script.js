async function loadMenu() {
    try {
        // Updated path to match your folder structure
        const response = await fetch('json/menu.json');
        const data = await response.json();
        const container = document.getElementById('menu-container');

        // Clear container in case of re-renders
        container.innerHTML = '';

        // Loop through each category in the JSON (pizzas, burgers, etc.)
        for (const category in data) {
            // Skip the contact_info object so it doesn't try to render as a menu section
            if (category === 'contact_info') continue;

            const section = document.createElement('section');
            section.className = 'menu-category';

            // Create a Heading for the category
            const title = document.createElement('h2');
            title.textContent = category.charAt(0).toUpperCase() + category.slice(1);
            section.appendChild(title);

            const grid = document.createElement('div');
            grid.className = 'menu-grid';

            data[category].forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'menu-card';

                // Handle items with multiple prices (Pizzas) vs single prices (Burgers/Sides)
                let priceHTML = '';
                if (typeof item.prices === 'object') {
                    // Creates a small list for Small, Medium, Large prices
                    priceHTML = '<div class="price-list">';
                    for (const [size, price] of Object.entries(item.prices)) {
                        priceHTML += `<span><strong>${size}:</strong> ${price}</span><br>`;
                    }
                    priceHTML += '</div>';
                } else {
                    priceHTML = `<span class="price">${item.price}</span>`;
                }

                itemDiv.innerHTML = `
                    <h3>${item.name}</h3>
                    <p>${item.ingredients ? `<em>${item.ingredients}</em>` : ''}</p>
                    ${priceHTML}
                `;
                grid.appendChild(itemDiv);
            });

            section.appendChild(grid);
            container.appendChild(section);
        }
    } catch (error) {
        console.error('Error loading the menu:', error);
        document.getElementById('menu-container').innerHTML = '<p>Unable to load menu at this time.</p>';
    }
}

loadMenu();