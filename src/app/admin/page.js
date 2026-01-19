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
        <div className="container" style={{ padding: '4rem 1rem' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Admin Dashboard</h1>

            <div style={{ backgroundColor: 'white', border: '1px solid var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ backgroundColor: 'var(--surface)' }}>
                        <tr>
                            <th style={{ padding: '1rem', textAlign: 'left' }}>User</th>
                            <th style={{ padding: '1rem', textAlign: 'left' }}>Date</th>
                            <th style={{ padding: '1rem', textAlign: 'left' }}>Time</th>
                            <th style={{ padding: '1rem', textAlign: 'left' }}>Duration</th>
                            <th style={{ padding: '1rem', textAlign: 'left' }}>Total</th>
                            <th style={{ padding: '1rem', textAlign: 'left' }}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.length === 0 ? (
                            <tr><td colSpan="6" style={{ padding: '2rem', textAlign: 'center' }}>No bookings found.</td></tr>
                        ) : bookings.map((booking) => (
                            <tr key={booking.id} style={{ borderTop: '1px solid var(--border)' }}>
                                <td style={{ padding: '1rem' }}>{booking.user?.name || booking.user?.email}</td>
                                <td style={{ padding: '1rem' }}>{new Date(booking.date).toLocaleDateString()}</td>
                                <td style={{ padding: '1rem' }}>{booking.startTime}:00</td>
                                <td style={{ padding: '1rem' }}>{booking.duration} hr(s)</td>
                                <td style={{ padding: '1rem' }}>${booking.totalPrice}</td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={{
                                        padding: '0.25rem 0.5rem',
                                        borderRadius: '999px',
                                        fontSize: '0.875rem',
                                        backgroundColor: booking.status === 'CONFIRMED' ? '#c6f6d5' : '#fed7d7',
                                        color: booking.status === 'CONFIRMED' ? '#22543d' : '#822727'
                                    }}>
                                        {booking.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
