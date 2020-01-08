const express = require("express");
const massive = require("massive");
const register = require("../controllers/users.js");
const login = require("../controllers/login.js");

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

  app.post("/api/register", register.userRegister);
  app.get("/api/protected/data", register.protectedData);
  app.get("/api/login", login.login);

  const port = 4000;

  app.listen(port, () => {
    console.log(`on port ${port}`);
  });
});
