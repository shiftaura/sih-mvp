const jwt = require("jsonwebtoken");
let token;
const protect = async(req,res,next)=>{
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.replace("Bearer","").trim();
    }
    if(!token){
        return res.status(400).json({success:false,error:{code:400,message:"login now"}});
    }
    const verify = jwt.verify(token,process.env.SECRET);
    const {userId,role} = verify;
    req.user = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
    next();

}
module.exports = protect;