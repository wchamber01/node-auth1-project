const bc = require("bcryptjs");
const router = require("express").Router();

const Users = require("../users/users-model.js");

function restricted(req, res, next) {
  if (req.headers.authorization) {
    bc.hash(req.headers.authorization, 8, (err, hash) => {
      if (err) {
        res.status(500).json({ oops: "it broke" });
      } else {
        res.status(200).json(next());
      }
    });
  } else {
    res.status(401).json({ error: "You shall not pass!" });
  }
}
module.exports = router;
