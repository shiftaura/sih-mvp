const pool = require("../db");
const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.replace("Bearer", "").trim();
    }
    if (!token) {
        return res.status(401).json({ success: false, error: { code: "UNAUTHORIZED", message: "Please login to access this resource" } });
    }
    try {
        const verify = jwt.verify(token, process.env.JWT_SECRET);
        const { userId } = verify;
        
        // FIX: Extract the first row from the query result
        const userResult = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
        
        if (userResult.rows.length === 0) {
            return res.status(401).json({ success: false, error: { code: "UNAUTHORIZED", message: "User no longer exists" } });
        }
        
        req.user = userResult.rows[0]; // Now req.user.role will work perfectly!
        next();
    } catch (err) {
        return res.status(401).json({ success: false, error: { code: "UNAUTHORIZED", message: "Invalid or expired token" } });
    }
};

const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user?.role)) {
            return res.status(403).json({
                success: false,
                error: { code: 'FORBIDDEN', message: 'You lack permission to perform this action.' }
            });
        }
        next();
    };
};

module.exports = { protect, authorize };