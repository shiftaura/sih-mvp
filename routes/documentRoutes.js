const express = require("express");
const router = express.Router();
const { generateSignature, saveDocumentDetails, getProjectDocuments } = require("../controllers/documentController");
const { protect } = require("../middleware/protect");

router.get("/signature", protect, generateSignature);
router.post("/", protect, saveDocumentDetails);
router.get("/project/:projectId", protect, getProjectDocuments);

module.exports = router;