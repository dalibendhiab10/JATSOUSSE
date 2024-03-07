import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { NextRequest,NextResponse } from 'next/server';
import axios from 'axios';
import {sendBarcodeEmail} from './SendBarcodeEmail';

const prisma = new PrismaClient();
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const payment_ref = req.url.split('=')[1];
    // console.log(payment_ref)
    const headers = {
        "x-api-key": process?.env?.PAYMENT_MODE == "prod" ? process?.env?.PAYMENT_PROD_KEY : process?.env?.PAYMENT_PREPROD_KEY
    }
    let datatoget: any;
    if (process?.env?.PAYMENT_MODE == "prod") {

        await axios.get(`${process?.env?.PAYMENT_PROD_URL}/payments/${payment_ref}`, { headers: headers })
            .then(async (response) => {
                datatoget = response.data;

            })
    }
    else {

        await axios.get(`${process?.env?.PAYMENT_PREPROD_URL}/payments/${payment_ref}`, { headers: headers })
            .then(async (response) => {
                datatoget = response.data

            })
    }
    if (datatoget?.payment.status == "completed") {

        let uuid = uuidv4();
        let userId = uuidv4();
        await prisma.client.create({
            data: {
                fullname: datatoget?.payment.paymentDetails?.name,
                email: datatoget?.payment.paymentDetails?.email,
                phone: datatoget?.payment.paymentDetails?.phoneNumber,
                userId: userId,
            }
        }).then(async (response) => {
            await prisma.payment.create({
                data: {

                    amount: datatoget?.payment.amount,
                    id: datatoget?.payment.id,
                    status: "completed",

                }
            }).then(async (response) => {
                for (let i = 1; (i <= (datatoget?.payment?.amount / 10000)); i++) {
                    let uuid = uuidv4(); // Move the uuid generation inside the loop
                    let ticketId = BigInt('0x' + uuid.replace(/-/g, '')).toString().slice(0, 12);
                
                    await prisma.ticket.create({
                        data: {
                            ticketId: ticketId,
                            isPaid: true,
                            isUsed: false,
                            userId: userId,
                            paymentId: datatoget?.payment.id,
                            type: "etick"
                        }
                    }).then(async (response) => {
                        sendBarcodeEmail(datatoget?.payment.paymentDetails?.email, ticketId, datatoget?.payment.paymentDetails?.name)
                    })
                }
            })
        })
        return NextResponse.redirect('http://localhost:3002/Completed');
     
    }
    else{
        await prisma.payment.create({
            data: {

                amount: datatoget?.payment.amount,
                id: datatoget?.payment.id,
                status: datatoget?.payment.status,

            }
        }).then(async (response) => {
          await prisma.client.create({
                data: {
                    fullname: datatoget?.payment.paymentDetails?.name,
                    email: datatoget?.payment.paymentDetails?.email,
                    phone: datatoget?.payment.paymentDetails?.phoneNumber,
                    userId: uuidv4(),
                }
            })
        })
        return NextResponse.redirect('http://localhost:3002/Completed');

    }
}