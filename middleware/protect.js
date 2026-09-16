// middleware/protect.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { asyncHandler } = require("./errorMiddleware");

const protect = asyncHandler(async (req, res, next) => {
    let token;
    
    // Check if header contains the Bearer token
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1].trim();
    }

    if (!token) {
        res.status(401);
        throw new Error("Not authorized, please login");
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Fetch user from MongoDB and attach to req (excluding password)
        req.user = await User.findById(decoded.userId).select('-password');
        
        if (!req.user) {
            res.status(401);
            throw new Error("User not found");
        }
        next();
    } catch (err) {
        res.status(401);
        throw new Error("Token failed or expired");
    }
});

const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user?.role)) {
            res.status(403);
            throw new Error('You lack permission to perform this action.');
        }
        next();
    };
};

module.exports = { protect, authorize };