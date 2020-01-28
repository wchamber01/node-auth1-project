const express = require("express");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);

const apiRouter = require("./api-router.js");
const configureMiddleware = require("./configure-middleware.js");

const server = express();

configureMiddleware(server);

server.use("/api", apiRouter);

module.exports = server;
