import { NextRequest, NextResponse } from 'next/server';
import { sendQrCodeEmail } from './sendQrCodeEmail';
import { PrismaClient } from '@prisma/client';
// @ts-nocheck

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const tickets = await prisma.ticket.findMany({
            where: {
                paymentId: body.id,
            },
        });

        if (!tickets || tickets.length === 0) {
            return NextResponse.json({ success: false, message: "No tickets found" });
        }

        const userId = tickets[0].userId;

        const client = await prisma.client.findFirst({
            where: {
                userId: userId, // Assuming `userId` is a string or number, not an ObjectId
            },
            select: {
                email: true,
                fullname: true,
            },
        });

        if (!client) {
            return NextResponse.json({ success: false, message: "Client not found" });
        }
        tickets.forEach(async (ticket) => {
            await sendQrCodeEmail(client.email, ticket.ticketId, client.fullname);

        })
        return NextResponse.json({ success: true, message: "Email sent" });


    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({ success: false, message: "Internal server error" });
    }
}