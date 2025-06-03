const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const { getHomePage, signup, login, getSignupPage, getLoginPage } = require('../controllers/user.controller');

=======
const { getHomePage, signup, login, getSignupPage, getLoginPage ,getRegister ,registerAsTelecaller } = require('../controllers/user.controller');
const upload = require('../middlewares/upload');  
>>>>>>> 015e47b095f8a90b74d7f4e2eeb9f102f2ffc4e7
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
<<<<<<< HEAD
=======

router.get('/registerAsTelecaller', getRegister);
router.post('/registerAsTelecaller', upload.single('profilePhoto'), registerAsTelecaller);
>>>>>>> 015e47b095f8a90b74d7f4e2eeb9f102f2ffc4e7
module.exports = router;
