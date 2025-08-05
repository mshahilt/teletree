const userService = require('../services/user.service');
const TelecallerRepository = require("../repositories/telecaller.repository");
const userRepository = require('../repositories/user.repository');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const getLoginPage = (req, res) => {
    if (req.session.admin) {
        res.redirect("/admin")
    }
    else {
        res.render("pages/admin-login", { title: "Admin Login" })
    }

}
const getSupLoginPage = (req, res) => {
    if (req.session.supAdmin) {
        res.redirect("/superadmin")
    }
    else {
        res.render("pages/supAdmin-login", { title: "Admin Login" })
    }

}
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await User.findOne({ email: email });
    if (!admin || !admin.isAdmin) {
      req.flash('inv_admin', "Sorry invalid Admin!");
      return res.redirect("/admin/login");
    }

    const match = await bcrypt.compare(password, admin.password);
    if (!match) {
      req.flash('inv_admin', "Incorrect password!");
      return res.redirect("/admin/login");
    }

    req.session.admin = true;
    req.session.user.role="admin";
    res.redirect("/admin");
  } catch (err) {
    console.log(err);
    res.redirect("/admin/login");
  }
};

const supLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const supAdmin = await User.findOne({ email: email });
    if (!supAdmin || !supAdmin.isSuperAdmin) {
      req.flash('inv_admin', "Sorry invalid super Admin!");
      return res.redirect("/superadmin/login");
    }

    const match = await bcrypt.compare(password, supAdmin.password);
    if (!match) {
      req.flash('inv_admin', "Incorrect password!");
      return res.redirect("/superadmin/login");
    }

    req.session.supAdmin = true;
    // req.session.user.role="supAdmin";
    res.redirect("/superadmin");
  } catch (err) {
    console.log(err);
    res.redirect("/superadmin/login");
  }
};
const getAdminPanel = async(req, res) => {
 
 if(req.session.admin !== true){
    res.redirect("/admin/login")
 }else{
 res.render('pages/admin', { title: 'admin panel'});
 }
  
 
  
};
const getSupAdminPanel = async (req, res) => {
  if (req.session.supAdmin !== true) {
    return res.redirect("/superadmin/login");
  }

  try {
     const page = parseInt(req.query.page) || 1;
    const limit = 10; // you can change this
    const skip = (page - 1) * limit;

    // Total number of users
    const totalUsers = await User.countDocuments();

    // Total number of pages
    const totalPages = Math.ceil(totalUsers / limit);

    // Fetch users with pagination
    const users = await User.find().skip(skip).limit(limit).lean();

    res.render("pages/superAdmin", {
      title: "Admin Panel",
      users,
      currentPage: page,
      totalPages,
    });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).send("Something went wrong");
  }
};

const blockUser = async (req, res) => {

    try {
        id = req.params.id
        console.log("i am hereeeeeeeeeeeeeeeeeeeeeeee")
        await User.updateOne({ _id: id }, { $set: { isBlock: true } })

        res.redirect("/superadmin")
    }
    catch (err) {
       
    }

}
const unblockUser = async (req, res) => {

    try {
       console.log("i am hereeeeeeeeeeeeeeeeeeeeeeee222222")
        id = req.params.id
        await User.updateOne({ _id: id }, { $set: { isBlock: false } })

        res.redirect("/superadmin")
    }
    catch (err) {
       
    }

}
const superAdminlogout = (req, res) => {  
  req.session.destroy((err) => {
      if (err) {
          console.log(err)
      }
      else {
          res.redirect("/")

      }
  })
}


module.exports = {
unblockUser,
  blockUser,
  superAdminlogout,
  login,
  supLogin,
getSupAdminPanel,
  getAdminPanel,
getSupLoginPage,
  getLoginPage,
};