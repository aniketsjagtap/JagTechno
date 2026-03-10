document.addEventListener('DOMContentLoaded', () => {
    // --- AI NEURAL NETWORK ENGINE ---
    const canvas = document.getElementById('heroCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let mouse = { x: null, y: null, radius: 150 };

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', (e) => {
            mouse.x = e.x;
            mouse.y = e.y;
        });

        resize();

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.baseX = this.x;
                this.baseY = this.y;
                this.density = (Math.random() * 30) + 1;
                this.speedX = (Math.random() * 0.4) - 0.2;
                this.speedY = (Math.random() * 0.4) - 0.2;
            }

            draw() {
                ctx.fillStyle = 'rgba(0, 174, 239, 0.5)';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
            }

            update() {
                // Movement
                this.x += this.speedX;
                this.y += this.speedY;

                // Screen Wrap
                if (this.x > canvas.width) this.x = 0;
                else if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                else if (this.y < 0) this.y = canvas.height;

                // Mouse Interaction (AI Reactivity)
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

        function init() {
            particles = [];
            let numberOfParticles = (canvas.width * canvas.height) / 9000;
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

                    if (distance < 150) {
                        opacityValue = 1 - (distance / 150);
                        ctx.strokeStyle = `rgba(0, 174, 239, ${opacityValue * 0.2})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();

                        // Simulating "Data Packets" on paths
                        if (Math.random() > 0.997) {
                            ctx.fillStyle = `rgba(245, 158, 11, ${opacityValue})`;
                            ctx.beginPath();
                            ctx.arc(particles[a].x + (dx * 0.5), particles[a].y + (dy * 0.5), 1.5, 0, Math.PI * 2);
                            ctx.fill();
                        }
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
    }

    // --- ARCHITECTURE SVG INTERACTION ---
    const nodes = document.querySelectorAll('.arch-node');
    const infoPanel = document.getElementById('nodeInfo');

    const nodeDetails = {
        sensors: {
            title: "Physical Layer (Sensors & PLC)",
            desc: "Industrial sensors and PLCs communicating via Modbus RTU / RS485. Data is collected at microsecond intervals."
        },
        edge: {
            title: "Edge Computing Layer",
            desc: "Dual-MCU architecture (ESP32 + STM32) performing local logic, data filtering, and secure MQTTS orchestration."
        },
        mqtt: {
            title: "Telemetry Layer (MQTT)",
            desc: "Lightweight Pub/Sub messaging with TLS encryption. Ensures low-bandwidth, high-reliability data transit."
        },
        cloud: {
            title: "Intelligence Layer (Cloud)",
            desc: "Node.js microservices and MariaDB storage. AI models perform predictive analytics and trend visualization."
        },
        solution: {
            title: "Visualization & Solution Layer",
            desc: "Custom Angular dashboards and Grafana analytics providing real-time insights and operational control for smart factories."
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
