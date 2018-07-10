const {
  DATABASE_URL,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_PORT
} = require("./keys");

const conString =
  process.env.ELEPHANTSQL_URL ||
  `postgres://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_URL}:${DATABASE_PORT}/${DATABASE_USER}`;

module.exports = conString;
