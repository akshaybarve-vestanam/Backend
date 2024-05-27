const express = require("express");
const router = express.Router();
const user = require("../app/controller/user.js");
const labels = require("../app/controller/labels.js");
const candidates = require("../app/controller/candidates.js")

router.get("/labels", labels.get);
router.post("/labels", labels.create);
router.post("/candidate/register/individual", candidates.candidates_register);
router.post("/candidate/edit", candidates.candidates_edit);
router.get("/candidate",candidates.load_candidates);

module.exports = router;
