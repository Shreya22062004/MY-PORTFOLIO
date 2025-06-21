document.addEventListener('DOMContentLoaded', () => {
    // Typed.js initialization
    if (document.querySelector(".text")) {
        var typed = new Typed(".text", {
            strings: ["Web Developer", "App Developer", "AI Developer", "Learner", "CSE Student"], // Shortened for brevity
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
            if (pageYOffset >= sectionTop - (document.querySelector('.header').offsetHeight + 50)) { // Adjusted offset
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
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        const form = e.target;
        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const phone = form.phone ? form.phone.value.trim() : "";
        const subject = form.subject.value.trim();
        const message = form.message.value.trim();

        // Validation
        let errorMsg = "";
        if (!name || !email || !subject || !message) {
            errorMsg = "Please fill in all required fields.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errorMsg = "Please enter a valid email address.";
        } else if (phone && !/^\d{10}$/.test(phone)) {
            errorMsg = "Please enter a valid 10-digit mobile number (digits only).";
        }

        // Show error if any and prevent submission
        let formMessage = document.getElementById('formMessage');
        if (!formMessage) {
            formMessage = document.createElement('div');
            formMessage.id = 'formMessage';
            formMessage.className = 'form-message';
            form.appendChild(formMessage);
        }
        if (errorMsg) {
            e.preventDefault();
            formMessage.textContent = errorMsg;
            formMessage.style.color = "#e53935";
            return;
        }

        // Save to localStorage
        const formData = {
            name,
            email,
            phone,
            subject,
            message,
            timestamp: new Date().toISOString()
        };
        let responses = JSON.parse(localStorage.getItem('contactResponses') || '[]');
        responses.push(formData);
        localStorage.setItem('contactResponses', JSON.stringify(responses));

        formMessage.textContent = "Thank you! Your message has been sent.";
        formMessage.style.color = "#0077cc";

        // Optionally clear the form
        // form.reset();

        // Update admin modal if open
        if (document.getElementById('responsesSection') &&
            document.getElementById('responsesSection').style.display === 'block') {
            showResponses();
        }
        // Let Formspree handle actual submission
    });
}


document.addEventListener('DOMContentLoaded', function () {
    // Modal open/close
    const openBtn = document.getElementById('openAdminModal');
    const modal = document.getElementById('adminModal');
    const closeBtn = document.getElementById('closeAdminModal');
    const adminLoginSection = document.getElementById('adminLoginSection');
    const responsesSection = document.getElementById('responsesSection');
    const adminLoginBtn = document.getElementById('adminLoginBtn');
    const adminLogoutBtn = document.getElementById('adminLogoutBtn');

    // Open modal
    openBtn.addEventListener('click', () => {
        modal.classList.add('active');
        adminLoginSection.style.display = 'block';
        responsesSection.style.display = 'none';
        document.getElementById('adminPassword').value = '';
    });

    // Close modal
    closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    window.addEventListener('keydown', (e) => {
        if (e.key === "Escape") modal.classList.remove('active');
    });
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
    });

    // Admin login logic
    adminLoginBtn.addEventListener('click', function () {
        const password = document.getElementById('adminPassword').value.trim();
        if (password === 'admin123') { // <-- Set your password here
            adminLoginSection.style.display = 'none';
            responsesSection.style.display = 'block';
            showResponses();
        } else {
            alert('Incorrect password');
        }
    });

    // Admin logout
    adminLogoutBtn.addEventListener('click', function () {
        adminLoginSection.style.display = 'block';
        responsesSection.style.display = 'none';
        document.getElementById('adminPassword').value = '';
    });

    // Show responses
    function showResponses() {
        const responses = JSON.parse(localStorage.getItem('contactResponses') || '[]');
        const list = document.getElementById('responsesList');
        if (responses.length === 0) {
            list.innerHTML = '<p>No messages received yet.</p>';
            return;
        }
        list.innerHTML = responses.map(r => `
      <div class="response">
        <strong>${r.name}</strong> (${r.email})<br>
        <em>${new Date(r.timestamp).toLocaleString()}</em><br>
        <p>${r.message}</p>
      </div>
    `).join('');
    }
});

// Theme Toggle Logic

document.addEventListener('DOMContentLoaded', function () {
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    if (!themeToggleBtn) return; // Safety check

    // Load saved theme preference
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-theme');
        themeToggleBtn.textContent = '🌞';
    } else {
        document.body.classList.remove('light-theme');
        themeToggleBtn.textContent = '🌙';
    }

    themeToggleBtn.onclick = function () {
        document.body.classList.toggle('light-theme');
        const isLight = document.body.classList.contains('light-theme');
        themeToggleBtn.textContent = isLight ? '🌞' : '🌙';
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    };
});

document.addEventListener('DOMContentLoaded', function () {
    // Resume Dropdown Logic
    const resumeBtn = document.getElementById('resumeOptionsBtn');
    const resumeDropdown = document.getElementById('resumeDropdown');
    const resumeDownload = document.getElementById('resumeDownload');
    const resumeOpen = document.getElementById('resumeOpen');
    // Toggle dropdown on resume button click
    resumeBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        resumeDropdown.style.display = resumeDropdown.style.display === 'flex' ? 'none' : 'flex';
    });
    // Hide dropdown when clicking outside
    document.addEventListener('click', function (e) {
        if (resumeDropdown.style.display === 'flex') {
            resumeDropdown.style.display = 'none';
        }
    });
    // Prevent dropdown from closing when clicking inside
    resumeDropdown.addEventListener('click', function (e) {
        e.stopPropagation();
    });
    // Download resume
    resumeDownload.addEventListener('click', function () {
        const link = document.createElement('a');
        link.href = 'S J Shreya Resume Updated.pdf'; // Update path if needed
        link.download = 'S J Shreya Resume Updated.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        resumeDropdown.style.display = 'none';
    });
    // Open resume in new tab
    resumeOpen.addEventListener('click', function () {
        window.open('S J Shreya Resume Updated.pdf', '_blank');
        resumeDropdown.style.display = 'none';
    });
});
