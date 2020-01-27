const router = require("express").Router();

const authRouter = require("../auth/auth-router.js");
const usersRouter = require("../users/users-router.js");
// const secretRouter = require("../secret/secret-router.js");

router.use("/auth", authRouter);
router.use("/users", usersRouter);
// router.use("/secret", secretRouter);

router.get("/", (req, res) => {
  res.json({ api: "It's alive" });
});

module.exports = router;
