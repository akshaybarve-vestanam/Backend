const express = require("express");
const app = express.Router();
const home = require("../app/controller/user.js");

app.post("/login", home.home);
app.post("/signup", home.signup);
module.exports = router;
