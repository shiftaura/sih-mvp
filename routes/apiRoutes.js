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
router.use("/families", require("./familyRoutes.js"));
router.use("/rnr", require("./rnrRoutes.js"));
router.use("/documents", require("./documentRoutes.js"));
router.use("/objections", require("./objectionRoutes.js"));
router.use("/alerts", require("./alertRoutes.js"));
router.use("/field/tasks", require("./taskRoutes.js"));
router.use("/audit-logs", require("./auditRoutes.js"));
router.use("/analytics", require("./analyticsRoutes.js"));


module.exports = router;