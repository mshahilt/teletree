const Razorpay = require('razorpay');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAYKEYID,
  key_secret: process.env.RAZORPAYKEYSECRET
});

module.exports = razorpay;