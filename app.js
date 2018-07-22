const express = require("express");
const bodyParser = require("body-parser");
const volleyball = require("volleyball");
const normalizePort = require("./utils/normalize-port");
const helmet = require('helmet');
const cors = require('cors');

const usersComponent = require("./components/users");
const linksComponent = require("./components/links");

const app = express();

app.use(cors());
app.use(helmet());
app.use(volleyball);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.options('*', cors())

app.use("/api/user", usersComponent);
app.use("/api/links", linksComponent);

require("./config/database");

const port = normalizePort(process.env.PORT || 5000);
app.set("port", port);

module.exports = { port, app }