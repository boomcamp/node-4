const express = require("express");
const massive = require("massive");
const jwt = require("jsonwebtoken");
const secret = require("../secret.js");
const reg = require("./controllers/register");

massive({
  host: "localhost",
  port: 5432,
  database: "node4db",
  user: "postgres",
  password: "node4db"
}).then(db => {
  const app = express();
  const PORT = 4000;
  app.set("db", db);
  app.use(express.json());

  app.post("/api/register", reg.register);
  app.post("/api/login", reg.login);

  app.get("/api/protected/data", (req, res) => {
    if (!req.headers.authorization) {
      return res.status(401).end();
    }

    try {
      const token = req.headers.authorization.split(" ")[1];
      jwt.verify(token, secret); // will throw when token is invalid
      res.status(200).json({ data: "here is the protected data" });
    } catch (err) {
      console.error(err);
      res.status(401).end();
    }
  });

  app.listen(PORT, () => {
    console.log(`Server listening in ${PORT}`);
  });
});
