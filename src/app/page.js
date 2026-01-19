import Link from 'next/link';

export default function Home() {
    return (
        <div>
            {/* Hero Section */}
            <section style={{
                textAlign: 'center',
                padding: '6rem 1rem',
                backgroundColor: '#fffbeb', /* Light yellow/gold tint */
            }}>
                <div className="container">
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🐶</div>
                    <h1 style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '1.5rem', color: 'var(--secondary)' }}>
                        Meet Sameer.
                    </h1>
                    <p style={{ fontSize: '1.5rem', color: 'var(--text-muted)', marginBottom: '2.5rem', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
                        The perfect companion for your walks, playdates, and quiet afternoons.
                        Book hourly sessions with the goodest boy in town.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <Link href="/book" className="btn btn-primary" style={{ fontSize: '1.25rem' }}>
                            Book Sameer Now
                        </Link>
                        <Link href="/about" className="btn btn-outline" style={{ fontSize: '1.25rem' }}>
                            Learn More
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="container" style={{ padding: '4rem 1rem' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2.5rem' }}>Why Hang Out with Sameer?</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>

                    <div style={{ padding: '2rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)', textAlign: 'center' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎾</div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Playful Energy</h3>
                        <p style={{ color: 'var(--text-muted)' }}>Sameer loves fetch, frisbee, and running around. Perfect for active people!</p>
                    </div>

                    <div style={{ padding: '2rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)', textAlign: 'center' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🧘‍♂️</div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Calm Companion</h3>
                        <p style={{ color: 'var(--text-muted)' }}>Need a quiet coding buddy? Sameer is great at sitting by your feet while you work.</p>
                    </div>

                    <div style={{ padding: '2rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)', textAlign: 'center' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📸</div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Photogenic</h3>
                        <p style={{ color: 'var(--text-muted)' }}>Need a model for your next photoshoot? Sameer knows his angles.</p>
                    </div>

                </div>
            </section>
        </div>
    );
}
