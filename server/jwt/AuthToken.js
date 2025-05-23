const jwt = require("jsonwebtoken");
const User = require("../Model/userModel");


const createTokenAndSaveCookie =async (userId,res)=>{
  const token =jwt.sign({userId},process.env.JWT_SECRET_KEY,{
    expiresIn:"15d"
  });

  res.cookie("jwt",token,{
    httponly:true,
    secure:true,
    sameSite:"strict"
  })


  await User.findByIdAndUpdate(userId,{token})
  return token
}
module.exports=createTokenAndSaveCookie;