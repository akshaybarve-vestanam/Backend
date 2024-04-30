module.exports.home = (req, res) => {
    const { username } = req.body;
    const userExists = users.some(user => user.username === username);
    if (userExists) {
      res.status(200).json({ exists: true });
    } else {
      res.status(404).json({ exists: false });
    }
  }


  module.exports.signup = 