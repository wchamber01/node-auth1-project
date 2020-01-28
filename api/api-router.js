const bc = require("bcryptjs");
const router = require("express").Router();

const usersRouter = require("../users/users-router.js");
const Users = require("../users/users-model.js");
const Rest = require("../middleware/rest-mw.js");

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
      // console.log(user, "user line 39");
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

router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res
          .status(500)
          .json({
            message:
              "Elvis tried to leave the building but was blocked by the crowd. Please try logging out again."
          });
      } else {
        res.status(200).json({
          message:
            "You don't have to go home but you can't stay here! Please try logging out again."
        });
      }
    });
  } else {
    console.log(err);
    res.status(204).json({ error: "there was an error" });
  }
});

module.exports = router;
