import { NextRequest,NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest, res: NextResponse) {

        const total_tickets_sold = await prisma.ticket.count({
            where:{
                isPaid:true,
            }
        });

        const physical_tickets_sold = await prisma.ticket.count({
            where:{
                isPaid:true,
                type:"physical"
            }
        });

        const e_tickets_sold = await prisma.ticket.count({
            where:{
                isPaid:true,
                type:"etick"
            }
        });


    return NextResponse.json({total : (total_tickets_sold*10), physical_tickets_sold, e_tickets_sold,total_tickets_sold });
}