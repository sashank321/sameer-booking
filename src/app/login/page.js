'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const res = await signIn('credentials', {
            email,
            password,
            redirect: false,
        });

        if (res?.error) {
            setError('Invalid email or password');
            setLoading(false);
        } else {
            router.push('/');
            router.refresh();
        }
    };

    return (
        <section className="section-full" style={{ minHeight: '92vh', justifyContent: 'center' }}>
            {/* Vertical side labels — Unifiers of Japan style */}
            <div className="vertical-label left-label">AUTHENTICATION</div>
            <div className="vertical-label right-label">SAMEER BOOKING</div>

            <div className="conic-border-wrapper">
                <div className="glass-card" style={{ maxWidth: '440px', width: '100%' }}>
                    {/* Header */}
                    <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                        <div style={{ fontSize: '48px', marginBottom: '1rem', lineHeight: 1 }}>🔐</div>
                        <h1 className="mask-text" style={{ fontSize: 'clamp(32px, 5vw, 44px)', marginBottom: '0.5rem' }}>
                            Welcome Back
                        </h1>
                        <p className="body-caption" style={{ color: 'var(--text-tertiary)' }}>
                            Sign in to book sessions with Sameer
                        </p>
                    </div>

                    {/* Error */}
                    {error && (
                        <div style={{
                            background: 'rgba(255, 59, 48, 0.12)',
                            border: '1px solid rgba(255, 59, 48, 0.3)',
                            borderRadius: '12px',
                            padding: '12px 16px',
                            marginBottom: '1.5rem',
                            textAlign: 'center',
                        }}>
                            <span className="body-caption" style={{ color: '#ff6b6b' }}>{error}</span>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        <div className="glass-form-group">
                            <label className="glass-label">Email</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="glass-input"
                                placeholder="admin@sameer.dog"
                                autoComplete="email"
                            />
                        </div>

                        <div className="glass-form-group">
                            <label className="glass-label">Password</label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="glass-input"
                                placeholder="••••••••"
                                autoComplete="current-password"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary"
                            style={{
                                width: '100%',
                                padding: '14px',
                                fontSize: '15px',
                                marginTop: '0.5rem',
                                opacity: loading ? 0.5 : 1,
                                cursor: loading ? 'not-allowed' : 'pointer',
                            }}
                        >
                            {loading ? '✨ Signing In...' : '🐾 Sign In'}
                        </button>
                    </form>

                    {/* Footer hint */}
                    <div style={{ textAlign: 'center', marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                        <p className="body-caption" style={{ color: 'var(--text-tertiary)' }}>
                            Demo credentials: <span style={{ color: 'var(--accent-bright)' }}>admin@sameer.dog</span> / <span style={{ color: 'var(--accent-bright)' }}>sameer123</span>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
