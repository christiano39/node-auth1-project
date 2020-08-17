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

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  if (!username || !password) {
    res
      .status(400)
      .json({ message: "Please provide required username and password" });
  }

  Users.findBy({ username })
    .then(([user]) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.loggedIn = true;
        res.status(200).json({ hello: user.username, session: req.session });
      } else {
        res.status(401).json({ error: "Invalid credentials" });
      }
    })
    .catch((err) => {
      require.status(500).json({ error: err.message });
    });
});

router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).json({ error: "Could not log out" });
      } else {
        res.status(204).end();
      }
    });
  } else {
    res.status(200).json({ message: "Already logged out" });
  }
});

module.exports = router;
