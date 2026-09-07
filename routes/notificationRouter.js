const router = require("express").Router();

router.get("/", async(req,res)=>{
    const {projectId}= req.query;
res.json({success:true,data:`projectId`})
})
router.post("/",async(req,res)=>{
    const {projectId,type}= req.body;
    res.status(200).json({success:true,type})
})

module.exports = router;