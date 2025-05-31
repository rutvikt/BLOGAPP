const jwt = require("jsonwebtoken");
const User = require("../Model/userModel");

const createTokenAndSaveCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "15d"
  });

  res.cookie("jwt", token, {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
  });

  return token; // return for optional use
};


module.exports = createTokenAndSaveCookie;
