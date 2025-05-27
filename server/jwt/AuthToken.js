const jwt = require("jsonwebtoken");
const User = require("../Model/userModel");

const createTokenAndSaveCookie = async (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "15d"
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
  });

  await User.findByIdAndUpdate(userId, { token });
  return token;
};


module.exports = createTokenAndSaveCookie;
