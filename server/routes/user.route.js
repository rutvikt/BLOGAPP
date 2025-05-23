const express =require("express");
const { register, login, logout, myProfile, getAllAdmins } = require("../Controller/user.controller");
const { isAuthenticated } = require("../Middleware/authUser");


const router= express.Router();



router.post("/register",register);
router.post("/login",login);
router.get("/logout",isAuthenticated,logout);
router.get("/my-profile",isAuthenticated,myProfile);
router.get("/admins",getAllAdmins)
module.exports = router;