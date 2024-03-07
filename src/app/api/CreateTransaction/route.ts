import { NextResponse } from "next/server";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request, response: Response) {
  const secretKey = process?.env?.RECAPTCHA_SECRET_KEY;

  const postData = await request.json();
  const { gRecaptchaToken, FirstName, LastName, Email, Phone ,Qte } =postData;

  

  let res: any;
  const formData = `secret=${secretKey}&response=${gRecaptchaToken}`;
  try {
    res = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      formData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
  } catch (e) {
    console.log("recaptcha error:", e);
  }

  if (res && res.data?.success && res.data?.score > 0.5) {
    let orderId = uuidv4().split('-')[0] +"-"+ uuidv4().split('-')[1]  ;
    const body = 
      {
        "amount": (10000*Qte),
        "description": `THE 70s : A SYMPHONY OF DECADES | paiement de ${Qte} Tickets`,
        "firstName": FirstName,
        "lastName": LastName,
        "phoneNumber": Phone,
        "email": Email,
        "orderId": orderId,
      
        "receiverWalletId": process?.env?.PAYMENT_MODE == "prod" ? process?.env?.PAYMENT_PROD_WALLET_ID : process?.env?.PAYMENT_PREPROD_WALLET_ID,
        "token": "TND",
        "type": "immediate",
        "acceptedPaymentMethods": [
          "wallet",
          "bank_card",
          "e-DINAR",
        ],
        "lifespan": 10,
        "checkoutForm": false,
        "addPaymentFeesToAmount": true,
        "silentWebhook": false,
      
        "webhook": `${process?.env?.PAYMENT_PREPROD_URL}/api/notification_payment`,
        "successUrl": "http://localhost:3002/Completed",
        "failUrl": "https://dev.konnect.network/Error",
        
        "theme": "light"
      }
      const headers = {
        "x-api-key" : process?.env?.PAYMENT_MODE == "prod" ? process?.env?.PAYMENT_PROD_KEY : process?.env?.PAYMENT_PREPROD_KEY
      }
      let dataresponse={
        Payurl:"",
        paymentRef:""
      }
      if (process?.env?.PAYMENT_MODE == "prod") {
        await axios.post(`${process?.env?.PAYMENT_PROD_URL}/payments/init-payment`, body, {headers: headers})
        .then(res => {
          dataresponse={
            Payurl:res.data?.payUrl,
            paymentRef:res.data?.paymentRef
          }

        })
      } else {
        await axios.post(`${process?.env?.PAYMENT_PREPROD_URL}/payments/init-payment`, body, {headers: headers})
        .then(res => {
          dataresponse={
            Payurl:res.data?.payUrl,
            paymentRef:res.data?.paymentRef
          }
        })
      }


    return NextResponse.json({
      ...dataresponse,
      success: true,
      score: res.data?.score,
      
    });
  } else {
    console.log("fail: res.data?.score:", res.data?.score);
    return NextResponse.json({ success: false, name, score: res.data?.score });
  }
}