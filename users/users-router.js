const bc = require("bcryptjs");
const router = require("express").Router();

const Users = require("./users-model.js");
const Rest = require("../restricted/rest-router.js");

router.get("/", (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

// router.post("/register", (req, res) => {
//   let user = req.body;

//   const hash = bc.hashSync(req.body.password, 8);

//   user.password = hash;

//   Users.add(user)
//     .then(saved => {
//       res.status(201).json(saved);
//     })
//     .catch(error => {
//       console.log(error);
//       res.status(500).json(error);
//     });
// });

// router.post("/login", (req, res) => {
//   let { username, password } = req.body;

//   Users.findBy({ username })
//     .first()
//     .then(user => {
//       if (user && bc.compareSync(password, user.password)) {
//         res.status(200).json({ message: `Welcome ${user.username}!` });
//       } else {
//         res.status(401).json({ message: "Invalid Credentials" });
//       }
//     })
//     .catch(error => {
//       res.status(500).json(error);
//     });
// });

module.exports = router;
