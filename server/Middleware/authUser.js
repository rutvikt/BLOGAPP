const User = require("../Model/userModel");
const jwt = require("jsonwebtoken");

// Authentication Middleware
const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        
        // console.log(token,"authuser");
        

        if (!token) {
            return res.status(401).json({ error: "User not authenticated" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Auth error:", error);
        return res.status(401).json({ error: "Authentication failed" });
    }
};

// Authorization Middleware
const isAdmin = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({
                error: `User with role '${req.user?.role || "unknown"}' not allowed`
            });
        }
        next();
    };
};

module.exports = { isAuthenticated, isAdmin };
