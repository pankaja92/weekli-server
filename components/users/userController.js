const { Client } = require("pg");
const conString = require("../../config/database");

const login = async (req, res) => {
  const client = new Client(conString);
  await client.connect();
  if (req.query.userid !== undefined) {
    const { userid } = req.query;
    const getQuery = "SELECT (notification_day, notification_time, username) FROM users WHERE userid=($1)";
    const values = [userid];
    try {
      const data = await client.query(getQuery, values);
      console.log(data);
      res.status(200).json(data.rows);
    } catch (err) {
      res.status(400).send(err);
    }
  }
};

const registration = async (req, res) => {
  const client = new Client(conString);
  await client.connect();
  console.log(req.body);
  if (req.body) {
    const { userid, email,username } = req.body;
    const notificationDay = 5;
    const notificationTime = 10;
    const createdOn = new Date();
    const insertQuery =
      "INSERT INTO Users(userid, username, email, notification_day, notification_time, created_on) VALUES($1, $2, $3, $4, $5, $6) RETURNING *";
    const values = [
      userid,
      username,
      email,
      notificationDay,
      notificationTime,
      createdOn
    ];
    try {
      const data = await client.query(insertQuery, values);
      console.log(data.rows[0]);
      res.status(204);
    } catch (err) {
      console.log(err.stack);
      res.status(400);
    } finally {
      client.end();
    }
  }
};

const update = async (req, res) => {
  const client = new Client(conString);
  await client.connect();
  console.log(req.body);
  if (req.body) {
    const {day, time, user} = calculations(req.body);   
    const updateQuery =
      "UPDATE Users SET notification_day = ($1), notification_time = ($2) WHERE userid=($3) RETURNING *";
    const values = [day, time, user];
    try {
      const data = await client.query(updateQuery, values);
      console.log(data.rows[0]);
    } catch (err) {
      console.log(err.stack);
      res.status(200);
    } finally {
      client.end();
      res.status(500);
    }
  }
};

const calculations = data => {
  let { day, time, diff, user } = data;
  let date = day.value;
  const fulltime = parseInt(time.hour) * 60 + parseInt(time.minute);
  const utctimeinmin = fulltime + diff;
  let correcttimeinmin = 0;
  //if there's a time diff in local and utc
  if(diff != 0) {
    //if time in UTC less than 0
    if (utctimeinmin<0){
      //if day is not Sunday ( 0 ) 
      if(date != 0){
        date = date - 1;
      }
      else date = 6;
      //if utctimeinmin is - we should add 1440 (24 hours) to get the exact time in minutes in previous day
      correcttimeinmin = 1440 + utctimeinmin;
    }
    else if (utctime>=0 & utctime<1440){
      correcttimeinmin = utctimeinmin;
    }
    else {
      if(date != 6){
        date = date + 1;
      }
      else date = 0;
      //if utctimeinmin is + and higher than 1440 (24 in minutes) we should add substract 1440 from time to get the exact time in minutes in previous day
      correcttimeinmin = utctimeinmin - 1440;
    }
    let timeinhours = correcttimeinmin/60;
    let timeinmin = correcttimeinmin%60;
    time = ""+timeinhours + timeinmin;
    time = parseInt(time);
    return {date, time, user} ;
  }
}

module.exports = { registration, update, login };
