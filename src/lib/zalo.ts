import axios from 'axios';

export const zaloClient = {
  async sendMessage(senderId: string, message: string) {
    try {
      const response = await axios.post(
        'https://openapi.zalo.me/v2.0/oa/message',
        {
          recipient: { user_id: senderId },
          message: { text: message }
        },
        {
          headers: {
            'access_token': process.env.ZALO_ACCESS_TOKEN,
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data;
    } catch (error: any) {
      console.error('Error sending Zalo message:', error.response?.data || error.message);
      throw error;
    }
  }
};
