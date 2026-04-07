'use client';

import Link from 'next/link';
import { useState } from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import ParticleText from '@/components/ParticleText';
import InfiniteCarousel from '@/components/InfiniteCarousel';

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

            {/* Spatial Overlap Epic Hero Section */}
            <section style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', paddingTop: '4rem' }}>
                
                {/* Background Full Width Scrolling Marquee */}
                <ScrollReveal style={{ position: 'absolute', top: '15%', right: '-5vw', width: '90vw', height: '70vh', zIndex: 0, opacity: 0.95, transform: 'rotate(-2deg)' }}>
                   <div className="reveal" data-delay="0.2" style={{ width: '100%', height: '100%' }}>
                       <InfiniteCarousel speed={1.2} borderless={true} />
                   </div>
                </ScrollReveal>

                <div className="container" style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '1400px', margin: '0 auto' }}>
                    
                    {/* Foreground Floating Island */}
                    <ScrollReveal>
                        <div className="reveal" style={{ 
                            background: 'rgba(20, 20, 20, 0.65)', 
                            backdropFilter: 'blur(48px) saturate(200%)', 
                            WebkitBackdropFilter: 'blur(48px) saturate(200%)',
                            borderRadius: '32px', 
                            border: '1px solid rgba(255, 255, 255, 0.15)', 
                            borderTop: '1px solid rgba(255, 255, 255, 0.3)',
                            boxShadow: '0 32px 80px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.2)',
                            maxWidth: '680px',
                            padding: '5rem 4.5rem',
                            marginTop: '2rem'
                        }}>
                            
                            <div style={{ display: 'inline-block', alignSelf: 'flex-start', padding: '8px 18px', background: 'rgba(255,255,255,0.06)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.15)', marginBottom: '1.5rem', backdropFilter: 'blur(10px)' }}>
                                <span style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.95)' }}>
                                    Exclusive Booking
                                </span>
                            </div>
                            
                            <div style={{ margin: '0 0 0 -2.5rem', width: '120%' }}>
                                <ParticleText text="Sameer." align="left" />
                            </div>
                            
                            <h2 style={{ fontSize: '38px', fontWeight: 300, letterSpacing: '-0.5px', marginBottom: '1.5rem', color: 'rgba(255,255,255,0.95)' }}>
                                The perfect companion.
                            </h2>
                            <p style={{ fontSize: '20px', lineHeight: 1.6, color: 'var(--text-secondary)', marginBottom: '3rem', maxWidth: '480px' }}>
                                Schedule exclusive hourly sessions for casual hangouts, creative photoshoots, or just quiet afternoons. Experience the elite standard.
                            </p>

                            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                                <Link href="/book" className="btn-primary" style={{ padding: '18px 36px', fontSize: '18px', fontWeight: 500, boxShadow: '0 12px 32px rgba(191, 90, 242, 0.5)', transition: 'all 0.3s ease' }}>
                                    Book Sameer
                                </Link>
                                <Link href="/about" className="btn-secondary" style={{ padding: '18px 36px', fontSize: '18px', background: 'rgba(255,255,255,0.05)' }}>
                                    Learn more
                                </Link>
                            </div>
                        </div>
                    </ScrollReveal>

                </div>
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
