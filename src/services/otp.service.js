const OTP = require('../models/otpModel');
const generateOtp = require('../utils/generateOtp');
const sendEmail = require('../utils/sendMail');

const sendOtpToEmail = async (email) => {
  const otp = generateOtp();

  await OTP.create({ email, otp });

  await sendEmail(email, 'Your OTP Code', `Your OTP is: ${otp}`);
};

const verifyOtp = async (email, submittedOtp) => {
  const otpRecord = await OTP.findOne({ email }).sort({ createdAt: -1 });

  if (!otpRecord) throw new Error('No OTP found or it expired');
  if (otpRecord.otp !== submittedOtp) throw new Error('Invalid OTP');

  await OTP.deleteMany({ email });
  return true;
};

module.exports = {
  sendOtpToEmail,
  verifyOtp
};
