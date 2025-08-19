const userService = require('../services/user.service');
const TelecallerRepository = require("../repositories/telecaller.repository");
const userRepository = require('../repositories/user.repository');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const Telecaller = require('../models/telecaller.model');
const planService = require('../services/plan.service');
const subscriptionService = require('../services/subscription.service');
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
    const totalUsers = await Telecaller.countDocuments();

    // Total number of pages
    const totalPages = Math.ceil(totalUsers / limit);

    // Fetch users with pagination
   const telecallers = await Telecaller.find()
  .skip(skip)
  .limit(limit)
  .populate('userId') // Only select specific fields
  .lean();

    res.render("pages/superAdmin", {
      title: "Admin Panel",
      telecallers,
      currentPage: page,
      totalPages,
    });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).send("Something went wrong");
  }
};

const getSupAdminPlans = async (req, res) => {
  if (req.session.supAdmin !== true) {
    return res.redirect("/superadmin/login");
  }

  try {
       const user = req.session.user;
        const plans = await planService.getAllPlans();
        
    res.render("pages/superAdminPlans", { title: 'plan Page',user, plans });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).send("Something went wrong");
  }
};

const getSupAdminRevenue = async (req, res) => {
  if (req.session.supAdmin !== true) {
    return res.redirect("/superadmin/login");
  }

  try {
    const user = req.session.user;
    const subscriptions = await subscriptionService.getAllSubscriptions();

    // Only count successful payments
    const totalRevenue = subscriptions
      .filter(sub => sub.status === 'paid')
      .reduce((sum, sub) => sum + (sub.amount || 0), 0);

    res.render("pages/superAdminRevenue", { 
      title: 'Revenue Page',
      user, 
      subscriptions,
      totalRevenue
    });
  } catch (err) {
    console.error("Error fetching revenue:", err);
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
        res.status(500).send("Something went wrong");
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
        res.status(500).send("Something went wrong");
    }


}
const editPlan = async (req, res) => {

    try {
       
        id = req.params.id
      
      if (req.session.supAdmin !== true) {
            return res.redirect("/superadmin/login");
          }else{
            const updateData = req.body;
            
            // Update the plan
            const updatedPlan = await planService.updatePlan(id, updateData);
            
            if (updatedPlan) {
                // Redirect to plans list or show success message
                res.redirect("/superadmin/plans?success=Plan updated successfully");
          }
        }
       
    }
    catch (err) {
        res.status(500).send("Something went wrong");
    }


}
const getEditUser = async (req, res) => {

    try {
      console.log("i am hgkml,")
        id = req.params.id
        if (req.session.supAdmin !== true) {
          console.log("i am not be here")
            return res.redirect("/superadmin/login");
          }else{
            console.log("i am should be here")
            let telecaller = await Telecaller.findById(id).populate('userId');
            console.log(telecaller)
            res.render("pages/superAdminEditUser", { title: "Edit Plan", telecaller })
          }
      

     
    }
    catch (err) {
      res.status(500).send("Something went wrong");  
    }


}
const getEditPlan = async (req, res) => {

    try {
       console.log("i am hereeeeeeeeeeeeeeeeeeeeeeee222222")
        id = req.params.id
        if (req.session.supAdmin !== true) {
            return res.redirect("/superadmin/login");
          }else{
            let plan = await planService.getPlanById(id);
            res.render("pages/superAdminEditPlan", { title: "Edit Plan", plan })
          }
      

     
    }
    catch (err) {
      res.status(500).send("Something went wrong");  
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
  getSupAdminPlans,
  getEditPlan,
  superAdminlogout,
  editPlan,
  login,
  supLogin,
  getEditUser,
  getSupAdminRevenue,
getSupAdminPanel,
  getAdminPanel,
getSupLoginPage,
  getLoginPage,
};