'use client';

import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Navbar() {
    const { data: session } = useSession();

    return (
        <nav style={{ borderBottom: '1px solid var(--border)', backgroundColor: 'var(--background)' }}>
            <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '4rem' }}>
                <Link href="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                    Sameer 🐾
                </Link>
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <Link href="/about">About Sameer</Link>
                    <Link href="/book">Book Now</Link>

                    {session ? (
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <span>Hi, {session.user.name || 'Friend'}</span>
                            <button
                                onClick={() => signOut()}
                                className="btn btn-outline"
                                style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}
                            >
                                Sign Out
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => signIn()}
                            className="btn btn-primary"
                        >
                            Log In
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}
