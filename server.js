const jsonServer = require("json-server");
const auth = require("json-server-auth");
const server = jsonServer.create();
const server_1 = jsonServer.create();
// const router = jsonServer.router("db.json");
const path = require("path");
var express = require('express')
const router = jsonServer.router(path.join(__dirname, "db.json"));
server_1.use('/static', express.static(path.join(__dirname, 'public')))

const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;

server.db = router.db;

server.use(middlewares);
server.use(auth);
server.use(router);

server.listen(port);

// Avoid CORS issue
server_1.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

server_1.use(router)

server_1.listen(3004)
