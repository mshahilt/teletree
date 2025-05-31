const express = require('express');
const router = express.Router();
const { getHomePage, signup, login, getSignupPage, getLoginPage } = require('../controllers/user.controller');

router.get('/', getHomePage);

router.get('/signup', getSignupPage);
router.post('/signup', signup);

router.get('/login', getLoginPage);
router.post('/login', login);
module.exports = router;
