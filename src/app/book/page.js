'use client';

import { useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import Link from 'next/link';

const timeSlots = [
    { value: '9', label: '9:00 AM', period: 'Morning' },
    { value: '10', label: '10:00 AM', period: 'Morning' },
    { value: '11', label: '11:00 AM', period: 'Morning' },
    { value: '12', label: '12:00 PM', period: 'Afternoon' },
    { value: '13', label: '1:00 PM', period: 'Afternoon' },
    { value: '14', label: '2:00 PM', period: 'Afternoon' },
    { value: '15', label: '3:00 PM', period: 'Afternoon' },
    { value: '16', label: '4:00 PM', period: 'Evening' },
    { value: '17', label: '5:00 PM', period: 'Evening' },
];

const activities = [
    { id: 'walk', emoji: '🚶', name: 'Park Walk', desc: 'A scenic walk through the local park' },
    { id: 'play', emoji: '🎾', name: 'Play Session', desc: 'Fetch, frisbee, and fun at the field' },
    { id: 'cuddle', emoji: '🛋️', name: 'Cuddle Time', desc: 'Cozy indoor hangout with snacks' },
    { id: 'photo', emoji: '📸', name: 'Photo Shoot', desc: 'Professional-quality dog portraits' },
];

function StepIndicator({ current, total }) {
    return (
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '2rem' }}>
            {Array.from({ length: total }, (_, i) => (
                <div key={i} style={{
                    width: i === current ? '32px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    background: i === current
                        ? 'linear-gradient(90deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7))'
                        : i < current
                            ? 'rgba(255, 255, 255, 0.4)'
                            : 'rgba(255,255,255,0.12)',
                    transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
                }} />
            ))}
        </div>
    );
}

function Sidebar({ currentTab, setTab }) {
    return (
        <aside className="dashboard-sidebar" style={{
            background: 'rgba(20, 20, 20, 0.4)',
            backdropFilter: 'blur(40px)',
            borderRight: '1px solid rgba(255, 255, 255, 0.1)',
            minHeight: '80vh',
            padding: '2.5rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '2.5rem',
            width: '280px',
            flexShrink: 0,
        }}>
            <style dangerouslySetInnerHTML={{ __html: `
                .sidebar-section-title {
                    font-size: 11px;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    color: rgba(255, 255, 255, 0.4);
                    font-weight: 700;
                    margin-bottom: 0.75rem;
                    padding-left: 1rem;
                }
                .sidebar-item {
                    display: flex;
                    align-items: center;
                    width: 100%;
                    padding: 14px 16px;
                    border-radius: 16px;
                    background: transparent;
                    border: none;
                    color: rgba(255, 255, 255, 0.6);
                    font-size: 15px;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
                    text-align: left;
                    margin-bottom: 4px;
                }
                .sidebar-item:hover {
                    background: rgba(255, 255, 255, 0.05);
                    color: rgba(255, 255, 255, 0.9);
                    transform: translateX(4px);
                }
                .sidebar-item--active {
                    background: linear-gradient(135deg, rgba(191, 90, 242, 0.2), rgba(255, 255, 255, 0.05));
                    color: #fff;
                    box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.2), 0 8px 16px rgba(0, 0, 0, 0.2);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }
                .sidebar-item--active:hover {
                    transform: scale(1.02);
                    background: linear-gradient(135deg, rgba(191, 90, 242, 0.3), rgba(255, 255, 255, 0.1));
                }
                .sidebar-icon {
                    margin-right: 12px;
                    font-size: 20px;
                    filter: saturate(1.5);
                }
                .sidebar-badge {
                    margin-left: auto;
                    background: rgba(191, 90, 242, 0.8);
                    color: white;
                    font-size: 11px;
                    padding: 2px 8px;
                    border-radius: 12px;
                    font-weight: bold;
                }
            ` }} />
            <div className="sidebar-section">
                <div className="sidebar-section-title">Menu</div>
                <button className={`sidebar-item ${currentTab === 'documents' ? 'sidebar-item--active' : ''}`} onClick={() => setTab('documents')}>
                    <span className="sidebar-icon">📄</span> View Documents
                </button>
                <button className={`sidebar-item ${currentTab === 'book' ? 'sidebar-item--active' : ''}`} onClick={() => setTab('book')}>
                    <span className="sidebar-icon">📅</span> Schedule Session
                    <span className="sidebar-badge">1</span>
                </button>
                <button className={`sidebar-item ${currentTab === 'history' ? 'sidebar-item--active' : ''}`} onClick={() => setTab('history')}>
                    <span className="sidebar-icon">🕒</span> Booking History
                </button>
            </div>
            <div className="sidebar-section">
                <div className="sidebar-section-title">Your Account</div>
                <button className={`sidebar-item ${currentTab === 'login' ? 'sidebar-item--active' : ''}`} onClick={() => setTab('login')}>
                    <span className="sidebar-icon">🔒</span> Login & Security
                </button>
                <button className={`sidebar-item ${currentTab === 'support' ? 'sidebar-item--active' : ''}`} onClick={() => setTab('support')}>
                    <span className="sidebar-icon">💬</span> Support Request
                </button>
            </div>
        </aside>
    );
}

