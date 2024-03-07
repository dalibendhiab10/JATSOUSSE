import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();
export async function POST(request: Request, response: Response) {
    // for (let i = 0; i < 600; i++) {
    //     let uuid = uuidv4();
    //     let numericUuid = BigInt('0x' + uuid.replace(/-/g, '')).toString().slice(0, 12);
    //     await prisma.ticket.create({
    //         data: {
    //             ticketId: numericUuid,
    //             type: "physical",
    //             isUsed: false,
    //             isPaid: false,
    //         }
    //     });
    // }   
    return NextResponse.json({success:false, message:"403"});


}