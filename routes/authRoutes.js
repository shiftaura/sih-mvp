const express = require('express');
const router = express.Router();
const login= require("../middleware/login")
const {protect} = require("../middleware/protect.js")

router.post("/login",login);
router.get("/me",protect,async(req,res)=>{
    const user = req.user.rows[0];
    res.status(200).json({success:true,data:{id:user.id,name:user.name,email:user.email,role:user.role,state:user.state,district:user.district}});
});


module.exports = router;
