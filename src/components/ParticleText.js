'use client';

import { useEffect, useRef } from 'react';

export default function ParticleText({ text = 'Sameer.', align = 'center' }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        
        // High-resolution canvas dimensions
        const width = 800;
        const height = 250;
        canvas.width = width;
        canvas.height = height;

        let particlesArray = [];
        
        // Mouse physics state
        let mouse = {
            x: null,
            y: null,
            radius: 120
        };

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = (e.clientX - rect.left) * (canvas.width / rect.width);
            mouse.y = (e.clientY - rect.top) * (canvas.height / rect.height);
        };

        const handleMouseLeave = () => {
            // Send mouse far away instantly on leave
            mouse.x = -1000;
            mouse.y = -1000;
        };

        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', handleMouseLeave);

        class Particle {
            constructor(x, y) {
                // Initialize positions randomly for an initial snap-together effect
                this.x = x + (Math.random() - 0.5) * 800; 
                this.y = y + (Math.random() - 0.5) * 800;
                this.baseX = x;
                this.baseY = y;
                this.density = (Math.random() * 40) + 5;
                this.size = Math.random() * 2 + 1; // 1 to 3 pixels
                this.color = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.5})`; // 0.5 to 1 opacity
            }
            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
            update() {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                let forceDirectionX = dx / distance;
                let forceDirectionY = dy / distance;
                let maxDistance = mouse.radius;
                
                let force = (maxDistance - distance) / maxDistance;
                let directionX = forceDirectionX * force * this.density;
                let directionY = forceDirectionY * force * this.density;

                // Collision / Magnetic repulsion
                if (distance < mouse.radius) {
                    this.x -= directionX;
                    this.y -= directionY;
                } else {
                    // Elastic return to base position (friction of 10)
                    if (this.x !== this.baseX) {
                        let dxBase = this.x - this.baseX;
                        this.x -= dxBase / 10; 
                    }
                    if (this.y !== this.baseY) {
                        let dyBase = this.y - this.baseY;
                        this.y -= dyBase / 10;
                    }
                }
            }
        }

        function init() {
            particlesArray = [];
            
            // 1. Draw text off-screen
            ctx.fillStyle = 'rgba(255, 255, 255, 1)';
            ctx.font = 'bold 120px Inter, system-ui, -apple-system, sans-serif'; 
            ctx.textAlign = align;
            ctx.textBaseline = 'middle';
            
            let textX = align === 'center' ? width / 2 : 40; // 40px left padding when left aligned
            ctx.fillText(text, textX, height / 2);

            // 2. Scan pixel alpha channels to build particle map
            const textCoordinates = ctx.getImageData(0, 0, width, height);
            
            // Clear canvas after mapping
            ctx.clearRect(0, 0, width, height);

            // Map grid: Lower gap means higher definition / more particles
            const gap = 4;
            
            for (let y = 0, y2 = textCoordinates.height; y < y2; y += gap) {
                for (let x = 0, x2 = textCoordinates.width; x < x2; x += gap) {
                    // Read Alpha Value
                    const alphaObj = textCoordinates.data[(y * width * 4) + (x * 4) + 3];
                    if (alphaObj > 128) {
                        let positionX = x;
                        let positionY = y;
                        particlesArray.push(new Particle(positionX, positionY));
                    }
                }
            }
        }

        init();

        let animationFrameId;
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].draw();
                particlesArray[i].update();
            }
            animationFrameId = requestAnimationFrame(animate);
        }
        animate();

        return () => {
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, [text]);

    return (
        <canvas 
            ref={canvasRef} 
            style={{ 
                width: '100%', 
                maxWidth: '700px', 
                height: 'auto', 
                display: 'block', 
                margin: '0 auto',
                cursor: 'crosshair', // Suggests interactivity
                marginBottom: '0.25rem',
                filter: 'drop-shadow(0px 8px 16px rgba(0,0,0,0.5))' 
            }} 
        />
    );
}
