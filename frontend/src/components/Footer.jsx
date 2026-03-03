import React, { useEffect, useRef } from 'react';

const NeuralFooter = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        let particles = [];
        const particleCount = 40;

        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.radius = Math.random() * 2;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(249, 115, 22, 0.5)';
                ctx.fill();
            }
        }

        const init = () => {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        const drawLines = () => {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 100) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(249, 115, 22, ${0.2 * (1 - dist / 100)})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            drawLines();
            animationFrameId = requestAnimationFrame(animate);
        };

        resize();
        init();
        animate();

        window.addEventListener('resize', resize);
        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <footer style={{ 
            position: 'relative', 
            background: 'linear-gradient(to bottom, transparent, #080808)', 
            padding: '4rem 2rem', 
            marginTop: '4rem',
            borderTop: '1px solid rgba(249, 115, 22, 0.1)',
            overflow: 'hidden'
        }}>
            <canvas 
                ref={canvasRef} 
                style={{ 
                    position: 'absolute', 
                    top: 0, 
                    left: 0, 
                    width: '100%', 
                    height: '100%', 
                    pointerEvents: 'none',
                    opacity: 0.6
                }} 
            />

            <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', marginBottom: '3rem' }}>
                   {['Core Protocol', 'AI Architecture', 'Neural Logs', 'Contributor Access'].map(item => (
                       <a 
                        key={item} 
                        href="#" 
                        className="interactive"
                        style={{ 
                            fontSize: '0.8rem', 
                            textTransform: 'uppercase', 
                            letterSpacing: '2px', 
                            color: 'var(--text-secondary)',
                            fontWeight: '600',
                            transition: 'all 0.3s'
                        }}
                        onMouseEnter={(e) => { e.target.style.color = 'var(--accent)'; e.target.style.textShadow = '0 0 10px var(--accent)'; }}
                        onMouseLeave={(e) => { e.target.style.color = 'var(--text-secondary)'; e.target.style.textShadow = 'none'; }}
                       >
                           {item}
                       </a>
                   ))}
                </div>

                <div style={{ maxWidth: '600px', margin: '0 auto 2rem', border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.4)', padding: '1.5rem', borderRadius: '12px', backdropFilter: 'blur(5px)' }}>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontStyle: 'italic', lineHeight: '1.6' }}>
                        "SkillMatch AI operates on a high-dimensional probabilistic model specifically tuned for deep career identity extraction and technical semantic mapping."
                    </p>
                </div>

                <div style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.75rem', letterSpacing: '1px' }}>
                    &copy; 2026 NEURAL INTERFACE // SKILLMATCH AI // v2.4.0
                </div>
            </div>
        </footer>
    );
};

export default NeuralFooter;
