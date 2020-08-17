const express = require("express");
const session = require("express-session");
const sessionConfig = require("../session/session-config");

const usersRouter = require("../users/users-routes");
const authRouter = require("../auth/auth-routes");
const protected = require("../auth/protected-mw");

const server = express();

server.use(express.json());
server.use(session(sessionConfig));

server.use("/api/users", protected, usersRouter);
server.use("/api/auth", authRouter);

module.exports = server;
