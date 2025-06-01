const express = require('express');
const router = express.Router();
const { getHomePage, signup, login, getSignupPage, getLoginPage } = require('../controllers/user.controller');

router.get('/', getHomePage);

router.post('/sms-deliver-status', (req, res) => {
  const deliveryReport = req.body;

  console.log('📩 Delivery Status Callback Received');
  console.log(deliveryReport);

res.status(200).json({ message: 'Status received' });
});

router.get('/signup', getSignupPage);
router.post('/register', signup);

router.get('/login', getLoginPage);
router.post('/login', login);
module.exports = router;
