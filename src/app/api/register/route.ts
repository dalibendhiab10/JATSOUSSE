import { NextRequest,NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {

    try {
        const body = await req.json();
        const {fullname,username,password}=body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.admin.create({
            data: {
                adminId: Math.floor(Math.random() * 1000000),
                fullname: fullname,
                username: username,
                password: hashedPassword,
            },
        });
    
        if (user) {
            return NextResponse.json({success:true });
        }
        else {
            return NextResponse.json({ success:false });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success:false, error: 'An error occurred' });
    }
      
}