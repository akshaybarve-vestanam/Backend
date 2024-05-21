const express = require("express");
const user = require("../app/controller/user.js");
const labels = require("../app/controller/labels.js");
const candidates = require("../app/controller/candidates.js")
const authenticatedRoutes = require("./auth.js")
const User = require("../middleware/auth.js")

module.exports = (app) => {
    app.use('/a', User.authenticate, authenticatedRoutes)
    app.post("/user/otp", user.requestOtp);
    app.post("/login", user.login);
    app.post("/signup", user.signup);
}
