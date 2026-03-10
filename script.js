document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize AOS (Animate on Scroll)
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });
    
    window.addEventListener('load', () => {
        AOS.refresh();
    });

    // 2. Initialize Particles.js
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#007bff" },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.2, "random": false },
                "size": { "value": 3, "random": true },
                "line_linked": { "enable": true, "distance": 150, "color": "#007bff", "opacity": 0.1, "width": 1 },
                "move": { "enable": true, "speed": 2, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
                "modes": { "grab": { "distance": 140, "line_linked": { "opacity": 1 } }, "push": { "particles_nb": 4 } }
            },
            "retina_detect": true
        });
    }

    // 3. Navbar Scroll Effect
    const mainNav = document.getElementById('mainNav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            mainNav.classList.add('navbar-scrolled');
        } else {
            mainNav.classList.remove('navbar-scrolled');
        }
    });

    // 5. Charts (Hero & Live Dashboard)
    const ctxHero = document.getElementById('heroChart');
    if (ctxHero) {
        new Chart(ctxHero, {
            type: 'line',
            data: {
                labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
                datasets: [{
                    label: 'System Efficiency',
                    data: [85, 82, 89, 92, 88, 91],
                    borderColor: '#007bff',
                    backgroundColor: 'rgba(0, 123, 255, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    x: { display: false },
                    y: { display: false }
                }
            }
        });
    }

    const ctxLive = document.getElementById('liveOeeChart');
    let liveChart;
    if (ctxLive) {
        liveChart = new Chart(ctxLive, {
            type: 'bar',
            data: {
                labels: ['Line A', 'Line B', 'Line C', 'Line D', 'Line E'],
                datasets: [{
                    label: 'OEE %',
                    data: [78, 85, 92, 81, 88],
                    backgroundColor: [
                        'rgba(0, 123, 255, 0.6)',
                        'rgba(16, 185, 129, 0.6)',
                        'rgba(0, 212, 255, 0.6)',
                        'rgba(245, 158, 11, 0.6)',
                        'rgba(139, 92, 246, 0.6)'
                    ],
                    borderRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: { beginAtZero: true, max: 100, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#64748b' } },
                    x: { grid: { display: false }, ticks: { color: '#64748b' } }
                }
            }
        });

        // Live Data Simulation
        setInterval(() => {
            // Update Chart
            liveChart.data.datasets[0].data = liveChart.data.datasets[0].data.map(val => {
                const change = (Math.random() - 0.5) * 4;
                return Math.min(100, Math.max(60, val + change));
            });
            liveChart.update('none');

            // Update Metrics
            document.getElementById('live-temp').innerText = (40 + Math.random() * 5).toFixed(1) + '°C';
            document.getElementById('live-pressure').innerText = (6 + Math.random() * 0.5).toFixed(1) + ' Bar';
            document.getElementById('live-energy').innerText = (12 + Math.random() * 1).toFixed(1) + ' kW';
        }, 2000);
    }

    // 6. Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    const feedbackDiv = document.getElementById('formFeedback');

    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();
            
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitButton.innerHTML;
            
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';

            const formData = new FormData(contactForm);

            fetch('submit_form.php', {
                method: 'POST',
                body: formData,
                headers: { 'X-Requested-With': 'XMLHttpRequest' }
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    feedbackDiv.innerHTML = `<div class="alert alert-success mt-3"><i class="fas fa-check-circle me-2"></i>${data.message || 'Message sent successfully!'}</div>`;
                    contactForm.reset();
                } else {
                    feedbackDiv.innerHTML = `<div class="alert alert-danger mt-3"><i class="fas fa-exclamation-circle me-2"></i>${data.message || 'An error occurred.'}</div>`;
                }
            })
            .catch(error => {
                feedbackDiv.innerHTML = `<div class="alert alert-danger mt-3"><i class="fas fa-exclamation-triangle me-2"></i>Network error. Please try again.</div>`;
            })
            .finally(() => {
                submitButton.disabled = false;
                submitButton.innerHTML = originalBtnText;
            });
        });
    }

    // Smooth Scrolling for all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
});
