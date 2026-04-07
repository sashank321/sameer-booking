'use client';

import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import PhotoCarousel from '@/components/PhotoCarousel';

export default function AboutPage() {
    return (
        <div>
            {/* Vertical side labels */}
            <div className="vertical-label left-label">ABOUT SAMEER</div>
            <div className="vertical-label right-label">THE GOODEST BOY</div>
            <div className="section-counter">01 / 03</div>

            {/* Hero */}
            <section className="section-full framed-section" style={{ minHeight: '55vh', justifyContent: 'center' }}>
                <ScrollReveal>
                    <div className="conic-border-wrapper reveal">
                        <div className="glass-card" style={{ maxWidth: '720px', width: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div style={{ fontSize: '64px', marginBottom: '1.25rem', lineHeight: 1 }}>🐕</div>
                            <h1 className="mask-text display-hero" style={{ marginBottom: '0.75rem' }}>
                                Meet Sameer
                            </h1>
                            <p className="body-standard" style={{ color: 'var(--text-secondary)', maxWidth: '420px' }}>
                                Three years of pure joy, wrapped in golden fur. Get to know the goodest boy before you book your first hangout.
                            </p>
                        </div>
                    </div>
                </ScrollReveal>
            </section>

            {/* Bio + Stats */}
            <section className="section-full framed-section" style={{ paddingTop: '2rem' }}>
                <div className="container">
                    <ScrollReveal>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem', alignItems: 'stretch' }}>
                            <div className="conic-border-wrapper reveal" data-delay="0">
                                <div style={{ display: 'flex', height: '100%', minHeight: '340px' }}>
                                    <PhotoCarousel />
                                </div>
                            </div>

                            <div className="conic-border-wrapper reveal" data-delay="0.15">
                                <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                    <h2 className="heading-section" style={{ fontSize: '30px', marginBottom: '1rem' }}>The Goodest Boy</h2>
                                    <p className="body-standard" style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.7 }}>
                                        Sameer is a 3-year-old Golden Retriever mix with a heart of gold. He loves people, other dogs, and especially tennis balls. He&apos;s been professionally trained in being adorable and giving high-fives.
                                    </p>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '2rem' }}>
                                        <div className="glass-stat">
                                            <span className="body-caption" style={{ color: 'var(--text-tertiary)', display: 'block', marginBottom: '2px' }}>Breed</span>
                                            <span className="card-title" style={{ fontSize: '14px' }}>Golden Retriever Mix</span>
                                        </div>
                                        <div className="glass-stat">
                                            <span className="body-caption" style={{ color: 'var(--text-tertiary)', display: 'block', marginBottom: '2px' }}>Age</span>
                                            <span className="card-title" style={{ fontSize: '14px' }}>3 Years</span>
                                        </div>
                                        <div className="glass-stat">
                                            <span className="body-caption" style={{ color: 'var(--text-tertiary)', display: 'block', marginBottom: '2px' }}>Energy Level</span>
                                            <span className="card-title" style={{ fontSize: '14px' }}>Medium-High ⚡</span>
                                        </div>
                                        <div className="glass-stat">
                                            <span className="body-caption" style={{ color: 'var(--text-tertiary)', display: 'block', marginBottom: '2px' }}>Fav Snack</span>
                                            <span className="card-title" style={{ fontSize: '14px' }}>Cheese 🧀</span>
                                        </div>
                                    </div>

                                    <Link href="/book" className="btn-primary" style={{ alignSelf: 'flex-start' }}>
                                        Schedule a Meeting
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Day in the Life */}
            <section className="section-full framed-section" style={{ paddingTop: '2rem' }}>
                <div className="container">
                    <ScrollReveal>
                        <h2 className="heading-section reveal" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                            A Day in the Life
                        </h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
                            {[
                                { emoji: '🌅', label: 'Morning Walk', time: '7:00 AM' },
                                { emoji: '🎾', label: 'Play Time', time: '10:00 AM' },
                                { emoji: '😴', label: 'Nap Time', time: '1:00 PM' },
                                { emoji: '🍖', label: 'Dinner & Treats', time: '6:00 PM' },
                            ].map((item, i) => (
                                <div key={i} className="conic-border-wrapper reveal" data-delay={i * 0.12}>
                                    <div className="glass-card" style={{ textAlign: 'center', padding: '2rem 1.5rem' }}>
                                        <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem', lineHeight: 1 }}>{item.emoji}</div>
                                        <h3 className="card-title" style={{ marginBottom: '0.4rem' }}>{item.label}</h3>
                                        <span className="body-caption" style={{ color: 'var(--text-tertiary)' }}>{item.time}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </div>
    );
}
