import axios from 'axios';

const discordWebhookUrl = 'https://discord.com/api/webhooks/1215596684285968404/WFDvD-COcn9ltgE3uvRFi9qaTaWYNLhR-scjgvSEy8BtrP9ZGEkT9mejt_3DP6bslvOq';

export async function sendToDiscord(data: any) {
 try {
    const response = await axios.post(discordWebhookUrl, data);
    console.log('Message sent to Discord:', response.status);
 } catch (error) {
    console.error('Error sending message to Discord:', error);
 }
}