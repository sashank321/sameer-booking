'use client';

import { useEffect, useRef } from 'react';

const photos = [
    '/images/sameer-1.png',
    '/images/sameer-2.jpg',
    '/images/sameer-3.jpeg',
    '/images/sameer-4.jpeg',
    '/images/sameer-5.jpeg',
    '/images/sameer-6.jpeg',
];

export default function InfiniteCarousel({ speed = 0.8, reverse = false, borderless = false }) {
    const trackRef = useRef(null);
    const requestRef = useRef();
    const positionRef = useRef(0);
    const lastScrollYRef = useRef(0);
    
    // Smooth dampening for scroll velocity injection
    const targetVelocityRef = useRef(0);
    const currentVelocityRef = useRef(0);

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;
        
        const animate = () => {
            // Spring easing to naturally decay scroll velocity
            currentVelocityRef.current += (targetVelocityRef.current - currentVelocityRef.current) * 0.1;
            
            // Base speed offset by current scroll-injected velocity
            const baseSpeed = reverse ? speed : -speed;
            const velocityDelta = (currentVelocityRef.current * (reverse ? 0.3 : -0.3));
            positionRef.current += baseSpeed + velocityDelta;
            
            // Extremely aggressive decay to make the "scroll jolt" snap back nicely
            targetVelocityRef.current *= 0.9;

            // Half-width logic ensures seamless looping because we duplicate the array exactly once
            const halfWidth = track.scrollWidth / 2;
            
            if (positionRef.current <= -halfWidth) {
                positionRef.current += halfWidth;
            } else if (positionRef.current > 0) {
                positionRef.current -= halfWidth;
            }

            track.style.transform = `translate3d(${positionRef.current}px, 0, 0)`;
            requestRef.current = requestAnimationFrame(animate);
        };

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const delta = currentScrollY - lastScrollYRef.current;
            lastScrollYRef.current = currentScrollY;
            
            // Inject instantaneous velocity
            targetVelocityRef.current += delta * 2; 
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        lastScrollYRef.current = window.scrollY;
        
        requestRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            cancelAnimationFrame(requestRef.current);
        };
    }, [speed, reverse]);

    return (
        <div style={{ 
            position: 'relative', 
            width: '100%', 
            height: '100%', 
            minHeight: '400px',
            overflow: 'hidden', 
            borderRadius: borderless ? '0' : 'var(--glass-radius)',
            background: borderless ? 'transparent' : 'rgba(255, 255, 255, 0.04)',
            border: borderless ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
            zIndex: 1
        }}>
            <div 
                ref={trackRef}
                style={{ 
                    display: 'flex', 
                    gap: '1.5rem', 
                    height: '100%',
                    willChange: 'transform',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    padding: '0 0.75rem'
                }}
            >
                {/* Duplicated arrays for seamless infinite looping */}
                {[...photos, ...photos].map((src, i) => (
                    <div 
                        key={i} 
                        style={{ 
                            position: 'relative',
                            flex: '0 0 clamp(280px, 35vw, 450px)', // Fluid width based on viewport
                            height: '100%',
                            minHeight: '400px',
                            borderRadius: '16px',
                            overflow: 'hidden',
                            boxShadow: '0 16px 40px rgba(0,0,0,0.3)',
                            transform: 'translateZ(0)', // Force GPU hardware acceleration
                        }}
                    >
                        <img 
                            src={src} 
                            alt={`Sameer Photo Archive ${i}`}
                            loading="eager"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            onError={(e) => {
                                e.target.style.display = 'none';
                            }}
                        />
                    </div>
                ))}
            </div>
            
            {/* Edge fades to blend strictly into the background */}
            <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '6vw', background: 'linear-gradient(to right, rgba(0,0,0,0.4), transparent)', zIndex: 2, pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '6vw', background: 'linear-gradient(to left, rgba(0,0,0,0.4), transparent)', zIndex: 2, pointerEvents: 'none' }} />
        </div>
    );
}
