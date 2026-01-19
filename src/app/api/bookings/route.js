import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(req) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const isAdmin = session.user.role === 'ADMIN';
        const where = isAdmin ? {} : { userId: session.user.id };

        const bookings = await prisma.booking.findMany({
            where,
            orderBy: { date: 'desc' },
            include: { user: true }
        });

        return NextResponse.json(bookings);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
    }
}

export async function POST(req) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await req.json();
        const { date, startTime, duration, notes } = body;

        // Calculate price (e.g., $50/hour)
        const hourlyRate = 50;
        const totalPrice = duration * hourlyRate;

        // Create Booking
        const booking = await prisma.booking.create({
            data: {
                userId: session.user.id,
                date: new Date(date),
                startTime: parseInt(startTime),
                duration: parseInt(duration),
                totalPrice,
                notes,
                status: 'CONFIRMED' // Auto-confirm for demo
            }
        });

        return NextResponse.json(booking);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Booking failed' }, { status: 500 });
    }
}
