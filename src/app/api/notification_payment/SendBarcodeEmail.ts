// Import necessary modules
import { NextResponse } from 'next/server';
import { createCanvas } from 'canvas';
import nodemailer from 'nodemailer';
import JsBarcode from 'jsbarcode';
import path from 'path';
import fs from 'fs';

// Function to generate barcode and send email
export async function sendBarcodeEmail(recipientEmail: string, barcodeString: string, fullname: string) {
    // Create a canvas
    const canvas = createCanvas(400, 100);
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
        subject: `Confirmation de votre billet électronique N°${barcodeString} - "The 70s" - JAT Sousse`,
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
            <p><img src="https://i.imgur.com/ZZLI6yB.png"></p>
            <hr style="margin-top:10px;margin-bottom:65px;border:none;border-bottom:1px solid black" />
            <h3 style="font-family:poppins ;font-weight:500">Cher(e) ${fullname}</h3>
            <p
                style="font-family:poppins;font-size: 15px; margin-left: auto; margin-right: auto; text-align: justify;color: #666;line-height:1.5;">
                Nous vous remercions d'avoir choisi notre plateforme de vente de billets en ligne pour réserver vos
                places pour le spectacle "The 70's: A Symphony of Decades", présenté par l'Association des Jeunes
                Artistes Tunisiens Sousse.
                <br /><br />
                Voici un récapitulatif de votre achat :
                <br />
                Spectacle : <a style=" color: black ; font-weight:bold"> "The 70's: A Symphony of Decades"</a><br />
                Date : <a style=" color: black ; font-weight:bold"> 17 Mars 2024</a><br />
                Heure : <a style=" color: black ; font-weight:bold"> 21h30</a><br />
                Lieu : <a style=" color: black ; font-weight:bold"> Théâtre Municipal de Sousse</a>
                <br><br>

                En pièce jointe, vous trouverez votre billet électronique.
            </p>

            <table style="width:100%;">
            </table>
            <p
                style="font-family: poppins, sans-serif; font-weight: normal; color: #2A2A2A; text-align: center; ;font-size: 20px; letter-spacing: 6px;font-weight: normal; border: 2px solid black; padding: 15px;">
                <img src="cid:barcodeImage" alt="Barcode" />
                ${barcodeString}
            </p>
            <p
                style="font-family:poppins;font-size: 15px; margin-left: auto; margin-right: auto; text-align: justify;color: #666;line-height:1.5;">
                Nous espérons que vous apprécierez le spectacle et que vous passerez une soirée mémorable avec nous.

                Si vous avez des questions ou des préoccupations, n'hésitez pas à nous contacter à <a
                    href="mailto:jat.sousse@gmail.com"> notre Email</a> ou par <a
                    href="tel:+216 39 158 643">téléphone</a>.
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
        `
        ,
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
            return false;
        } else {
            console.log('Email sent: ' + info.response);
            return true;
        }
    });
}

/*export async function POST(request: Request, response: Response) {
    // Generate barcode and send email
    await sendBarcodeEmail('kaltisami@gmail.com', '1234567890128','Sami Kalti');

    return NextResponse.json({ success: true, message: "Barcode created and email sent" });
}*/