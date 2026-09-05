const pool = require('../db'); 
const { protect } = require('../middleware/protect');
const getProjects = require('../middleware/getProjects');
const router=require('express').Router();

router.get('/',protect, getProjects);
router.post("/",protect, postProjects);

module.exports = router;