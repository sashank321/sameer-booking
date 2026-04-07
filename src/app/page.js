import Link from 'next/link';

export default function Home() {
    return (
        <div>
            {/* Hero Section */}
            <section className="section-full" style={{ minHeight: '92vh', justifyContent: 'center' }}>
                <div className="glass-card" style={{ maxWidth: '720px', width: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ fontSize: '56px', marginBottom: '1.25rem', lineHeight: 1 }}>🐶</div>
                    <h1 className="display-hero" style={{ marginBottom: '0.75rem' }}>
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
            </section>

            {/* Features Section */}
            <section className="section-full" style={{ paddingTop: '2rem' }}>
                <div className="container">
                    <h2 className="heading-section" style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        Why Hang Out with Sameer?
                    </h2>
                    
                    <div className="grid-features">
                        <div className="glass-card" style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '42px', marginBottom: '1.25rem', lineHeight: 1 }}>🎾</div>
                            <h3 className="card-title" style={{ marginBottom: '0.75rem' }}>Playful Energy</h3>
                            <p className="body-standard" style={{ color: 'var(--text-secondary)' }}>
                                Sameer loves fetch, frisbee, and running around. Perfect for active people!
                            </p>
                        </div>

                        <div className="glass-card" style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '42px', marginBottom: '1.25rem', lineHeight: 1 }}>🧘‍♂️</div>
                            <h3 className="card-title" style={{ marginBottom: '0.75rem' }}>Calm Companion</h3>
                            <p className="body-standard" style={{ color: 'var(--text-secondary)' }}>
                                Need a quiet coding buddy? Sameer is great at sitting by your feet while you work.
                            </p>
                        </div>

                        <div className="glass-card" style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '42px', marginBottom: '1.25rem', lineHeight: 1 }}>📸</div>
                            <h3 className="card-title" style={{ marginBottom: '0.75rem' }}>Photogenic</h3>
                            <p className="body-standard" style={{ color: 'var(--text-secondary)' }}>
                                Need a model for your next photoshoot? Sameer knows his angles perfectly.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
