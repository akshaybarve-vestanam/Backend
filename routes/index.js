const express = require("express");
const user = require("../app/controller/user.js");
const labels = require("../app/controller/labels.js");
const candidates = require("../app/controller/candidates.js")

module.exports = (app) => {
    app.post("/sendOTP", user.sendOTP);
    app.post("/login", user.login);
    app.post("/signup", user.signup);
    app.get("/labels", labels.get);
    app.post("/labels", labels.create);
    app.post("/candidate/register", candidates.candidates_register);
}
