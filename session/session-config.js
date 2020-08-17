const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);
const db = require("../data/db-config");

module.exports = {
  name: "penguinfeet",
  secret: process.env.SESSION_SECRET || "Secrety McSecretface",
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: process.env.COOKIE_SECURE || false,
    httpOnly: true,
  },
  resave: false,
  saveUninitialized: true,
  store: new KnexSessionStore({
    knex: db,
    tablename: "sessions",
    sidfieldname: "sid",
    createtable: true,
    clearInterval: 1000 * 60 * 60,
  }),
};
