'use client';

import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Navbar() {
    const { data: session } = useSession();

    return (
        <nav className="glass-nav">
            <div className="nav-container">
                <Link href="/" className="nav-link" style={{ fontSize: '14px', fontWeight: 'bold' }}>
                    Sameer 🐾
                </Link>
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    <Link href="/about" className="nav-link">About Sameer</Link>
                    <Link href="/book" className="nav-link">Book Now</Link>

                    {session ? (
                        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                            <span className="nav-link" style={{ opacity: 0.8 }}>Hi, {session.user.name || 'Friend'}</span>
                            <button
                                onClick={() => signOut()}
                                className="nav-link"
                                style={{ opacity: 0.8 }}
                            >
                                Sign Out
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => signIn()}
                            className="nav-link"
                        >
                            Log In
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}
