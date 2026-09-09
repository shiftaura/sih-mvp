const pool = require("../db");
const jwt = require("jsonwebtoken");
let token;
const protect = async(req,res,next)=>{
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.replace("Bearer","").trim();
    }
    if(!token){
        return res.status(400).json({success:false,error:{code:"UNAUTHORIZED",message:"login now"}});
    }
    try{
        const verify = jwt.verify(token,process.env.JWT_SECRET);
    const {userId,role} = verify;
    req.user = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
    next();
    }
    catch(err){
        return res.status(400).json({success:false,error:{code:"UNAUTHORIZED",message:"login now"}});
    }

}
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user?.role)) {
            return res.status(403).json({
                success: false,
                error: {
                    code: 'FORBIDDEN',
                    message: 'You lack permission to perform this action.'
                }
            });
        }
        next();
    };
};
module.exports = { protect, authorize };
