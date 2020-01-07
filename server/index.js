const express = require("express");
const massive = require("massive");
const validate = require("../controllers/validations");

massive({
  host: "localhost",
  port: 5432,
  database: "node4db",
  user: "postgres",
  password: "node4db"
}).then(db => {
  const app = express();

  app.set("db", db);

  app.use(express.json());

  //REGISTER
  app.post("/api/register", validate.register);
  //AUTHENTICATE
  app.get("/api/protected/data", validate.authorize);
  //LOGIN
  app.post("/api/login", validate.login);

  const PORT = 5002;
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});
