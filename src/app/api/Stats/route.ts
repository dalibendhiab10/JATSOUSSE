import { NextRequest,NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {

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

        const stats_per_vendor = await prisma.ticket.groupBy({
            by: ['soldBy'],
            _count: {
                // To count the total number of tickets sold by each vendor:
                _all: true,
            },
            where: {
                type: {
                    in: ["physical", "etick"],
                },
            },
        });

    return NextResponse.json({total_tickets_sold, physical_tickets_sold, e_tickets_sold, stats_per_vendor});
}