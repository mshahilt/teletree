const userService = require('../services/user.service');
const TelecallerRepository = require("../repositories/telecaller.repository");
const bcrypt = require('bcrypt');
const User = require("../models/user.model");
const getLoginPage = (req, res) => {
    if (req.session.admin) {
        res.redirect("/admin")
    }
    else {
        res.render("pages/admin-login", { title: "Admin Login" })
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
    res.redirect("/admin");
  } catch (err) {
    console.log(err);
    res.redirect("/admin/login");
  }
};

const getAdminPanel = async(req, res) => {
 
 if(req.session.admin !== true){
    res.redirect("/admin/login")
 }else{
 res.render('pages/admin', { title: 'admin panel'});
 }
  
 
  
};

module.exports = {

  login,

  getAdminPanel,

  getLoginPage,
};