function DocumentsTab() {
    const docs = [
        { id: 1, name: 'Vaccination Records', date: 'Oct 12, 2023', size: '2.4 MB', type: 'PDF' },
        { id: 2, name: 'Pet Passport', date: 'Jul 04, 2022', size: '1.1 MB', type: 'IMG' },
        { id: 3, name: 'Vet Emergency Info', date: 'Jan 15, 2024', size: '0.8 MB', type: 'PDF' },
    ];
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%' }}>
            <div>
                <h2 className="mask-text" style={{ fontSize: '28px', marginBottom: '0.5rem' }}>Your Documents</h2>
                <p className="body-standard" style={{ color: 'var(--text-secondary)' }}>Manage Sameer's health and identification records.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
                {docs.map(doc => (
                    <div key={doc.id} className="glass-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                        <div style={{ fontSize: '32px', opacity: 0.8 }}>{doc.type === 'PDF' ? '📄' : '🖼️'}</div>
                        <div style={{ flex: 1 }}>
                            <div className="card-title" style={{ fontSize: '15px', marginBottom: '0.25rem' }}>{doc.name}</div>
                            <div className="body-caption" style={{ color: 'var(--text-tertiary)' }}>{doc.date} • {doc.size}</div>
                        </div>
                        <button style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '6px 12px', color: 'var(--text-primary)', cursor: 'pointer' }}>View</button>
                    </div>
                ))}
            </div>
            <button className="btn-primary" style={{ alignSelf: 'flex-start', marginTop: '1rem' }}>+ Upload Document</button>
        </div>
    );
}

function HistoryTab() {
    const history = [
        { id: 'SMR-X9QA', date: 'Mar 15, 2024', activity: 'Park Walk', duration: '1 hr', price: '$50', status: 'Completed' },
        { id: 'SMR-B2VZ', date: 'Feb 28, 2024', activity: 'Photo Shoot', duration: '2 hrs', price: '$100', status: 'Completed' },
        { id: 'SMR-L1MN', date: 'Feb 10, 2024', activity: 'Play Session', duration: '1 hr', price: '$50', status: 'Completed' },
    ];
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%' }}>
            <div>
                <h2 className="mask-text" style={{ fontSize: '28px', marginBottom: '0.5rem' }}>Booking History</h2>
                <p className="body-standard" style={{ color: 'var(--text-secondary)' }}>Review your past adventures with Sameer.</p>
            </div>
            <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)' }}>
                            <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 500, fontSize: '13px' }}>ID</th>
                            <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 500, fontSize: '13px' }}>Date</th>
                            <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 500, fontSize: '13px' }}>Activity</th>
                            <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 500, fontSize: '13px' }}>Price</th>
                            <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 500, fontSize: '13px' }}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.map(row => (
                            <tr key={row.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                <td style={{ padding: '1rem', color: 'var(--text-primary)', fontSize: '14px', fontFamily: 'monospace' }}>{row.id}</td>
                                <td style={{ padding: '1rem', color: 'var(--text-primary)', fontSize: '14px' }}>{row.date}</td>
                                <td style={{ padding: '1rem', color: 'var(--text-primary)', fontSize: '14px' }}>{row.activity} ({row.duration})</td>
                                <td style={{ padding: '1rem', color: 'var(--text-primary)', fontSize: '14px' }}>{row.price}</td>
                                <td style={{ padding: '1rem' }}><span style={{ background: 'rgba(48,209,88,0.15)', color: 'rgba(48,209,88,1)', padding: '4px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: 600 }}>{row.status}</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function SecurityTab() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%', maxWidth: '600px' }}>
            <div>
                <h2 className="mask-text" style={{ fontSize: '28px', marginBottom: '0.5rem' }}>Login & Security</h2>
                <p className="body-standard" style={{ color: 'var(--text-secondary)' }}>Manage your account authentication and preferences.</p>
            </div>
            <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <div className="card-title" style={{ fontSize: '16px', marginBottom: '0.25rem' }}>Email Address</div>
                        <div className="body-caption" style={{ color: 'var(--text-tertiary)' }}>Primary email for bookings</div>
                    </div>
                    <button className="btn-secondary" style={{ padding: '8px 16px', fontSize: '13px' }}>Change</button>
                </div>
                <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.08)' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <div className="card-title" style={{ fontSize: '16px', marginBottom: '0.25rem' }}>Password</div>
                        <div className="body-caption" style={{ color: 'var(--text-tertiary)' }}>Last changed 3 months ago</div>
                    </div>
                    <button className="btn-secondary" style={{ padding: '8px 16px', fontSize: '13px' }}>Update</button>
                </div>
                <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.08)' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <div className="card-title" style={{ fontSize: '16px', marginBottom: '0.25rem' }}>Two-Factor Auth</div>
                        <div className="body-caption" style={{ color: 'var(--text-tertiary)' }}>Secure your account</div>
                    </div>
                    <div style={{ width: '44px', height: '24px', background: 'rgba(48,209,88,1)', borderRadius: '12px', position: 'relative', cursor: 'pointer' }}>
                        <div style={{ width: '20px', height: '20px', background: 'white', borderRadius: '50%', position: 'absolute', top: '2px', right: '2px', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }} />
                    </div>
                </div>
            </div>
        </div>
    );
}

