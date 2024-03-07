// Import necessary modules
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { createCanvas } from 'canvas';
import fs from 'fs';
import path from 'path';
import JsBarcode from 'jsbarcode';

const prisma = new PrismaClient();

// Function to generate barcode and send email
async function sendBarcodeEmail(recipientEmail: string, barcodeString: string) {
    // Create a canvas
    const canvas = createCanvas(400, 100);
    const ctx = canvas.getContext('2d');

    // Generate barcode onto the canvas using JsBarcode
    JsBarcode(canvas, barcodeString, {
        format: 'CODE128',
        width: 2,
        height: 40,
        displayValue: false // Disable the display of the barcode value
    });

    // Save the barcode image
    const barcodeImagePath = path.join(__dirname, 'barcode.png');
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(barcodeImagePath, buffer);

    // Set up the email content
    const mailOptions: nodemailer.SendMailOptions = {
        from: 'acamar.org@gmail.com',
        to: recipientEmail,
        subject: 'Barcode Example',
        html: `<h1>Barcode Example</h1>
        
        <p style="display :flex">
            <img src="cid:barcodeImage" alt="Barcode"/>
        
            </p>`,
        attachments: [{
            filename: 'barcode.png',
            content: buffer,
            cid: 'barcodeImage' // Content ID for embedding the image in HTML
        }]
    };

    // Set up the transporter
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'acamar.org@gmail.com',
            pass: 'ksqk mcnp eond qdop',
        },
    });

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

export async function POST(request: Request, response: Response) {
    // Generate barcode and send email
    await sendBarcodeEmail('bendhiabdali@gmail.com', '1234567890128');

    return NextResponse.json({ success: true, message: "Barcode created and email sent" });
}
