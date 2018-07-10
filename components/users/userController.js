const { Client } = require("pg");
const conString = require("../../config/database");

const registration = async (req, res) => {
  const client = new Client(conString);
  await client.connect();
  console.log(req.body);
  if (req.body) {
    const { userid, email } = req.body;
    const notificationDay = 5;
    const notificationTime = 10;
    const createdOn = new Date();
    const insertQuery =
      "INSERT INTO Users(userid, email, notification_day, notification_time, created_on) VALUES($1, $2, $3, $4, $5) RETURNING *";
    const values = [
      userid,
      email,
      notificationDay,
      notificationTime,
      createdOn
    ];
    try {
      const data = await client.query(insertQuery, values);
      console.log(data.rows[0]);
    } catch (err) {
      console.log(err.stack);
    } finally {
      client.end();
    }
    res.send("Saved");
  }
};

const update = async (req, res) => {
  console.log(req);
  // const client = new Client(conString);
  // await client.connect();
  // console.log(req.body);
  // if (req.body) {
  //   const { notificationDay, notificationTime } = req.body;
  //   const updateQuery =
  //     "UPDATE Users SET notification_day = ($1), notification_time = ($2) WHERE userid=($3) RETURNING *";
  //   const values = [notificationDay, notificationTime];
  //   try {
  //     const data = await client.query(updateQuery, values);
  //     console.log(data.rows[0]);
  //   } catch (err) {
  //     console.log(err.stack);
  //   } finally {
  //     client.end();
  //   }
  //   res.send("Saved");
  // }
};

module.exports = { registration, update };
