'use client';

import { useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function BookPage() {
    const { data: session } = useSession();
    const router = useRouter();

    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('10');
    const [duration, setDuration] = useState('1');
    const [notes, setNotes] = useState('');
    const [loading, setLoading] = useState(false);

    if (!session) {
        return (
            <section className="section-full" style={{ minHeight: '80vh', justifyContent: 'center' }}>
                <div className="glass-card" style={{ maxWidth: '420px', width: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ fontSize: '48px', marginBottom: '1.25rem', lineHeight: 1 }}>🔐</div>
                    <h1 className="heading-section" style={{ marginBottom: '0.75rem', fontSize: '26px' }}>Please Log In</h1>
                    <p className="body-standard" style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                        You need to be signed in to book a session with Sameer.
                    </p>
                    <button onClick={() => signIn()} className="btn-primary">
                        Log In
                    </button>
                </div>
            </section>
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ date, startTime, duration, notes }),
            });

            if (res.ok) {
                alert('Booking Confirmed! Woof! 🐾');
                router.push('/');
            } else {
                alert('Something went wrong.');
            }
        } catch (err) {
            alert('Error submitting booking');
        } finally {
            setLoading(false);
        }
    };

    const totalPrice = parseInt(duration) * 50;

    return (
        <section className="section-full" style={{ minHeight: '85vh', justifyContent: 'center' }}>
            <div className="glass-card" style={{ maxWidth: '520px', width: '100%' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{ fontSize: '42px', marginBottom: '0.75rem', lineHeight: 1 }}>📅</div>
                    <h1 className="heading-section" style={{ fontSize: '30px', marginBottom: '0.5rem' }}>Book a Session</h1>
                    <p className="body-caption" style={{ color: 'var(--text-tertiary)' }}>Pick a date and time to hang out with Sameer</p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div className="glass-form-group">
                        <label className="glass-label">Date</label>
                        <input type="date" required value={date} onChange={(e) => setDate(e.target.value)} className="glass-input" />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div className="glass-form-group">
                            <label className="glass-label">Start Time</label>
                            <select value={startTime} onChange={(e) => setStartTime(e.target.value)} className="glass-input">
                                <option value="9">9:00 AM</option>
                                <option value="10">10:00 AM</option>
                                <option value="11">11:00 AM</option>
                                <option value="12">12:00 PM</option>
                                <option value="13">1:00 PM</option>
                                <option value="14">2:00 PM</option>
                                <option value="15">3:00 PM</option>
                                <option value="16">4:00 PM</option>
                                <option value="17">5:00 PM</option>
                            </select>
                        </div>
                        <div className="glass-form-group">
                            <label className="glass-label">Duration</label>
                            <select value={duration} onChange={(e) => setDuration(e.target.value)} className="glass-input">
                                <option value="1">1 Hour</option>
                                <option value="2">2 Hours</option>
                                <option value="3">3 Hours</option>
                            </select>
                        </div>
                    </div>

                    <div className="glass-form-group">
                        <label className="glass-label">Message / Notes</label>
                        <textarea rows="3" placeholder="Tell Sameer if you're bringing treats..." value={notes} onChange={(e) => setNotes(e.target.value)} className="glass-input"></textarea>
                    </div>

                    {/* Price */}
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        borderRadius: '14px',
                        border: '1px solid rgba(255, 255, 255, 0.06)',
                        padding: '1.25rem',
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <span className="body-standard" style={{ color: 'var(--text-secondary)' }}>Per hour</span>
                            <span className="body-standard">$50</span>
                        </div>
                        <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.06)', margin: '0.5rem 0' }}></div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span className="card-title">Total</span>
                            <span className="card-title" style={{ color: 'var(--accent-bright)' }}>${totalPrice}</span>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary"
                        style={{
                            width: '100%',
                            padding: '14px',
                            fontSize: '15px',
                            marginTop: '0.25rem',
                            opacity: loading ? 0.5 : 1,
                            cursor: loading ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {loading ? '✨ Processing...' : '🐾 Confirm Booking'}
                    </button>
                </form>
            </div>
        </section>
    );
}
