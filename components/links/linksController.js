const metafetch = require("metafetch");
const { Client } = require("pg");
const conString = require("../../config/database");

const insertInto = async ({ title, description, image, url }, userid) => {
  const time = Date.now() / 1000.0;
  const client = new Client(conString);
  await client.connect();
  const insertQuety =
    "INSERT INTO Links(userid, url, title, description, image, inserted_at) VALUES($1, $2, $3, $4, $5, to_timestamp($6)) RETURNING *";
  const values = [userid, url, title, description, image, time];
  try {
    const data = await client.query(insertQuety, values);
    return links = data.rows[0];
  } catch (err) {
    return err;
  } finally {
    client.end();
  }
};

const addLink = (req, res) => {
  const { url, userid } = req.body;
  const metadata = {};
  metafetch.fetch(
    url,
    {
      flags: {
        images: false,
        links: false,
        language: false
      }
    },
    async (err, meta) => {
      try {
        if (meta) {
          metadata.title = meta.title;
          metadata.description = meta.description;
          metadata.image = meta.image;
          metadata.url = url;
        }
        const inserted = await insertInto(metadata, userid);
        const newObj = await { userid , ...inserted };
        await res.status(200).json(newObj);
      } catch (error) {
        res.status(400).json(error);
      }
    }
  );
};

const updateLink = async (req, res) => {
  const client = new Client(conString);
  await client.connect();
  if (req.body) {
    const { linkid, userid } = req.body;
    const updateQuery =
      "UPDATE Links SET status = ($1) WHERE userid = ($2) AND linkid = ($3)";
    const values = [true, userid, linkid];
    try {
      const data = await client.query(updateQuery, values);
      console.log(data.rows[0]);
    } catch (err) {
      console.log(err.stack);
    } finally {
      client.end();
    }
    res.send("Saved");
  }
};

const deleteLink = async (req, res) => {
  const client = new Client(conString);
  await client.connect();
  console.log(req.body);
  if (req.body) {
    const { linkid } = req.body;
    const updateQuery = "DELETE FROM TABLE Links WHERE linkid=($1)";
    const values = [linkid];
    try {
      const data = await client.query(updateQuery, values);
      console.log(data.rows[0]);
      res.send(data.rows[0]);
    } catch (err) {
      console.log(err.stack);
      res.send("Error occured");
    } finally {
      client.end();
    }
  }
};

const getLastWeek = async (req, res) => {
  const client = new Client(conString);
  await client.connect();
  if (req.query.userid !== undefined) {
    const { userid } = req.query;
    const getQuery = "SELECT * FROM links WHERE userid=($1) LIMIT 50";
    const values = [userid];
    try {
      const data = await client.query(getQuery, values);
      res.status(200).json(data.rows);
    } catch (err) {
      res.status(400).send(err);
    }
  }
};

module.exports = { addLink, updateLink, deleteLink, getLastWeek };
