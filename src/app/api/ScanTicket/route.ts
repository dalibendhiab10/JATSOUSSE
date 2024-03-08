import { NextRequest,NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import {sendToDiscord} from './DiscordWebHook';

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {

        const body = await req.json();

        const ticket = await prisma.ticket.findUnique({
            where: {
                ticketId: body.ticketId,
            }
        });
        
        if (ticket?.isUsed && ticket?.isPaid) {
                const discordData = {
                    embeds: [{
                       title: 'Ticket is already sold and scanned ! CANNOT BE RESCANNED !',
                       description: `Ticket ID: ${ticket?.ticketId}`,
                       fields: [{
                         name: 'Scanned By',
                         value: `AdminId: ${ticket?.scannedBy}`, 
                       }],
                       color: 16711680,
                    }]}
            await sendToDiscord(discordData);
            return NextResponse.json({ message: "Ticket is already sold and used" });
        } else if (!ticket?.isPaid){
            const discordData = {
                embeds: [{
                   title: 'Ticket is not paid ! CANNOT BE SCANNED !',
                   description: `Ticket ID: ${ticket?.ticketId}`,
                   fields: [{
                     name: 'Scanned By',
                     value: `AdminId: ${ticket?.scannedBy}`, 
                   }],
                   color: 16711680,
                }]}
            await sendToDiscord(discordData);
            return NextResponse.json({ message: "Ticket is not paid ! CANNOT BE SCANNED" });
        } else if (!ticket){
            return NextResponse.json({ message: "Ticket is not found" });
        }
        
        await prisma.ticket.update({
            where: {
                ticketId: body.ticketId,
            },
            data: {
                isUsed: true,
                scannedBy: body.adminId,
            }
        }).then(async (ticket) => {
            const discordData = {
                embeds: [{
                   title: 'Ticket Scanned',
                   description: `Ticket ID: ${ticket?.ticketId}`,
                   fields: [{
                     name: 'Scanned By',
                     value: `AdminId: ${ticket?.scannedBy}`, 
                   }],
                   color: 65280,
                }]
            };
        await sendToDiscord(discordData);
    })
    return NextResponse.json({ message: "Ticket is Scanned" });
}