'use client';

import { useState, useRef, useEffect } from 'react';

// All 4 renamed images to cycle through
const photos = [
    '/images/sameer-1.png',
    '/images/sameer-2.jpg',
    '/images/sameer-3.jpeg',
    '/images/sameer-4.jpeg',
];

export default function PhotoCarousel({ borderless = false }) {
    const [index, setIndex] = useState(0);
    const scrollContainerRef = useRef(null);

    // Track active index based on scroll position! Buttery smooth.
    const handleScroll = () => {
        if (!scrollContainerRef.current) return;
        const container = scrollContainerRef.current;
        const currentScroll = container.scrollLeft;
        const width = container.offsetWidth;
        const activeIndex = Math.round(currentScroll / width);
        setIndex(activeIndex);
    };

    const scrollTo = (i) => {
        if (!scrollContainerRef.current) return;
        const container = scrollContainerRef.current;
        container.scrollTo({
            left: container.offsetWidth * i,
            behavior: 'smooth'
        });
    };

    // Global CSS to hide the scrollbar for Apple native look
    useEffect(() => {
        if (!document.getElementById('hide-scrollbar-style')) {
            const style = document.createElement('style');
            style.id = 'hide-scrollbar-style';
            style.innerHTML = `
                .hide-scrollbar::-webkit-scrollbar { display: none; }
                .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `;
            document.head.appendChild(style);
        }
    }, []);

    return (
        <div style={{ 
            position: 'relative', 
            width: '100%', 
            height: '100%', 
            minHeight: '400px',
            borderRadius: borderless ? '0' : 'var(--glass-radius)', 
            overflow: 'hidden', 
            boxShadow: borderless ? 'none' : '0 8px 32px rgba(0, 0, 0, 0.3)',
            background: borderless ? 'transparent' : 'rgba(255, 255, 255, 0.04)',
            border: borderless ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
            zIndex: 1
        }}>
            <div 
                ref={scrollContainerRef}
                onScroll={handleScroll}
                className="hide-scrollbar"
                style={{
                    display: 'flex',
                    width: '100%',
                    height: '100%',
                    overflowX: 'auto',
                    overflowY: 'hidden',
                    scrollSnapType: 'x mandatory',
                    WebkitOverflowScrolling: 'touch', // iOS smooth scrolling
                }}
            >
                {photos.map((src, i) => (
                    <div 
                        key={i} 
                        style={{ 
                            flex: '0 0 100%',
                            width: '100%',
                            height: '100%',
                            scrollSnapAlign: 'start',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative'
                        }}
                    >
                        <img 
                            src={src} 
                            alt={`Sameer Photo ${i+1}`} 
                            style={{ 
                                width: '100%', 
                                height: '100%', 
                                objectFit: 'cover' 
                            }} 
                            onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.parentElement.innerHTML = 
                                    `<div style="padding: 2rem; text-align: center; color: rgba(255,255,255,0.5)">
                                        MISSING IMAGE:<br/><b>public${src}</b>
                                     </div>`;
                            }}
                        />
                    </div>
                ))}
            </div>
            
            {/* Fade Gradient Overlay for sleek bottom gradient */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '120px', background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)', zIndex: 2, pointerEvents: 'none' }} />

            {/* Premium Pill Controls */}
            <div style={{ position: 'absolute', bottom: '24px', left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: '8px', zIndex: 10 }}>
                {photos.map((_, i) => (
                    <button 
                        key={i} 
                        onClick={() => scrollTo(i)}
                        style={{ 
                            width: i === index ? '28px' : '8px', 
                            height: '8px', 
                            borderRadius: '4px',
                            background: i === index ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.4)',
                            border: 'none', 
                            cursor: 'pointer',
                            transition: 'all 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
                            boxShadow: i === index ? '0 0 12px rgba(255,255,255,0.6)' : 'none'
                        }} 
                    />
                ))}
            </div>
        </div>
    );
}
