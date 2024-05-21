const jwt = require('jsonwebtoken');
const Config = require("../app/config/index").get(process.env.NODE_ENV);

module.exports.authenticate = (req, res, next) => {
  const token = req.cookies;
  console.log("token", token)
  if (token.authToken) {
    jwt.verify(token.authToken, Config.secret, function (err, decoded) {
      if (err) {
        return res.json({ success: false, message: "Unauthorised user" });
      } else {
        req.decoded = decoded;
        console.log("decoded", decoded)
        return next();
      }
    });
  } else {
    return res.status(401).json({ s: false, m: "Unauthorised user" });
  }
};

