const keys = require("./keys");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const { Pool } = require("pg");
const pgClient = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort,
});

pgClient.on("connect", (client) => {
  client
    .query("CREATE TABLE IF NOT EXISTS Assignments (name VARCHAR(255))")
    .catch((err) => console.error(err));
});

app.get("/", (req, res) => {
  res.send("Hi");
});

app.get("/assignment/all", async (req, res) => {
  try {
    const values = await pgClient.query("SELECT * FROM Assignments");
    res.send(values.rows);
  } catch (error) {
    console.log(error);
  }
});

app.post("/assignment", async (req, res) => {
  const name = req.body.name;

  pgClient.query("INSERT INTO Assignments(name) VALUES($1)", [name]);

  res.send({ working: true });
});

app.delete("/assignment", async (req, res) => {
  const name = req.body.name;
  pgClient.query("DELETE FROM Assignments WHERE name=($1)", [name]);

  res.send({ working: true });
});

app.listen(5000, (err) => {
  console.log("Listening");
});
