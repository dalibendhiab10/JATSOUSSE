import axios from 'axios';

const discordWebhookUrl = process?.env?.DISCORD_WEBHOOK_URL;

export async function sendToDiscord(data: any) {
 try {
    const response = await axios.post(discordWebhookUrl, data);
 } catch (error) {
    console.error('Error sending message to Discord:', error);
 }
}