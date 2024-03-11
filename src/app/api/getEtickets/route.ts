import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();
export async function POST(request: Request, response: Response) { 
    await prisma.payment.findMany().then((data) => {
        return NextResponse.json({success:true, data});
    }).catch((error) => {
        return NextResponse.json({success:false, message:error});
    })
    

}