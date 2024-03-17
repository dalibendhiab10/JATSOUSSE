// route.ts
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request: Request, response: Response) {
    try {
        const data = await prisma.ticket.findMany({
            where:{
                type:"physical",
            }
        });
        return NextResponse.json({ success: true, data :data});
    } catch (error) {
        return NextResponse.json({ success: false, message: error });
    }
}