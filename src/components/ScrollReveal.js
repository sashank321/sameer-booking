'use client';

import { useEffect, useRef } from 'react';

export default function ScrollReveal({ children, className = '', stagger = 0.1 }) {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            container.querySelectorAll('.reveal').forEach(el => el.classList.add('revealed'));
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const el = entry.target;
                        const delay = el.dataset.delay || 0;
                        setTimeout(() => {
                            el.classList.add('revealed');
                        }, delay * 1000);
                        observer.unobserve(el);
                    }
                });
            },
            { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
        );

        // Auto-add reveal class and stagger delays to direct children
        const children = container.querySelectorAll('.reveal');
        children.forEach((child, index) => {
            if (!child.dataset.delay) {
                child.dataset.delay = (index * stagger).toFixed(2);
            }
            observer.observe(child);
        });

        return () => observer.disconnect();
    }, [stagger]);

    return (
        <div ref={containerRef} className={className}>
            {children}
        </div>
    );
}
