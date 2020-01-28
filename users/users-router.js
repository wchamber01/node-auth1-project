const bc = require("bcryptjs");
const router = require("express").Router();

const Users = require("./users-model.js");
const Rest = require("../middleware/rest-mw.js");

router.get("/", Rest, (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

module.exports = router;
