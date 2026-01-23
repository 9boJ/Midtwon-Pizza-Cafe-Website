async function loadContactInfo() {
    try {
        // Fetches from your new standalone JSON file
        const response = await fetch('json/contact.json');
        const data = await response.json();
        const contactContainer = document.getElementById('contact-container');

        if (contactContainer) {
            contactContainer.innerHTML = `
                <div class="contact-info">
                    <p><strong>Address:</strong> ${data.address}</p>
                    <p><strong>Phone:</strong> <a href="tel:${data.phone.replace(/\s+/g, '')}">${data.phone}</a></p>
                    <p><strong>Hours:</strong> ${data.hours}</p>
                </div>
                <div class="social-media">
                    <a href="${data.facebook_url}" target="_blank" class="fb-button">
                        Find us on Facebook
                    </a>
                </div>
            `;
        }
    } catch (error) {
        console.error('Error loading contact details:', error);
    }
}

// Initialize when the script loads
loadContactInfo();