import axios from 'axios';

const discordWebhookUrl = 'https://discord.com/api/webhooks/1215605685593710612/2w_QRykI1fUsg16L-sG7ONuA3qCTDHiEyuCdbTCU6_zPrW2m6N8u5jq2UzIgggJwq6kP';

export async function sendToDiscord(data: any) {
 try {
    const response = await axios.post(discordWebhookUrl, data);
    console.log('Message sent to Discord:', response.status);
 } catch (error) {
    console.error('Error sending message to Discord:', error);
 }
}