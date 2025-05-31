const userService = require('../services/user.service');

const getHomePage = (req, res) => {
  res.render('pages/home', { title: 'Home Page' });
};

const getLoginPage = (req, res) => {
    res.render('pages/login',  { title: "Login" });
};

const getSignupPage = (req, res) => {
    res.render('pages/signup',  { title: "Login" });
};

const signup = async (req, res, next) => {
  try {
    const user = await userService.signupUser(req.body);
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    next(error);
  }
};
const login = async (req, res, next) => {
  try {
    const user = await userService.loginUser(req.body);
    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  login,
  getHomePage,
  getLoginPage,
  getSignupPage
};
