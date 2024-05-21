const express = require("express");
const router = express.Router();
const user = require("../app/controller/user.js");
const labels = require("../app/controller/labels.js");
const candidates = require("../app/controller/candidates.js")

router.post("/signup", user.signup);
router.get("/labels", labels.get);
router.post("/labels", labels.create);
router.post("/candidate/register", candidates.candidates_register);
router.post("/candidate/edit", candidates.candidates_edit);

module.exports = router;
