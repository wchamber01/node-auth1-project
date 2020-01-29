const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);
const dbConnection = require("../data/dbConfig.js");

const sessionConfig = {
  name: "cookieMonster",
  // secret is used for cookie encryption
  secret: process.env.SESSION_SECRET || "keep it secret, keep it safe!",
  cookie: {
    maxAge: 1000 * 60 * 10, // 10 minutes in ms
    secure: false, // set to true in production, only send cookies over HTTPS
    httpOnly: true // JS cannot access the cookies on the browser
  },
  resave: false,
  saveUninitialized: true, // read about it for GDPR compliance
  store: new KnexSessionStore({
    knex: dbConnection,
    tablename: "sessions",
    sidfieldname: "sid",
    createtable: true,
    clearInterval: 60000
  })
};

module.exports = server => {
  server.use(helmet());
  server.use(session(sessionConfig));
  server.use(express.json());
  server.use(cors());
};
