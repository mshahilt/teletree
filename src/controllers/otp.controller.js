const otpService = require('../services/otpService');

const sendOtp = async (req, res, next) => {
  try {
    await otpService.sendOtpToEmail(req.body.email);
    res.render('pages/verify-otp', { email: req.body.email, success: 'OTP sent successfully' });
  } catch (err) {
    res.render('pages/signup', { error: err.message });
  }
};

const verifyOtp = async (req, res, next) => {
  const { email, otp } = req.body;
  try {
    await otpService.verifyOtp(email, otp);
    res.redirect('/signup-form'); 
  } catch (err) {
    res.render('pages/verify-otp', { email, error: err.message });
  }
};

module.exports = {
  sendOtp,
  verifyOtp
};
