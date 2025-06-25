const express = require('express');
const router = express.Router();
const { getHomePage, signup, login, getSignupPage, getLoginPage,renderSearchPage ,getRegister,logout ,registerAsTelecaller, getAboutPage, getContactPage, getMe, renderTeleCallerSearch } = require('../controllers/user.controller');
const upload = require('../middlewares/upload');  
router.get('/', getHomePage);
router.get('/getMe', getMe);
router.get('/about', getAboutPage);
router.get('/contact', getContactPage);
router.post('/sms-deliver-status', (req, res) => {
  const deliveryReport = req.body;

  console.log('📩 Delivery Status Callback Received');
  console.log(deliveryReport);

res.status(200).json({ message: 'Status received' });
});

router.get('/signup', getSignupPage);
router.post('/register', signup);

router.get('/login', getLoginPage);
router.get('/tele-caller-search', renderTeleCallerSearch);
router.get('/search', renderSearchPage);
router.post('/login', login);
router.post('/logout', logout);
router.get('/registerAsTelecaller', getRegister);
router.post('/registerAsTelecaller',upload.fields([{ name: 'profilePhoto' }, { name: 'cv' }, { name: 'experienceCertificate' }])
, registerAsTelecaller);
module.exports = router;
