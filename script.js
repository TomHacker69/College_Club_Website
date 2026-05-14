// Mobile navigation menu
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        const isOpen = navMenu.classList.contains('open');
        menuToggle.setAttribute('aria-expanded', isOpen);
        menuToggle.textContent = isOpen ? '✕' : '☰';
    });
}

// Back to top button
const backToTop = document.getElementById('backToTop');

if (backToTop) {
    window.addEventListener('scroll', () => {
        backToTop.classList.toggle('show', window.scrollY > 250);
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Reveal animation while scrolling
const revealElements = document.querySelectorAll('.reveal');

function revealOnScroll() {
    revealElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight - 80) {
            element.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Event filtering on Events page
const filterButtons = document.querySelectorAll('.filter-btn');
const eventCards = document.querySelectorAll('.event-card');

filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
        filterButtons.forEach((btn) => btn.classList.remove('active'));
        button.classList.add('active');

        const selectedFilter = button.dataset.filter;

        eventCards.forEach((card) => {
            const category = card.dataset.category;
            const shouldShow = selectedFilter === 'all' || selectedFilter === category;
            card.style.display = shouldShow ? 'block' : 'none';
        });
    });
});

// Join form validation
const joinForm = document.getElementById('joinForm');
const formMessage = document.getElementById('formMessage');

function showError(input, message) {
    const formGroup = input.closest('.form-group');
    const errorMessage = formGroup.querySelector('.error-message');
    errorMessage.textContent = message;
}

function clearError(input) {
    const formGroup = input.closest('.form-group');
    const errorMessage = formGroup.querySelector('.error-message');
    errorMessage.textContent = '';
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

if (joinForm) {
    joinForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('name');
        const branch = document.getElementById('branch');
        const year = document.getElementById('year');
        const email = document.getElementById('email');
        let isValid = true;

        [name, branch, year, email].forEach(clearError);
        formMessage.textContent = '';

        if (name.value.trim().length < 3) {
            showError(name, 'Please enter a valid name with at least 3 characters.');
            isValid = false;
        }

        if (branch.value.trim().length < 2) {
            showError(branch, 'Please enter your branch.');
            isValid = false;
        }

        if (year.value === '') {
            showError(year, 'Please select your year.');
            isValid = false;
        }

        if (!isValidEmail(email.value.trim())) {
            showError(email, 'Please enter a valid email address.');
            isValid = false;
        }

        if (isValid) {
            const memberName = name.value.trim();
            formMessage.textContent = `Thank you, ${memberName}! Your application has been submitted successfully.`;
            joinForm.reset();
        }
    });
}
