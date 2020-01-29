function restricted(req, res, next) {
  console.log(req.session, "line 2");
  if (req.session && req.session.isLoggedIn) {
    next();
  } else {
    res.status(401).json({ message: "YOU SHALL NOT PASS!!!" });
  }
}
// .catch(error => {
//   console.log(error);
//   res.status(500).json({ error: "There was a problem" });
// });
module.exports = restricted;
