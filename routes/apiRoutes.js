const express = require('express');
const router = express.Router();

router.use("/auth", require("./authRoutes.js"));
router.use("/projects", require("./projectRoutes.js"));
module.exports = router;