function SupportTab() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%', maxWidth: '600px' }}>
            <div>
                <h2 className="mask-text" style={{ fontSize: '28px', marginBottom: '0.5rem' }}>Support Request</h2>
                <p className="body-standard" style={{ color: 'var(--text-secondary)' }}>Need help with a booking? Send us a message.</p>
            </div>
            <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', padding: '2rem' }}>
                <div className="glass-form-group">
                    <label className="glass-label">Issue Topic</label>
                    <select className="glass-input" style={{ appearance: 'none', background: 'rgba(255,255,255,0.04)', color: 'var(--text-primary)' }}>
                        <option>Booking Modification</option>
                        <option>Cancellation & Refunds</option>
                        <option>General Question</option>
                    </select>
                </div>
                <div className="glass-form-group">
                    <label className="glass-label">Message</label>
                    <textarea className="glass-input" rows="5" placeholder="Describe how we can help..."></textarea>
                </div>
                <button className="btn-primary" style={{ padding: '12px', marginTop: '0.5rem' }}>Submit Request</button>
            </div>
        </div>
    );
}

export default function BookPage() {
    const { data: session } = useSession();
    const [currentTab, setTab] = useState('book');
    const [step, setStep] = useState(0);
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [duration, setDuration] = useState('1');
    const [activity, setActivity] = useState('');
    const [notes, setNotes] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [bookingId, setBookingId] = useState('');

    // Render the main content depending on tab state
    const renderContent = () => {
        if (!session) {
            return (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
                    <div className="conic-border-wrapper">
                        <div className="glass-card" style={{ maxWidth: '420px', width: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div style={{ fontSize: '48px', marginBottom: '1.25rem', lineHeight: 1 }}>🔐</div>
                            <h1 className="mask-text" style={{ fontSize: '26px', marginBottom: '0.75rem' }}>Sign In Required</h1>
                            <p className="body-standard" style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                                You need to be signed in to access your dashboard and book sessions.
                            </p>
                            <button onClick={() => signIn()} className="btn-primary">
                                Sign In
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        if (currentTab === 'documents') return <DocumentsTab />;
        if (currentTab === 'history') return <HistoryTab />;
        if (currentTab === 'login') return <SecurityTab />;
        if (currentTab === 'support') return <SupportTab />;

    const totalPrice = parseInt(duration || '1') * 50;
    const selectedTime = timeSlots.find(t => t.value === startTime);
    const selectedActivity = activities.find(a => a.id === activity);

    const handleConfirm = () => {
        const id = 'SMR-' + Date.now().toString(36).toUpperCase();
        setBookingId(id);
        setConfirmed(true);
    };

        // ── Confirmed view ──
        if (confirmed) {
            return (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
                    <div className="conic-border-wrapper">
                    <div className="glass-card" style={{ maxWidth: '520px', width: '100%', textAlign: 'center' }}>
                        {/* Success animation */}
                        <div style={{
                            width: '80px', height: '80px', borderRadius: '50%',
                            background: 'linear-gradient(135deg, rgba(48,209,88,0.2), rgba(48,209,88,0.05))',
                            border: '2px solid rgba(48,209,88,0.4)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            margin: '0 auto 1.5rem', fontSize: '36px',
                        }}>
                            ✓
                        </div>

                        <h1 className="mask-text" style={{ fontSize: '32px', marginBottom: '0.5rem' }}>
                            Booking Confirmed!
                        </h1>
                        <p className="body-standard" style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                            Sameer is excited to meet you! 🐾
                        </p>

                        {/* Booking details card */}
                        <div style={{
                            background: 'rgba(255,255,255,0.04)',
                            borderRadius: '16px',
                            border: '1px solid rgba(255,255,255,0.08)',
                            padding: '1.5rem',
                            marginBottom: '1.5rem',
                            textAlign: 'left',
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <span className="body-caption" style={{ color: 'var(--text-tertiary)' }}>Booking ID</span>
                                <span className="card-title" style={{ fontSize: '14px', color: 'var(--accent-bright)', fontFamily: 'monospace' }}>{bookingId}</span>
                            </div>
                            <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.06)', margin: '0.75rem 0' }} />
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                                <div>
                                    <span className="body-caption" style={{ color: 'var(--text-tertiary)', display: 'block', marginBottom: '2px' }}>Date</span>
                                    <span className="body-standard">{new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                                </div>
                                <div>
                                    <span className="body-caption" style={{ color: 'var(--text-tertiary)', display: 'block', marginBottom: '2px' }}>Time</span>
                                    <span className="body-standard">{selectedTime?.label}</span>
                                </div>
                                <div>
                                    <span className="body-caption" style={{ color: 'var(--text-tertiary)', display: 'block', marginBottom: '2px' }}>Activity</span>
                                    <span className="body-standard">{selectedActivity?.emoji} {selectedActivity?.name}</span>
                                </div>
                                <div>
                                    <span className="body-caption" style={{ color: 'var(--text-tertiary)', display: 'block', marginBottom: '2px' }}>Duration</span>
                                    <span className="body-standard">{duration} hour{duration > 1 ? 's' : ''}</span>
                                </div>
                            </div>
                            <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.06)', margin: '0.75rem 0' }} />
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span className="card-title">Total Paid</span>
                                <span className="card-title" style={{ color: 'var(--accent-bright)', fontSize: '20px' }}>${totalPrice}</span>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                            <Link href="/" className="btn-secondary">Back Home</Link>
                            <button onClick={() => { setConfirmed(false); setStep(0); setDate(''); setStartTime(''); setActivity(''); setNotes(''); }} className="btn-primary">
                                Book Again
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1rem 0' }}>
                <div className="conic-border-wrapper">
                <div className="glass-card" style={{ maxWidth: '560px', width: '100%' }}>
                    <StepIndicator current={step} total={4} />

                    {/* ── Step 0: Choose Activity ── */}
                    {step === 0 && (
                        <div>
                            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                                <div style={{ fontSize: '42px', marginBottom: '0.75rem', lineHeight: 1 }}>🐕</div>
                                <h1 className="mask-text" style={{ fontSize: '28px', marginBottom: '0.5rem' }}>Choose an Activity</h1>
                                <p className="body-caption" style={{ color: 'var(--text-tertiary)' }}>What would you like to do with Sameer?</p>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '2rem' }}>
                                {activities.map((act) => (
                                    <button
                                        key={act.id}
                                        onClick={() => setActivity(act.id)}
                                        style={{
                                            background: activity === act.id ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.04)',
                                            border: activity === act.id ? '1.5px solid rgba(255,255,255,0.5)' : '1px solid rgba(255,255,255,0.08)',
                                            borderRadius: '14px',
                                            padding: '1.25rem 1rem',
                                            textAlign: 'center',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease',
                                            color: 'var(--text-primary)',
                                        }}
                                    >
                                        <div style={{ fontSize: '28px', marginBottom: '0.5rem' }}>{act.emoji}</div>
                                        <div className="card-title" style={{ fontSize: '14px', marginBottom: '0.25rem' }}>{act.name}</div>
                                        <div className="body-caption" style={{ color: 'var(--text-tertiary)', fontSize: '11px' }}>{act.desc}</div>
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={() => activity && setStep(1)}
                                disabled={!activity}
                                className="btn-primary"
                                style={{ width: '100%', padding: '14px', opacity: activity ? 1 : 0.4 }}
                            >
                                Continue →
                            </button>
                        </div>
                    )}

                    {/* ── Step 1: Pick Date & Time ── */}
                    {step === 1 && (
                        <div>
                            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                                <div style={{ fontSize: '42px', marginBottom: '0.75rem', lineHeight: 1 }}>📅</div>
                                <h1 className="mask-text" style={{ fontSize: '28px', marginBottom: '0.5rem' }}>Pick a Date & Time</h1>
                                <p className="body-caption" style={{ color: 'var(--text-tertiary)' }}>When are you free to hang out?</p>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
                                <div className="glass-form-group">
                                    <label className="glass-label">Date</label>
                                    <input type="date" required value={date} onChange={(e) => setDate(e.target.value)} className="glass-input" />
                                </div>

                                <div className="glass-form-group">
                                    <label className="glass-label">Time Slot</label>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                                        {timeSlots.map((slot) => (
                                            <button
                                                key={slot.value}
                                                onClick={() => setStartTime(slot.value)}
                                                style={{
                                                    background: startTime === slot.value ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.04)',
                                                    border: startTime === slot.value ? '1.5px solid rgba(255,255,255,0.5)' : '1px solid rgba(255,255,255,0.08)',
                                                    borderRadius: '10px',
                                                    padding: '0.6rem 0.4rem',
                                                    textAlign: 'center',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.3s ease',
                                                    color: 'var(--text-primary)',
                                                    fontSize: '13px',
                                                }}
                                            >
                                                {slot.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="glass-form-group">
                                    <label className="glass-label">Duration</label>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        {['1', '2', '3'].map((d) => (
                                            <button
                                                key={d}
                                                onClick={() => setDuration(d)}
                                                style={{
                                                    flex: 1,
                                                    background: duration === d ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.04)',
                                                    border: duration === d ? '1.5px solid rgba(255,255,255,0.5)' : '1px solid rgba(255,255,255,0.08)',
                                                    borderRadius: '10px',
                                                    padding: '0.75rem',
                                                    textAlign: 'center',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.3s ease',
                                                    color: 'var(--text-primary)',
                                                }}
                                            >
                                                <div className="card-title" style={{ fontSize: '16px' }}>{d}</div>
                                                <div className="body-caption" style={{ color: 'var(--text-tertiary)', fontSize: '11px' }}>hour{d > 1 ? 's' : ''}</div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '0.75rem' }}>
                                <button onClick={() => setStep(0)} className="btn-secondary" style={{ flex: 1, padding: '14px' }}>← Back</button>
                                <button
                                    onClick={() => date && startTime && setStep(2)}
                                    disabled={!date || !startTime}
                                    className="btn-primary"
                                    style={{ flex: 2, padding: '14px', opacity: date && startTime ? 1 : 0.4 }}
                                >
                                    Continue →
                                </button>
                            </div>
                        </div>
                    )}

                    {/* ── Step 2: Notes ── */}
                    {step === 2 && (
                        <div>
                            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                                <div style={{ fontSize: '42px', marginBottom: '0.75rem', lineHeight: 1 }}>💌</div>
                                <h1 className="mask-text" style={{ fontSize: '28px', marginBottom: '0.5rem' }}>Any Special Requests?</h1>
                                <p className="body-caption" style={{ color: 'var(--text-tertiary)' }}>Optional — let Sameer know what you're thinking</p>
                            </div>

                            <div className="glass-form-group" style={{ marginBottom: '2rem' }}>
                                <label className="glass-label">Message / Notes</label>
                                <textarea
                                    rows="4"
                                    placeholder="Bringing treats? Want to go to a specific park? Tell Sameer anything..."
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    className="glass-input"
                                />
                            </div>

                            <div style={{ display: 'flex', gap: '0.75rem' }}>
                                <button onClick={() => setStep(1)} className="btn-secondary" style={{ flex: 1, padding: '14px' }}>← Back</button>
                                <button onClick={() => setStep(3)} className="btn-primary" style={{ flex: 2, padding: '14px' }}>
                                    Review Booking →
                                </button>
                            </div>
                        </div>
                    )}

                    {/* ── Step 3: Review & Confirm ── */}
                    {step === 3 && (
                        <div>
                            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                                <div style={{ fontSize: '42px', marginBottom: '0.75rem', lineHeight: 1 }}>🎉</div>
                                <h1 className="mask-text" style={{ fontSize: '28px', marginBottom: '0.5rem' }}>Review Your Booking</h1>
                                <p className="body-caption" style={{ color: 'var(--text-tertiary)' }}>Make sure everything looks perfect</p>
                            </div>

                            {/* Summary card */}
                            <div style={{
                                background: 'rgba(255,255,255,0.04)',
                                borderRadius: '16px',
                                border: '1px solid rgba(255,255,255,0.08)',
                                padding: '1.5rem',
                                marginBottom: '1.5rem',
                            }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div>
                                        <span className="body-caption" style={{ color: 'var(--text-tertiary)', display: 'block', marginBottom: '4px' }}>Activity</span>
                                        <span className="body-standard">{selectedActivity?.emoji} {selectedActivity?.name}</span>
                                    </div>
                                    <div>
                                        <span className="body-caption" style={{ color: 'var(--text-tertiary)', display: 'block', marginBottom: '4px' }}>Date</span>
                                        <span className="body-standard">{date ? new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) : ''}</span>
                                    </div>
                                    <div>
                                        <span className="body-caption" style={{ color: 'var(--text-tertiary)', display: 'block', marginBottom: '4px' }}>Time</span>
                                        <span className="body-standard">{selectedTime?.label} ({selectedTime?.period})</span>
                                    </div>
                                    <div>
                                        <span className="body-caption" style={{ color: 'var(--text-tertiary)', display: 'block', marginBottom: '4px' }}>Duration</span>
                                        <span className="body-standard">{duration} hour{duration > 1 ? 's' : ''}</span>
                                    </div>
                                </div>

                                {notes && (
                                    <>
                                        <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.06)', margin: '1rem 0' }} />
                                        <div>
                                            <span className="body-caption" style={{ color: 'var(--text-tertiary)', display: 'block', marginBottom: '4px' }}>Notes</span>
                                            <span className="body-standard" style={{ color: 'var(--text-secondary)' }}>{notes}</span>
                                        </div>
                                    </>
                                )}

                                <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.06)', margin: '1rem 0' }} />

                                {/* Pricing */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                    <span className="body-standard" style={{ color: 'var(--text-secondary)' }}>{selectedActivity?.name} × {duration}hr</span>
                                    <span className="body-standard">${totalPrice}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                    <span className="body-standard" style={{ color: 'var(--text-secondary)' }}>Treat surcharge</span>
                                    <span className="body-standard" style={{ color: 'rgba(48,209,88,0.8)' }}>FREE 🎁</span>
                                </div>
                                <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.1)', margin: '0.75rem 0' }} />
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span className="card-title" style={{ fontSize: '16px' }}>Total</span>
                                    <span className="card-title" style={{ color: 'var(--accent-bright)', fontSize: '22px' }}>${totalPrice}</span>
                                </div>
                            </div>

                            {/* Booking for */}
                            <div style={{
                                background: 'rgba(255,255,255,0.03)',
                                borderRadius: '12px',
                                border: '1px solid rgba(255,255,255,0.06)',
                                padding: '0.85rem 1rem',
                                marginBottom: '1.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                            }}>
                                <div style={{
                                    width: '32px', height: '32px', borderRadius: '50%',
                                    background: 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05))',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '14px', fontWeight: '700',
                                }}>
                                    {session.user?.name?.[0]?.toUpperCase() || '?'}
                                </div>
                                <div>
                                    <div className="body-standard" style={{ fontSize: '14px' }}>{session.user?.name}</div>
                                    <div className="body-caption" style={{ color: 'var(--text-tertiary)', fontSize: '11px' }}>{session.user?.email}</div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '0.75rem' }}>
                                <button onClick={() => setStep(2)} className="btn-secondary" style={{ flex: 1, padding: '14px' }}>← Back</button>
                                <button onClick={handleConfirm} className="btn-primary" style={{ flex: 2, padding: '14px', fontSize: '15px' }}>
                                    🐾 Confirm & Pay ${totalPrice}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
        );
    };

    return (
        <div className="dashboard-layout">
            <Sidebar currentTab={currentTab} setTab={setTab} />
            <main className="dashboard-content">
                {renderContent()}
            </main>
        </div>
    );
}
