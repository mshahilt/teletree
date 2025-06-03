const otpService = require('../services/otp.service');

const sendOtp = async (req, res, next) => {
  try {
    const {phone} = req.query;
    console.log("phone : ", phone);
    await otpService.sendOtpToPhone(phone);
    
    // res.render('pages/verify-otp', { email: req.body.email, success: 'OTP sent successfully' });

    res.status(200).json({success: true});
  } catch (err) {
    console.log("while sending otp",err)
    res.status(400).json({success: false});
  }
};

const verifyOtp = async (req, res, next) => {
  const { phone, otp } = req.body;
  try {
    await otpService.verifyOtp(phone, otp);
    // res.redirect('/signup-form'); 
    res.status(200).json({ success: true });
  } catch (err) {
    // res.render('pages/verify-otp', { email, error: err.message });
    res.status(400).json({ success: false });

  }
};

module.exports = {
  sendOtp,
  verifyOtp
};
