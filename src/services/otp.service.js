const OTP = require('../models/otp.model');
const generateOtp = require('../utils/generateOtp');
const {sendOtp} = require('../utils/sendOtp');

const sendOtpToPhone = async (phone) => {
  const otp = generateOtp();
  await OTP.deleteMany({phone});
  await OTP.create({ phone, otp });

  await sendOtp(phone,`Your OTP is: ${otp} Don't share it with anyone`);
};

const verifyOtp = async (phone, submittedOtp) => {
  console.log("phone: ", phone);
  console.log("submittedOtp: ", submittedOtp);
  const otpRecord = await OTP.findOne({ phone }).sort({ createdAt: -1 });

  if (!otpRecord) throw new Error('No OTP found or it expired');
  if (otpRecord.otp !== submittedOtp) throw new Error('Invalid OTP');

  await OTP.deleteMany({ phone });
  return true;
};

module.exports = {
  sendOtpToPhone,
  verifyOtp
};
