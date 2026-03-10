document.addEventListener('DOMContentLoaded', () => {
    // --- AI NEURAL NETWORK ENGINE ---
    const initParticles = (canvasId, particleDensity = 9000) => {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        let particles = [];
        let mouse = { x: null, y: null, radius: 150 };

        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };

        window.addEventListener('resize', resize);
        
        // Only track mouse for the global hero canvas to save performance
        if (canvasId === 'heroCanvas') {
            window.addEventListener('mousemove', (e) => {
                mouse.x = e.x;
                mouse.y = e.y;
            });
        }

        resize();

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 1.5 + 0.5;
                this.baseX = this.x;
                this.baseY = this.y;
                this.density = (Math.random() * 30) + 1;
                this.speedX = (Math.random() * 0.4) - 0.2;
                this.speedY = (Math.random() * 0.4) - 0.2;
            }

            draw() {
                ctx.fillStyle = 'rgba(0, 174, 239, 0.4)';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x > canvas.width) this.x = 0;
                else if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                else if (this.y < 0) this.y = canvas.height;

                if (mouse.x && mouse.y) {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < mouse.radius) {
                        const forceDirectionX = dx / distance;
                        const forceDirectionY = dy / distance;
                        const force = (mouse.radius - distance) / mouse.radius;
                        const directionX = forceDirectionX * force * this.density;
                        const directionY = forceDirectionY * force * this.density;
                        this.x -= directionX;
                        this.y -= directionY;
                    }
                }
            }
        }

        function init() {
            particles = [];
            let numberOfParticles = (canvas.width * canvas.height) / particleDensity;
            for (let i = 0; i < numberOfParticles; i++) {
                particles.push(new Particle());
            }
        }

        function connect() {
            let opacityValue = 1;
            for (let a = 0; a < particles.length; a++) {
                for (let b = a; b < particles.length; b++) {
                    let dx = particles[a].x - particles[b].x;
                    let dy = particles[a].y - particles[b].y;
                    let distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 120) {
                        opacityValue = 1 - (distance / 120);
                        ctx.strokeStyle = `rgba(0, 174, 239, ${opacityValue * 0.15})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
            }
            connect();
            requestAnimationFrame(animate);
        }

        init();
        animate();
    };

    // Initialize Global Background
    initParticles('heroCanvas');
    
    // Initialize Local Section Backgrounds
    initParticles('contactCanvas', 12000); // Higher number = lower density for local sections

    // --- ARCHITECTURE SVG INTERACTION ---
    const nodes = document.querySelectorAll('.arch-node');
    const infoPanel = document.getElementById('nodeInfo');

    const nodeDetails = {
        sensors: {
            title: "Physical Layer (Sensors & PLC)",
            desc: "Industrial sensors and PLCs (Field Devices) communicating via industry-standard protocols. Data is collected at microsecond intervals."
        },
        edge: {
            title: "Edge Computing (Advanced Controllers)",
            desc: "High-performance Dual-Core architecture performing local logic, data filtering, and secure telemetry orchestration."
        },
        telemetry: {
            title: "Telemetry Layer (Secure)",
            desc: "Lightweight messaging with enterprise-grade encryption. Ensures low-bandwidth, high-reliability data transit using cutting-edge protocols."
        },
        cloud: {
            title: "Intelligence Layer (Backend & Database)",
            desc: "Cloud-native microservices and scalable industrial database storage. AI models perform predictive analytics and trend mapping."
        },
        solution: {
            title: "Visualization Layer (User Interface)",
            desc: "Custom modern dashboards and advanced analytics providing real-time insights and operational control for smart factories."
        }
    };

    nodes.forEach(node => {
        node.addEventListener('mouseenter', () => {
            const target = node.getAttribute('data-target');
            const data = nodeDetails[target];
            if (data) {
                infoPanel.innerHTML = `
                    <h6 class="text-accent fw-bold mb-1">${data.title}</h6>
                    <p class="small text-secondary mb-0">${data.desc}</p>
                `;
                infoPanel.classList.add('border-accent');
            }
        });

        node.addEventListener('mouseleave', () => {
            infoPanel.innerHTML = '<span class="text-secondary small">Hover over a system node to view technical specifications.</span>';
            infoPanel.classList.remove('border-accent');
        });
    });

    // --- LIVE OEE DATA SIMULATION ---
    const updateOEE = () => {
        const availability = (98 + Math.random() * 1.5).toFixed(1);
        const performance = (94 + Math.random() * 2).toFixed(1);
        const quality = (99.5 + Math.random() * 0.4).toFixed(1);
        const kw = (84 + Math.random() * 2).toFixed(1);

        const availabilityEl = document.getElementById('oee-val-availability');
        const performanceEl = document.getElementById('oee-val-performance');
        const qualityEl = document.getElementById('oee-val-quality');
        const qualityBar = document.getElementById('oee-bar-quality');
        const kwEl = document.getElementById('live-kw');
        const primaryOee = document.getElementById('oee-val-primary');
        const oeeRing = document.getElementById('oee-ring');

        if (availabilityEl) availabilityEl.innerText = `${availability}%`;
        if (performanceEl) performanceEl.innerText = `${performance}%`;
        if (qualityEl) qualityEl.innerText = `${quality}%`;
        if (qualityBar) qualityBar.style.width = `${quality}%`;
        if (kwEl) kwEl.innerText = kw;

        // Calculate a composite OEE for the primary ring
        const composite = ((availability * performance * quality) / 10000).toFixed(0);
        if (primaryOee) primaryOee.innerText = `${composite}%`;
        
        // Update SVG ring offset (Full circle is ~163.3 dasharray)
        if (oeeRing) {
            const offset = 163.3 - (163.3 * (composite / 100));
            oeeRing.style.strokeDashoffset = offset;
        }
    };

    setInterval(updateOEE, 3000); // Update every 3 seconds

    // --- CONTACT FORM HANDLING ---
    const contactForm = document.getElementById('contactForm');
    const feedbackDiv = document.getElementById('formFeedback');

    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // --- CONFIGURATION: SET YOUR WHATSAPP NUMBER HERE ---
            // Format: Country Code + Number (No + or spaces)
            const phoneNumber = "918149643432"; 

            // Construct the WhatsApp message with professional formatting
            const waMessage = encodeURIComponent(
                `*New Inquiry from JagTechno Website*\n\n` +
                `*Name:* ${name}\n` +
                `*Email:* ${email}\n` +
                `*Module:* ${subject}\n\n` +
                `*Message:*\n${message}`
            );

            // Open WhatsApp in a new tab
            const waUrl = `https://wa.me/${phoneNumber}?text=${waMessage}`;
            window.open(waUrl, '_blank');

            // Provide feedback
            feedbackDiv.innerHTML = `<div class="alert alert-info mt-3"><i class="fab fa-whatsapp me-2"></i>Redirecting to WhatsApp... Please click "Send" in the app.</div>`;
            
            // Optional: reset form after a delay
            setTimeout(() => {
                contactForm.reset();
                feedbackDiv.innerHTML = '';
            }, 5000);
        });
    }

    // Smooth Scroll for Nav Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});
