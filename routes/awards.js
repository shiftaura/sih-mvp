const express = require("express");
const router = express("Router");

router.get("/",async (req,res)=>{
    const {projectId} = req.querry;

})
router.post("/",async (req,res)=>{
    const {projectId,awardNumber,awardAmount,awardDate} = req.body;


    res.status(200).json({success:true,data:{projectId,awardNumber,awardAmount,awardDate}})
});


module.exports = router;