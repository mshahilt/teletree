const OTP = require('../models/otp.model');
const generateOtp = require('../utils/generateOtp');
const {sendOtp} = require('../utils/sendOtp');

const sendOtpToPhone = async (phone) => {
  const otp = generateOtp();
  await OTP.deleteMany({phone});
  await OTP.create({ phone, otp });

<<<<<<< HEAD
  // await sendOtp(phone,`Your OTP is: ${otp} Don't share it with anyone`);
=======
  await sendOtp(phone,`Your OTP is: ${otp} Don't share it with anyone`);
>>>>>>> 015e47b095f8a90b74d7f4e2eeb9f102f2ffc4e7
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
