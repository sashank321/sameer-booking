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
            <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Please Log In</h1>
                <p style={{ marginBottom: '2rem' }}>You need to be signed in to book a session with Sameer.</p>
                <button onClick={() => signIn()} className="btn btn-primary">Log In</button>
            </div>
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
                alert('Booking Confirmed! Woof!');
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
        <div className="container" style={{ padding: '4rem 1rem', maxWidth: '600px' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>Book a Session</h1>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Date</label>
                    <input
                        type="date"
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Start Time</label>
                        <select value={startTime} onChange={(e) => setStartTime(e.target.value)}>
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

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Duration (Hours)</label>
                        <select value={duration} onChange={(e) => setDuration(e.target.value)}>
                            <option value="1">1 Hour</option>
                            <option value="2">2 Hours</option>
                            <option value="3">3 Hours</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Message / Notes</label>
                    <textarea
                        rows="3"
                        placeholder="Tell Sameer if you're bringing treats..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    ></textarea>
                </div>

                <div style={{ padding: '1.5rem', backgroundColor: 'var(--surface)', borderRadius: 'var(--radius)', marginTop: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span>Price per hour:</span>
                        <span>$50</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.25rem' }}>
                        <span>Total:</span>
                        <span>${totalPrice}</span>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary"
                    style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}
                >
                    {loading ? 'Processing...' : 'Confirm Booking'}
                </button>

            </form>
        </div>
    );
}
