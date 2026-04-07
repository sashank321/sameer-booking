'use client';

import Link from 'next/link';
import { useState } from 'react';
import ScrollReveal from '@/components/ScrollReveal';

const features = [
    {
        emoji: '🎾',
        title: 'Playful Energy',
        desc: 'Sameer loves fetch, frisbee, and running around. Perfect for active people!',
    },
    {
        emoji: '🧘‍♂️',
        title: 'Calm Companion',
        desc: 'Need a quiet coding buddy? Sameer is great at sitting by your feet while you work.',
    },
    {
        emoji: '📸',
        title: 'Photogenic',
        desc: 'Need a model for your next photoshoot? Sameer knows his angles perfectly.',
    },
];

function FeatureCarousel() {
    const [hovered, setHovered] = useState(null);

    return (
        <div className="carousel-container">
            {features.map((feature, i) => (
                <div
                    key={i}
                    className={`carousel-card glass-card ${hovered === i ? 'carousel-card--active' : ''} ${hovered !== null && hovered !== i ? 'carousel-card--inactive' : ''}`}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    style={{ textAlign: 'center' }}
                >
                    <div className="conic-glow" />
                    <div style={{ fontSize: '42px', marginBottom: '1.25rem', lineHeight: 1, position: 'relative', zIndex: 3 }}>{feature.emoji}</div>
                    <h3 className="card-title" style={{ marginBottom: '0.75rem', position: 'relative', zIndex: 3 }}>{feature.title}</h3>
                    <p className="body-standard" style={{ color: 'var(--text-secondary)', position: 'relative', zIndex: 3 }}>
                        {feature.desc}
                    </p>
                </div>
            ))}
        </div>
    );
}

export default function Home() {
    return (
        <div>
            {/* Vertical side labels — Unifiers of Japan style */}
            <div className="vertical-label left-label">SAMEER DOG BOOKING</div>
            <div className="vertical-label right-label">EST. 2026</div>

            {/* Section Counter */}
            <div className="section-counter">01 / 02</div>

            {/* Hero Section */}
            <section className="section-full framed-section" style={{ minHeight: '92vh', justifyContent: 'center' }}>
                <ScrollReveal>
                    <div className="conic-border-wrapper reveal">
                        <div className="glass-card" style={{ maxWidth: '720px', width: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div style={{ fontSize: '56px', marginBottom: '1.25rem', lineHeight: 1 }}>🐶</div>
                            <h1 className="mask-text display-hero" style={{ marginBottom: '0.75rem' }}>
                                Sameer.
                            </h1>
                            <h2 className="sub-heading" style={{ marginBottom: '2rem', textAlign: 'center' }}>
                                The perfect companion.
                            </h2>

                            <p className="body-standard" style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', maxWidth: '440px', textAlign: 'center' }}>
                                Book hourly sessions with the goodest boy in town for walks, playdates, or just quiet afternoons.
                            </p>

                            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
                                <Link href="/book" className="btn-primary">
                                    Book Sameer
                                </Link>
                                <Link href="/about" className="btn-secondary">
                                    Learn more
                                </Link>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            </section>

            {/* Features Section — Hover Carousel */}
            <section className="section-full framed-section" style={{ paddingTop: '2rem' }}>
                <div className="container">
                    <ScrollReveal>
                        <h2 className="heading-section reveal" style={{ textAlign: 'center', marginBottom: '3rem' }}>
                            Why Hang Out with Sameer?
                        </h2>
                        <div className="reveal" data-delay="0.2">
                            <FeatureCarousel />
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </div>
    );
}
