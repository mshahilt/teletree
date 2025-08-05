const express=require("express");
const router=express.Router();

const { getSupAdminPanel,getSupLoginPage,supLogin,blockUser,unblockUser,superAdminlogout } = require('../controllers/admin.controller');
const upload = require('../middlewares/upload');  

//login routes
router.get("/login",getSupLoginPage)
router.post("/login",supLogin)
router.post('/logout', superAdminlogout);
//dashBoard Routes
router.patch('/block/:id',blockUser)
router.patch('/unblock/:id',unblockUser)
router.get("/",getSupAdminPanel)
module.exports=router