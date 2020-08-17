const express = require("express");
const session = require("express-session");
const sessionConfig = require("../session/session-config");

const usersRouter = require("../users/users-routes");
const authRouter = require("../auth/auth-routes");

const server = express();

server.use(express.json());
server.use(session(sessionConfig));

server.use("/api/users", usersRouter);
server.use("/api/auth", authRouter);

module.exports = server;
