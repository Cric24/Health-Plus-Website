document.addEventListener('DOMContentLoaded', () => {
    // Header scroll effect
    const header = document.querySelector('header');
    const scrollThreshold = 100;

    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // GSAP animations
    gsap.registerPlugin(ScrollTrigger);

    // Hero section animations
    gsap.from('.hero h1', { opacity: 0, y: 50, duration: 1, delay: 0.5 });
    gsap.from('.hero p', { opacity: 0, y: 50, duration: 1, delay: 0.8 });
    gsap.from('.hero .cta-button', { opacity: 0, y: 50, duration: 1, delay: 1.1 });

    // Animate sections on scroll
    const animateSections = (elements, triggerElement) => {
        gsap.from(elements, {
            opacity: 0,
            y: 50,
            duration: 1,
            stagger: 0.2,
            scrollTrigger: {
                trigger: triggerElement,
                start: 'top 80%',
            },
        });
    };

    animateSections('.service-item', '.services');
    animateSections('.doctor-card', '.doctors');
    animateSections('.login-card', '.login-section');
    animateSections('.contact-content > *', '.contact');

    // Login functionality
    const loginForms = document.querySelectorAll('.login-form');
    const loginCredentials = {
        patient: { email: 'patient@example.com', password: 'patient123' },
        doctor: { email: 'doctor@example.com', password: 'doctor123' },
        admin: { email: 'admin@example.com', password: 'admin123' }
    };

    loginForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formId = form.id;
            const userType = formId.split('-')[0];
            const email = form.querySelector('input[type="email"]').value;
            const password = form.querySelector('input[type="password"]').value;

            if (email === loginCredentials[userType].email && password === loginCredentials[userType].password) {
                alert(`${userType.charAt(0).toUpperCase() + userType.slice(1)} logged in successfully!`);
                // Redirect to the respective page
                window.location.href = `${userType}.html`;
            } else {
                alert('Invalid email or password. Please try again.');
            }
        });
    });

    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message. We will get back to you soon!');
        contactForm.reset();
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            targetElement.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Appointment modal
    const modal = document.getElementById('appointment-modal');
    const btn = document.querySelector('.cta-button');
    const span = document.querySelector('.close');

    btn.onclick = () => modal.style.display = 'block';
    span.onclick = () => modal.style.display = 'none';
    window.onclick = (event) => {
        if (event.target == modal) modal.style.display = 'none';
    }

    // Appointment form submission
    const appointmentForm = document.getElementById('appointment-form');
    appointmentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for booking an appointment. We will confirm shortly!');
        appointmentForm.reset();
        modal.style.display = 'none';
    });

    // Testimonials carousel
    const testimonialsSection = document.createElement('section');
    testimonialsSection.className = 'testimonials';
    testimonialsSection.innerHTML = `
        <div class="container">
            <h2 class="section-title">What Our Patients Say</h2>
            <div class="testimonial-slider">
                <div class="testimonial-item">
                    <img src="/api/placeholder/100/100" alt="Patient 1">
                    <p>"Exceptional care and professionalism. Highly recommended!"</p>
                    <h4>John Doe</h4>
                </div>
                <div class="testimonial-item">
                    <img src="/api/placeholder/100/100" alt="Patient 2">
                    <p>"The staff is friendly and the facilities are top-notch."</p>
                    <h4>Jane Smith</h4>
                </div>
                <div class="testimonial-item">
                    <img src="/api/placeholder/100/100" alt="Patient 3">
                    <p>"I received excellent treatment and follow-up care."</p>
                    <h4>Mike Johnson</h4>
                </div>
            </div>
        </div>
    `;
    document.querySelector('.contact').insertAdjacentElement('beforebegin', testimonialsSection);

    // Initialize tiny-slider
    const slider = tns({
        container: '.testimonial-slider',
        items: 1,
        slideBy: 'page',
        autoplay: true,
        controls: false,
        nav: true,
        autoplayButtonOutput: false
    });

    // Dark mode toggle
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });

    // Chat button
    const chatButton = document.getElementById('chat-button');
    chatButton.addEventListener('click', () => {
        alert('Chat functionality coming soon!');
    });

    // Newsletter form
    const footerContent = document.querySelector('footer .container');
    const newsletterForm = document.createElement('form');
    newsletterForm.className = 'newsletter-form';
    newsletterForm.innerHTML = `
        <input type="email" placeholder="Enter your email" required>
        <button type="submit">Subscribe</button>
    `;
    footerContent.insertAdjacentElement('beforeend', newsletterForm);

    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for subscribing to our newsletter!');
        newsletterForm.reset();
    });

});
