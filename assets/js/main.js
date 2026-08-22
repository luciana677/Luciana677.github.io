// Main navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile menu toggle (if you add one later)
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            const nav = document.querySelector('nav ul');
            nav.classList.toggle('active');
        });
    }

    // Add active class to current navigation item
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav ul li a').forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop() || 'index.html';
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });

    // Project page specific functionality
    if (window.location.pathname.includes('projects/')) {
        // Add any project-specific JavaScript here
        console.log('Project page loaded');
    }
});

// Function to handle Power BI dashboard embedding
function embedPowerBIDashboard() {
    // This would be replaced with actual Power BI embedding code
    console.log('Power BI dashboard embedded');
}

// Initialize any additional components
document.addEventListener('DOMContentLoaded', embedPowerBIDashboard);

// =================================
// CERTIFICATIONS CAROUSEL
// =================================
document.addEventListener('DOMContentLoaded', function () {

    const certTrack = document.querySelector('.cert-track');
    if (!certTrack) return; // certifications section not present, skip safely

    const certCards = document.querySelectorAll('.cert-card');
    const certPrev = document.querySelector('.cert-prev');
    const certNext = document.querySelector('.cert-next');
    const certDots = document.querySelectorAll('.cert-dot');

    let certCurrentIndex = 0;

    function certCardsPerView() {
        return window.innerWidth >= 768 ? 2 : 1;
    }

    function certMaxIndex() {
        return Math.max(certCards.length - certCardsPerView(), 0);
    }

    function certUpdateCarousel() {
        const maxIndex = certMaxIndex();

        if (certCurrentIndex > maxIndex) certCurrentIndex = maxIndex;
        if (certCurrentIndex < 0) certCurrentIndex = 0;

        const movementPercent = certCurrentIndex * (100 / certCardsPerView());
        certTrack.style.transform = `translateX(-${movementPercent}%)`;

        certDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === certCurrentIndex);
        });
    }

    certNext.addEventListener('click', function () {
        const maxIndex = certMaxIndex();
        certCurrentIndex = certCurrentIndex < maxIndex ? certCurrentIndex + 1 : 0;
        certUpdateCarousel();
    });

    certPrev.addEventListener('click', function () {
        const maxIndex = certMaxIndex();
        certCurrentIndex = certCurrentIndex > 0 ? certCurrentIndex - 1 : maxIndex;
        certUpdateCarousel();
    });

    certDots.forEach((dot, index) => {
        dot.addEventListener('click', function () {
            certCurrentIndex = index;
            certUpdateCarousel();
        });
    });

    window.addEventListener('resize', certUpdateCarousel);

    certUpdateCarousel();
});
