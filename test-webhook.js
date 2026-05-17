const axios = require('axios');

const TEST_URL = 'http://localhost:3000/api/webhooks/zalo';

const mockEvent = {
  senderId: 'zalo_uid_12345',
  message: {
    text: 'mua Chivas',
  },
  timestamp: Date.now(),
};

async function testWebhook() {
  try {
    console.log('Sending mock event to:', TEST_URL);
    const response = await axios.post(TEST_URL, mockEvent);
    console.log('Response status:', response.status);
    console.log('Response data:', JSON.stringify(response.data, null, 2));
  } catch (error) {
    if (error.response) {
      console.error('Test failed with status:', error.response.status);
      console.error('Response data:', JSON.stringify(error.response.data, null, 2));
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
  }
}

testWebhook();
