const router = require("express").Router();
const bcrypt = require("bcryptjs");

const Users = require("../users/users-model");

router.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ message: "please include required fields" });
  }

  Users.findBy({ username })
    .then(([user]) => {
      if (user) {
        res.status(409).json({ message: "username is already taken" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });

  const rounds = process.env.HASH_ROUNDS || 8;
  const hash = bcrypt.hashSync(password, rounds);

  Users.add({ username, password: hash })
    .then((user) => {
      res.status(201).json({ created: user });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
