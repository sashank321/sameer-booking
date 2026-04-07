import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';

export default async function AdminPage() {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
        redirect('/');
    }

    const bookings = await prisma.booking.findMany({
        orderBy: { createdAt: 'desc' },
        include: { user: true }
    });

    return (
        <section className="section-full" style={{ minHeight: '85vh', paddingTop: '4rem' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <div style={{ fontSize: '36px', marginBottom: '0.75rem', lineHeight: 1 }}>🛠️</div>
                    <h1 className="heading-section" style={{ fontSize: '30px', marginBottom: '0.5rem' }}>Admin Dashboard</h1>
                    <p className="body-caption" style={{ color: 'var(--text-tertiary)' }}>
                        {bookings.length} booking{bookings.length !== 1 ? 's' : ''} total
                    </p>
                </div>

                {bookings.length === 0 ? (
                    <div className="glass-card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                        <div style={{ fontSize: '48px', marginBottom: '1rem', lineHeight: 1 }}>📭</div>
                        <p className="body-standard" style={{ color: 'var(--text-secondary)' }}>No bookings yet. Sameer is waiting!</p>
                    </div>
                ) : (
                    <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
                        <div className="admin-table-wrapper">
                            <table className="glass-table">
                                <thead>
                                    <tr>
                                        <th>User</th>
                                        <th>Date</th>
                                        <th>Time</th>
                                        <th>Duration</th>
                                        <th>Total</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bookings.map((booking) => (
                                        <tr key={booking.id}>
                                            <td>{booking.user?.name || booking.user?.email}</td>
                                            <td>{new Date(booking.date).toLocaleDateString()}</td>
                                            <td>{booking.startTime}:00</td>
                                            <td>{booking.duration} hr{booking.duration > 1 ? 's' : ''}</td>
                                            <td style={{ color: 'var(--accent-bright)', fontWeight: '600' }}>${booking.totalPrice}</td>
                                            <td>
                                                <span className={`status-badge ${booking.status === 'CONFIRMED' ? 'status-confirmed' : 'status-pending'}`}>
                                                    {booking.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
