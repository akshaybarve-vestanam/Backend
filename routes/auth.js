const express = require("express");
const router = express.Router();
const users = require("../app/controller/user.js");
const labels = require("../app/controller/labels.js");
const candidates = require("../app/controller/candidates.js")
const companies = require("../app/controller/company.js");
const user = require("../app/controller/usermgmt.js");
const emailController = require("../app/controller/mail.js");

router.get("/labels", labels.get);
router.post("/labels", labels.create);
router.post("/candidate/register/individual", candidates.candidates_register);
router.post("/candidate/edit", candidates.candidates_edit);
router.get("/candidate",candidates.load_candidates);
router.get("/download/:candidateId", candidates.download_candidate_data);
router.post("/companies/register", companies.companies_register);
router.get("/companies", companies.load_companies);
router.post("/users/register", user.register_user);
router.get("/users", user.load_users);
router.post("/logout",users.logout);
router.post("/send-email", emailController.sendEmail);
module.exports = router;
