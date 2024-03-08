import { NextRequest,NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import {sendToDiscord} from './DiscordWebHook';

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {

        const body = await req.json();

        const ticket = await prisma.ticket.findUnique({
            where: {
                ticketId: body.ticketId,
                type: "physical"
            }
        });
        
        if (ticket?.isPaid && !ticket?.isUsed) {
            const discordData = {
                embeds: [{
                   title: 'Physical Ticket Is Already Sold',
                   description: `Ticket ID: ${ticket?.ticketId}`,
                   fields: [{
                     name: 'Vendor Information',
                     value: `VendorId: ${ticket?.soldBy}`, 
                   }],
                   color: ticket?.isUsed && ticket?.isPaid ? 65280 : 16711680,
                }]
            };
        await sendToDiscord(discordData);
            return NextResponse.json({ success: true, message: "Ticket is already sold" });
        } else if (ticket?.isUsed && ticket?.isPaid) {
            const discordData = {
                embeds: [{
                   title: 'Physical Ticket Is Already Sold',
                   description: `Ticket ID: ${ticket?.ticketId}`,
                   fields: [{
                     name: 'Vendor Information',
                     value: `VendorId: ${ticket?.soldBy}`, 
                   }],
                   color: ticket?.isUsed && ticket?.isPaid ? 65280 : 16711680,
                }]
            };
        await sendToDiscord(discordData);
            return NextResponse.json({ success: true, message: "Ticket is already sold and used" });
        } else if (!ticket){
            return NextResponse.json({ success: true, message: "Ticket is not found" });
        }
        
        await prisma.ticket.update({
            where: {
                ticketId: body.ticketId,
            },
            data: {
                isPaid: true,
                soldBy: body.adminId,
            }
        }).then(async (ticket) => {
            const discordData = {
                embeds: [{
                   title: 'Physical Ticket Sold',
                   description: `Ticket ID: ${ticket?.ticketId}`,
                   fields: [{
                     name: 'Vendor Information',
                     value: `VendorId: ${ticket?.soldBy}`, 
                   }],
                   color: ticket?.isPaid ? 65280 : 16711680,
                }]
            };
        await sendToDiscord(discordData);
    })
    return NextResponse.json({ success: true, message: "200" });
}