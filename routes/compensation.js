const router = require("express").Router();
const {protect} = require("../middleware/protect");

router.get("/",protect,async(req,res)=>{
    const {projectId} = req.query;
    res.status(200).json({success:true,data:`projectId`})
});

module.exports = router;