const jwt = require('jsonwebtoken');

const secretKey = 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcxNTc2NjExNCwiaWF0IjoxNzE1NzY2MTE0fQ.x_4EmzrgS8xjoWQYGK9l5EXP0FM5zwEZZHlmedW4itA'; 


const authenticate = (req, res, next) => {
  const token = req.cookies.authToken;

  if (!token) {
    return res.status(401).json({ success: false, message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).json({ success: false, message: "Invalid token." });
  }
};

module.exports = authenticate;
