const express = require('express');
const router = express.Router();
const {sendOtp, verifyOtp} = require('../controllers/otp.controller');

router.get('/send', sendOtp);
router.post('/verify', verifyOtp);

module.exports = router;
