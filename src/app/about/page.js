import Link from 'next/link';

export default function AboutPage() {
    return (
        <div className="container" style={{ padding: '4rem 1rem' }}>
            <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1.5rem', textAlign: 'center' }}>About Sameer</h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center' }}>
                <div>
                    <div style={{
                        width: '100%',
                        height: '400px',
                        backgroundColor: '#eee',
                        borderRadius: 'var(--radius)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '5rem'
                    }}>
                        🐕
                    </div>
                </div>

                <div>
                    <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>The Goodest Boy</h2>
                    <p style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>
                        Sameer is a 3-year-old Golden Retriever mix with a heart of gold. He loves people, other dogs, and especially tennis balls.
                        He has been professionally trained in being adorable and giving high-fives.
                    </p>

                    <h3 style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '0.5rem' }}>Stats</h3>
                    <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', marginBottom: '2rem' }}>
                        <li><strong>Breed:</strong> Golden Retriever Mix</li>
                        <li><strong>Age:</strong> 3 Years</li>
                        <li><strong>Energy Level:</strong> Medium-High</li>
                        <li><strong>Favorite Snack:</strong> Cheese</li>
                    </ul>

                    <Link href="/book" className="btn btn-primary">
                        Schedule a Meeting
                    </Link>
                </div>
            </div>

            <div style={{ marginTop: '4rem' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>A Day in the Life</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} style={{
                            height: '200px',
                            backgroundColor: '#f7fafc',
                            borderRadius: 'var(--radius)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '2rem'
                        }}>
                            Image {i}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
