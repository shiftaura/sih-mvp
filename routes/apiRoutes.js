const express = require('express');
const router = express.Router();


router.use("/auth", require("./authRoutes.js"));
router.use("/projects", require("./projectRoutes.js"));
router.use("/workflow", require("./workflowRoutes.js"));
router.use("/parcels", require("./parcelRoutes.js"));
router.use("/gis", require("./gisRoutes.js"));
router.use("/notification",require("./notificationRouter.js"))
router.use("/awards",require("./awards.js"))
router.use("/compensation",require("./compensation.js"));


module.exports = router;