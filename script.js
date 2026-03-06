/*!
* Start Bootstrap - Creative v7.0.7 (https://startbootstrap.com/theme/creative)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-creative/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-scrolled');
            navbarCollapsible.classList.remove('bg-white');
            navbarCollapsible.classList.add('navbar-dark');
            navbarCollapsible.classList.remove('navbar-light');
        } else {
            navbarCollapsible.classList.add('navbar-scrolled');
            navbarCollapsible.classList.add('bg-white');
            navbarCollapsible.classList.remove('navbar-dark');
            navbarCollapsible.classList.add('navbar-light');
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    } else {
        // Fallback: If AOS fails to load, make sure content is visible
        console.warn('AOS library not loaded. Falling back to default visibility.');
        document.querySelectorAll('[data-aos]').forEach(el => {
            el.removeAttribute('data-aos');
        });
    }

    // Form validation and handling
    const contactForm = document.getElementById('contactForm');
    const feedbackDiv = document.getElementById('formFeedback');

    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();
            event.stopPropagation();

            if (contactForm.checkValidity()) {
                const submitButton = contactForm.querySelector('button[type="submit"]');
                const originalBtnText = submitButton.innerHTML;
                
                // Disable button and show loading state
                submitButton.disabled = true;
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
                feedbackDiv.innerHTML = '';

                const formData = new FormData(contactForm);

                fetch('submit_form.php', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest'
                    }
                })
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'success') {
                        feedbackDiv.innerHTML = `<div class="alert alert-success" role="alert"><i class="fas fa-check-circle me-2"></i>${data.message || 'Message sent successfully!'}</div>`;
                        contactForm.reset();
                        contactForm.classList.remove('was-validated');
                    } else {
                        feedbackDiv.innerHTML = `<div class="alert alert-danger" role="alert"><i class="fas fa-exclamation-circle me-2"></i>${data.message || 'An error occurred.'}</div>`;
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    feedbackDiv.innerHTML = `<div class="alert alert-danger" role="alert"><i class="fas fa-exclamation-triangle me-2"></i>Network error. Please try again later.</div>`;
                })
                .finally(() => {
                    // Restore button state
                    submitButton.disabled = false;
                    submitButton.innerHTML = originalBtnText;
                });
            }

            contactForm.classList.add('was-validated');
        }, false);
    }

    // Check for URL parameters to show feedback
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');
    const message = urlParams.get('message');

    if (status && feedbackDiv) {
        if (status === 'success') {
            feedbackDiv.innerHTML = `<div class="alert alert-success" role="alert">Message sent successfully! We will get back to you soon.</div>`;
            if (contactForm) contactForm.reset();
        } else if (status === 'error') {
            const errorMsg = message ? decodeURIComponent(message) : 'An error occurred. Please try again.';
            feedbackDiv.innerHTML = `<div class="alert alert-danger" role="alert">${errorMsg}</div>`;
        }
        
        // Clean URL
        window.history.replaceState({}, document.title, window.location.pathname);
    }

});
