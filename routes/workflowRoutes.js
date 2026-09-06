const protect  = require('../middleware/protect');
const router = require("express").Router();
const transition = require("../middleware/transition");

router.get('/:projectId',protect);
router.post("/transition",protect, transition);

module.exports = router;