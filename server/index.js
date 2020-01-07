const express = require("express");
const massive = require("massive");
const endpoints = require("../controllers/users.js");

massive({
  host: "localhost",
  port: 5432,
  database: "node4db",
  user: "postgres",
  password: "node4db"
}).then(db => {
  const app = express();

  // database
  app.set("db", db);

  // variables
  const port = 4000;
  const host = "http";
  const baseUrl = "localhost";

  // middleware
  app.use(express.json());

  // endpoints
  app.post("/api/register", endpoints.register);
  app.get("/api/protected/data", endpoints.authorize);
  app.post("/api/login", endpoints.login);

  // listen
  app.listen(port, () => {
    console.clear();
    console.info("\x1b[32m", `\n\n  ^.^ --- Welcome to server! --- ^.^`);
    console.info(`\n\n  Server is listening on port ${port} ...`);
    console.info(
      "\x1b[37m",
      `\n\n  ${host}://${baseUrl}:${port}/api/protected/data`
    );
  });
});
