const userService = require('../services/user.service');

const getHomePage = (req, res) => {
<<<<<<< HEAD
  res.render('pages/home', { title: 'Home Page' });
=======
  const user = req.session.user;
  res.render('pages/home', { title: 'Home Page',user });
>>>>>>> 015e47b095f8a90b74d7f4e2eeb9f102f2ffc4e7
};

const getLoginPage = (req, res) => {
    res.render('pages/login',  { title: "Login" });
};

const getSignupPage = (req, res) => {
    res.render('pages/signup',  { title: "Login" });
};
<<<<<<< HEAD

=======
const getRegister= (req, res) => {
  let user = req.session.user;
  if(user){
   res.render('pages/register',  { title: "register" });
  }else{
    res.redirect('/login');
  }
    
};
>>>>>>> 015e47b095f8a90b74d7f4e2eeb9f102f2ffc4e7
const signup = async (req, res, next) => {
  try {
    const user = await userService.signupUser(req.body);
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    next(error);
  }
};
<<<<<<< HEAD
const login = async (req, res, next) => {
  try {
    const user = await userService.loginUser(req.body);
    res.status(200).json({ message: 'Login successful', user });
=======
const registerAsTelecaller = async (req, res) => {
  try {
    const userData = req.body;
    if (req.file) {
      userData.profilePhoto = req.file.filename; // or full path if you need
    }

    const result = await userService.registerUser(userData);
    res.status(200).json({ success: true, user: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const login = async (req, res, next) => {
  try {
    const user = await userService.loginUser(req.body);
    req.session.user = user;
    res.status(200).redirect('/');
>>>>>>> 015e47b095f8a90b74d7f4e2eeb9f102f2ffc4e7
  } catch (error) {
    next(error);
  }
};

<<<<<<< HEAD
=======



>>>>>>> 015e47b095f8a90b74d7f4e2eeb9f102f2ffc4e7
module.exports = {
  signup,
  login,
  getHomePage,
<<<<<<< HEAD
  getLoginPage,
  getSignupPage
=======
  getRegister,
  getLoginPage,
  getSignupPage,
  registerAsTelecaller
>>>>>>> 015e47b095f8a90b74d7f4e2eeb9f102f2ffc4e7
};
