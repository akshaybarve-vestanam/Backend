const express = require("express");
const router = express.Router();
const user = require("../app/controller/user.js");
const labels = require("../app/controller/labels.js");
const candidates = require("../app/controller/candidates.js")
const companies = require("../app/controller/companies.js");

router.get("/labels", labels.get);
router.post("/labels", labels.create);
router.post("/candidate/register/individual", candidates.candidates_register);
router.post("/candidate/edit", candidates.candidates_edit);
router.get("/candidate",candidates.load_candidates);
router.get("/download/:candidateId", candidates.download_candidate_data);
router.post("/companies/register", companies.companies_register);
module.exports = router;
