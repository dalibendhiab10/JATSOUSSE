import axios from 'axios';

const discordWebhookUrl = 'https://discord.com/api/webhooks/1215417549387333662/p5_9w5pFCyHnOVj6CFX3E5dUEYNHdw1T-Vzk7eGp8nW8_uK9GXWG-cPwHva8PoQW4gmN';

export async function sendToDiscord(data: any) {
 try {
    const response = await axios.post(discordWebhookUrl, {
      content: JSON.stringify(data),
    });
    console.log('Message sent to Discord:', response.status);
 } catch (error) {
    console.error('Error sending message to Discord:', error);
 }
}