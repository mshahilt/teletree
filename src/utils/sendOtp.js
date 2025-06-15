const axios = require('axios');

async function sendOtp(number, otp) {
  const authKey = process.env.SMSAUTHKEY;
  const authToken = process.env.SMSAUTHTOKEN;
  console.log("authKey : ", authKey);
  console.log("auth token: ", authToken)
  const credentials = Buffer.from(`${authKey}:${authToken}`).toString('base64');

  const payload = {
    Text: `[BELLUCCIYA] Your OTP is ${otp}. Do not share this code with anyone.`,
    Number: number,
    SenderId: 'Belluc',
    DRNotifyUrl: 'https://7ed4-103-42-196-82.ngrok-free.app/sms-deliver-status',
    DRNotifyHttpMethod: 'POST',
    Tool: 'API'
  };

  try {
    const response = await axios.post(
      `https://restapi.smscountry.com/v0.1/Accounts/${authKey}/SMSes/`,
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${credentials}`
        }
      }
    );
    console.log('✅ SMS Sent');
    console.log(response.data);
  } catch (error) {
    console.error('❌ SMS Send Error');
    console.error(error.response?.data || error.message);
  }
}

module.exports = {
  sendOtp,
};
