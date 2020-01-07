const express = require("express");
const massive = require("massive");
const jwt = require("jsonwebtoken");

const secret = require("../secret.js");

const users = require("./controllers/user");

massive({
  host: "localhost",
  port: 5432,
  database: "node4",
  user: "postgres",
  password: "node4db"
}).then(db => {
  const app = express();

  app.set("db", db);
  app.use(express.json());

  app.post("/api/register", users.register);
  app.get("/api/protected/data", users.token);
  app.post("/api/login", users.login);

  const PORT = 3001;

  app.listen(PORT, () => {
    console.log(`Server is ready on port ${PORT}`);
  });
});
