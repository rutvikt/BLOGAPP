const User = require("../Model/userModel");

const jwt = require("jsonwebtoken");

//authetication
const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        console.log(req.cookies,"req.cookie");
        
        console.log("middleware", token);
        if (!token) {
            return res.status(400).json({ error: "user not auth" })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(404).json({ error: "user not found" });
        }
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error: "user not authonication" })
    }
}

const isAdmin = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ error: `user with given role ${req.user.role}not allowd` })

        }
        next();
    }
}

module.exports = {isAuthenticated,isAdmin};

//authorization
