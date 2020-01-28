const bc = require("bcryptjs");

const Users = require("../users/users-model.js");

function restricted(req, res, next) {
  const { username, password } = req.headers;
  if (username && password) {
    Users.findBy({ username })
      .first()
      .then(user => {
        console.log(user, "user line 39");
        if (user && bc.compareSync(password, user.password)) {
          next();
        } else {
          res.status(401).json({ message: "YOU SHALL NOT PASS!!!" });
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({ error: "There was a problem" });
      });
  }
}
module.exports = restricted;
