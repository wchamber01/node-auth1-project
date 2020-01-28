const bc = require("bcryptjs");
const router = require("express").Router();

const restRouter = require("../restricted/rest-router.js");
const usersRouter = require("../users/users-router.js");
const Users = require("../users/users-model.js");
const Rest = require("../restricted/rest-router.js");

router.use("/users", usersRouter);

router.get("/", (req, res) => {
  res.json({ api: "It's alive" });
});

router.get("/restricted/", Rest, (req, res) => {
  res.json({ message: "Welcome to the restricted routes!" });
});

router.post("/register", (req, res) => {
  let user = req.body;

  const hash = bc.hashSync(req.body.password, 8);

  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json({ error: "Username already exists" });
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      console.log(user, "user line 39");
      if (!user) {
        res.status(400).json({ message: "Username not registered" });
      } else if (user && bc.compareSync(password, user.password)) {
        res.status(200).json({ message: `Welcome ${user.username}!` });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "There was a problem" });
    });
});

module.exports = router;
