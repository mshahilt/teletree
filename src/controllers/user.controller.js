const userService = require('../services/user.service');
const TelecallerRepository = require("../repositories/telecaller.repository");
const getHomePage = async(req, res) => {
  const user = req.session.user;
  let telecallers = await TelecallerRepository.getAll();
 
    // console.log("telecallers: ", telecallers);
  res.render('pages/home', { title: 'Home Page',user ,telecallers});
  // res.json(telecallers);
};
const getMe = async(req, res) => {
  const thisUser = await req.session.user;
  res.status(200).json({message: true,  thisUser})
};
const getAboutPage = async(req, res) => {
  const user = req.session.user;
  res.render('pages/about', { title: 'about Page',user });
};
const getContactPage = async(req, res) => {
  const user = req.session.user;
  res.render('pages/contact', { title: 'Contact Page',user });
};

const getLoginPage = (req, res) => {
    res.render('pages/login',  { title: "Login" });
};

const getSignupPage = (req, res) => {
    res.render('pages/signup',  { title: "Login" });
};
const getRegister= (req, res) => {
  let user = req.session.user;
  if(user){
   res.render('pages/register',  { title: "register", user });
  }else{
    res.redirect('/login');
  }
    
};
const signup = async (req, res, next) => {
  try {
    const user = await userService.signupUser(req.body);
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    next(error);
  }
};
const registerAsTelecaller = async (req, res) => {
  try {
    const userData = req.body;
    console.log("req.files: ", req.files);
    if (req.file) {
      userData.profilePhoto = req.file.filename; 
    }
    const thisUser = req.session.user;
    const result = await userService.registerUser(userData, thisUser);
    res.status(200).json({ success: true, user: result });
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: error.message });
  }
};

const renderTeleCallerSearch = async (req, res) => {
  try {
    const filters = req.query; 
    console.log("filterskjhkj", filters);
    const telecallers = await TelecallerRepository.searchTelecallers(filters);
    res.status(200).json({ success: true,  telecallers});
  } catch (error) {
    res.status(500).send('Error loading telecaller search page');
  }
};

const renderSearchPage = async (req, res)  => {
     try {
        const searchParams = {
            district: req.query.district || '',
            age: req.query.age || '',
            gender: req.query.gender || '',
            jobCategory: req.query.jobCategory || ''
        };
        let user = req.session.user;

        let professionals = [];
        
        if (Object.values(searchParams).some(param => param !== '')) {
            let minAge = null;

            const filters = {
                district: searchParams.district,
                gender: searchParams.gender,
                jobCategory: searchParams.jobCategory,
                age: minAge
            };

            professionals = await TelecallerRepository.searchTelecallers(filters);
        }

        res.render('pages/search', {
            professionals: professionals,
            searchParams: searchParams,
            user
        });
    } catch (error) {
        console.error('Error in search route:', error);
        res.status(500).render('error', { 
            message: 'Error loading search results',
            error: error 
        });
    }
}

const login = async (req, res, next) => {
  try {
    const user = await userService.loginUser(req.body);
    req.session.user = user;
    res.status(200).redirect('/');
  } catch (error) {
    next(error);
  }
};




module.exports = {
  signup,
  login,
  getHomePage,
  getRegister,
  getLoginPage,
  getSignupPage,
  getAboutPage,
  getContactPage,
  registerAsTelecaller,
  getMe,
  renderTeleCallerSearch,
  renderSearchPage
};
