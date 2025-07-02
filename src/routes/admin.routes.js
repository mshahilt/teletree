const express=require("express");
const router=express.Router();

const { getAdminPanel,getLoginPage,login } = require('../controllers/admin.controller');
const upload = require('../middlewares/upload');  

//login routes
router.get("/login",getLoginPage)
router.post("/login",login)
//dashBoard Routes

router.get("/",getAdminPanel)
module.exports=router