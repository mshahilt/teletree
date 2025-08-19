const express=require("express");
const router=express.Router();
const planController = require('../controllers/plan.controller');
const { getSupAdminPanel,getSupLoginPage,getEditUser,getSupAdminRevenue,supLogin,editPlan,blockUser,getEditPlan,unblockUser,getSupAdminPlans,superAdminlogout } = require('../controllers/admin.controller');
const upload = require('../middlewares/upload');  

//login routes
router.get("/login",getSupLoginPage)
router.post("/login",supLogin)
router.post('/logout', superAdminlogout);
//dashBoard Routes
router.patch('/block/:id',blockUser)
router.patch('/unblock/:id',unblockUser)
router.get("/",getSupAdminPanel)
router.get("/plans",getSupAdminPlans)
router.get("/revenue",getSupAdminRevenue)
router.get('/editUser/:id', getEditUser);
router.get('/editPlan/:id',getEditPlan)
router.post('/editPlan/:id',editPlan)
module.exports=router