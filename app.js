const express = require("express");
const bodyParser = require("body-parser");
const volleyball = require("volleyball");
const normalizePort = require("./utils/normalize-port");

const usersComponent = require("./components/users");
const linksComponent = require("./components/links");

const app = express();

app.use(volleyball);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



app.use("/api/user", usersComponent);
app.use("/api/links", linksComponent);

require("./config/database");

const port = normalizePort(process.env.PORT || 5000);
app.set("port", port);

module.exports = { port, app }