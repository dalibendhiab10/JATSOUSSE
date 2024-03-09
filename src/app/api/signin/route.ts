import { NextRequest,NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {

    try {
        const body = await req.json();
        const {username,password}=body;
        const user = await prisma.admin.findUnique({
            where: {
                username: username,
            },
        });

        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {
                return NextResponse.json({success:true });
            } else {
                return NextResponse.json   ({ success: false, message: 'Invalid password' });
            }
        } else {
            
            return NextResponse.json({ success: false, message: 'Invalid username' });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success:false, message: 'An error occurred' });
    }
      
}