const express = require("express");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);

const apiRouter = require("./api-router.js");
const userRouter = require("../users/users-router.js");
const configureMiddleware = require("./configure-middleware.js");
const restricted = require("../middleware/rest-mw.js");

const server = express();

configureMiddleware(server);

server.use("/api", apiRouter);
server.use("/users", userRouter);
server.use("/restricted", restricted);

module.exports = server;
