// Import necessary modules
// @ts-nocheck

import { createCanvas } from 'canvas';
import nodemailer from 'nodemailer';
import QRCode from 'qrcode';
import path from 'path';
import fs from 'fs';

// Function to generate QR code and send email
export async function sendQrCodeEmail(recipientEmail:string, qrCodeString:string, fullname:string) {
    // Generate QR code
    const qrCodeImagePath = path.join(__dirname, 'qrcode.png');
    const qrCodeCanvas = createCanvas(400, 400);

    await QRCode.toCanvas(qrCodeCanvas, qrCodeString, {
        width: 400,
        margin: 2,
    });

    // Save the QR code image
    const buffer = qrCodeCanvas.toBuffer('image/png');
    fs.writeFileSync(qrCodeImagePath, buffer);

    // Set up the email content
    const mailOptions = {
        from: 'jatsousse.dev@gmail.com',
        to: recipientEmail,
        subject: `Confirmation de votre billet électronique N°${qrCodeString} - "Megyes" - JAT Sousse`,
        html: `
        <!DOCTYPE html>
<html lang="en">

<head>
    <style>
        body {
            background: url('https://i.imgur.com/ZZLI6yB.png') no-repeat;
            background-size: cover;
        }

        img {
            width: 100%;
        }
    </style>
</head>

<body>
    <div
        style="max-width:550px; min-width:320px;  background-color: white; border: 1px solid #DDDDDD; margin-right: auto; margin-left: auto;">
        <div style="margin-left:30px;margin-right:30px">
            <p>&nbsp;</p>
            <p><img src="https://i.imgur.com/1wh1uaN.png"></p>
            <hr style="margin-top:10px;margin-bottom:65px;border:none;border-bottom:1px solid black" />
            <h3 style="font-family:poppins ;font-weight:500">Cher(e) ${fullname}</h3>
            <p
                style="font-family:poppins;font-size: 15px; margin-left: auto; margin-right: auto; text-align: justify;color: #666;line-height:1.5;">
                Nous vous remercions d'avoir choisi notre plateforme de vente de billets en ligne pour réserver vos
                places pour le spectacle "Megyes", présenté par l'Association des Jeunes
                Artistes Tunisiens Sousse.
                <br /><br />
                Voici un récapitulatif de votre achat :
                <br />
                Spectacle : <a style=" color: black ; font-weight:bold"> "Megyes"</a><br />
                Date : <a style=" color: black ; font-weight:bold"> 25 Janvier 2025</a><br />
                Heure : <a style=" color: black ; font-weight:bold"> 18h00</a><br />
                Lieu : <a style=" color: black ; font-weight:bold"> Théâtre Municipal de Sousse</a>
                <br><br>

                En pièce jointe, vous trouverez votre billet électronique.
            </p>

            <table style="width:100%;">
            </table>
            <p
                style="font-family: poppins, sans-serif; font-weight: normal; color: #2A2A2A; text-align: center; ;font-size: 20px; letter-spacing: 6px;font-weight: normal; border: 2px solid black; padding: 15px;">
                <img src="cid:qrCodeImage" alt="QR Code" />
                ${qrCodeString}
            </p>
            <p
                style="font-family:poppins;font-size: 15px; margin-left: auto; margin-right: auto; text-align: justify;color: #666;line-height:1.5;">
                Nous espérons que vous apprécierez le spectacle et que vous passerez une soirée mémorable avec nous.

                Si vous avez des questions ou des préoccupations, n'hésitez pas à nous contacter à <a
                    href="mailto:jat.sousse@gmail.com"> notre Email</a> ou par <a
                    href="tel:+216 93 158 643">téléphone</a>.
                <br><br>Cordialement,
                <br>L'équipe de JAT Sousse
            </p>
        </div>
        <hr style="margin-top:2px;" />
        <p style="text-align:center;margin-bottom:15px"><small
                style="text-align:center;font-family:poppins;font-size:10px;color:#666;">Developed By
                <a href="https://www.linkedin.com/in/medalibendhiab" style="color:#666">Mohamed Ali bendhiab</a> </p>

    </div>
</body>

</html>
        `,
        attachments: [{
            filename: 'qrcode.png',
            content: buffer,
            cid: 'qrCodeImage' // Content ID for embedding the image in HTML
        }]
    };

    // Set up the transporter
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'jatsousse.dev@gmail.com',
            pass: process?.env?.GMAIL_PASSWORD,
        },
    });

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return false;
        } else {
            console.log('Email sent: ' + info.response);
            return true;
        }
    });
}

