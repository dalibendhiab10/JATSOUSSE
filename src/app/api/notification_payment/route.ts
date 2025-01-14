import { NextRequest,NextResponse } from 'next/server';
import {sendQrCodeEmail} from './sendQrCodeEmail';
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import {sendToDiscord} from './DiscordWebHook';
import axios from 'axios';

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
                        sendQrCodeEmail(datatoget?.payment.paymentDetails?.email, ticketId, datatoget?.payment.paymentDetails?.name)
                    })
                }
            })
        }).then(async (response) => {
            const discordData = {
                embeds: [{
                   title: datatoget?.payment.status === "completed" ? 'New Payment Received' : 'Payment',
                   description: `Payment ID: ${datatoget?.payment.id},
                                \nAmount: ${datatoget?.payment.amount}, 
                                \nStatus: ${datatoget?.payment.status}`,
                   fields: [{
                     name: 'User Information',
                     value: `User: ${datatoget?.payment.paymentDetails?.name}, 
                        \nEmail: ${datatoget?.payment.paymentDetails?.email}`,
                   }],
                   color: datatoget?.payment.status === "completed" ? 65280 : 16711680, // Green for completed, Red for others
                }]
            };
            // Send the data to Discord
            await sendToDiscord(discordData);
        })
        return NextResponse.redirect(`${process?.env?.NEXT_URL_REDIRECT}/Completed`);
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
        }).then(async (response) => {
            const discordData = {
                embeds: [{
                   title: datatoget?.payment.status === "completed" ? 'New Payment Received' : 'Payment',
                   description: `Payment ID: ${datatoget?.payment.id},
                                \nAmount: ${datatoget?.payment.amount}, 
                                \nStatus: ${datatoget?.payment.status}`,
                   fields: [{
                     name: 'User Information',
                     value: `User: ${datatoget?.payment.paymentDetails?.name}, 
                        \nEmail: ${datatoget?.payment.paymentDetails?.email}`,
                   }],
                   color: datatoget?.payment.status === "completed" ? 65280 : 16711680, // Green for completed, Red for others
                }]
            };
            // Send the data to Discord
            await sendToDiscord(discordData);
        })
        
        return NextResponse.redirect(`${process?.env?.NEXT_URL_REDIRECT}/Error`);

    }
    
}