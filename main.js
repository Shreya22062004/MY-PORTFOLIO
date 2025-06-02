document.addEventListener('DOMContentLoaded', () => {
    // Typed.js initialization
    if (document.querySelector(".text")) {
        var typed = new Typed(".text", {
            strings: ["Web Developer", "App Developer", "AI Developer", "Learner" , "CSE Student"], // Shortened for brevity
            typeSpeed: 70,
            backSpeed: 50, // Slightly faster backspeed
            backDelay: 1200, // Longer pause
            loop: true
        });
    }

    // Active Navbar Link Scrolling & Smooth Scroll
    const navLinks = document.querySelectorAll('.navbar a');
    const sections = document.querySelectorAll('section[id]'); // Ensure sections have IDs

    function activateNavLink() {
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - (document.querySelector('.header').offsetHeight + 50) ) { // Adjusted offset
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSectionId) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', activateNavLink);
    activateNavLink(); // Initial check

    // Smooth scroll for navbar links
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    const headerOffset = document.querySelector('.header').offsetHeight;
                    const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = elementPosition - headerOffset - 10; // Extra 10px buffer

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Animate skill bars on scroll
    const skillProgressBars = document.querySelectorAll('.progress-line span');
    const radialPaths = document.querySelectorAll('.radial-bars .path');
    const skillsSection = document.getElementById('skill');

    function animateSkillsOnScroll() {
        if (!skillsSection) return;

        const skillsSectionTop = skillsSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (skillsSectionTop < windowHeight * 0.8) { // Trigger when 80% of section is visible
            skillProgressBars.forEach(bar => {
                const percentage = bar.parentElement.dataset.percent;
                if (percentage) {
                    bar.style.width = percentage;
                }
            });
            radialPaths.forEach(path => {
                path.classList.add('animate'); // Triggers CSS animation
            });
            // Optional: remove event listener after animation to save resources
            // window.removeEventListener('scroll', animateSkillsOnScroll);
        }
    }

    window.addEventListener('scroll', animateSkillsOnScroll);
    animateSkillsOnScroll(); // Initial check in case skills are already in view
});

document.addEventListener('DOMContentLoaded', () => {
    // --- Certificate Overlay Functionality ---
    const foldedPaperPreviews = document.querySelectorAll('.certificate-preview.folded-paper');
    const closeButtons = document.querySelectorAll('.close-overlay');

    foldedPaperPreviews.forEach(preview => {
        preview.addEventListener('click', () => {
            const targetId = preview.dataset.target; // Get the ID from data-target attribute
            const overlay = document.getElementById(`cert-${targetId}`); // Find the corresponding overlay
            if (overlay) {
                overlay.classList.add('active'); // Show the overlay
                document.body.style.overflow = 'hidden'; // Prevent scrolling background
            }
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const overlay = button.closest('.certificate-image-overlay'); // Find the parent overlay
            if (overlay) {
                overlay.classList.remove('active'); // Hide the overlay
                document.body.style.overflow = ''; // Restore scrolling
            }
        });
    });

    // Optional: Close overlay if user clicks outside the image (on the dark background)
    document.querySelectorAll('.certificate-image-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) { // Check if the click was directly on the overlay itself
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Optional: Close overlay with ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && document.querySelector('.certificate-image-overlay.active')) {
            document.querySelector('.certificate-image-overlay.active').classList.remove('active');
            document.body.style.overflow = '';
        }
    });


    // --- Animate on Scroll Functionality ---
    const animateOnScrollElements = document.querySelectorAll('.animate-on-scroll');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // element is 10% visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, observerOptions);

    animateOnScrollElements.forEach(el => {
        observer.observe(el);
    });
});

