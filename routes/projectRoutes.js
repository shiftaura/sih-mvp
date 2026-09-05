const pool = require('../db'); 
const { protect } = require('../middleware/protect');
const getProjects = require('../middleware/getProjects');
const postProjects = require('../middleware/postProjects');
const router=require('express').Router();

router.get('/',protect, getProjects);
router.post("/",protect, postProjects);
router.get("/:projectId",protect, async (req,res)=>{

});

module.exports = router;