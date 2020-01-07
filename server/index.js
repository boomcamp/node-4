const express = require("express");
const massive = require("massive");

const authen = require("../controller/authenticate");

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

  app.post("/api/register", authen.register);

  app.get("/api/protected/data", authen.authorize);

  app.post("/api/login", authen.login);

  const PORT = 5001;
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});
