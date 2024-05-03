const express = require("express");
const user = require("../app/controller/user.js");
const labels = require("../app/controller/labels.js");

module.exports = (app) => {
    // app.post("/login", home.home);
    // app.post("/signup", user.signup);
    app.get("/labels", labels.get);
    app.post("/labels", labels.create);
}
