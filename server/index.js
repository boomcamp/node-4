const express = require('express');
const massive = require("massive");
const users = require('./controllers/users')
const secret = require('../secret')
const jwt = require('jsonwebtoken');

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

  app.post('/api/register', users.create);
  app.get('/api/protected/data', (req, res) => {
    if (!req.headers.authorization) {
      return res.status(401).end();
    }
    try {
      const token = req.headers.authorization.split(' ')[1];
      jwt.verify(token, secret);
      res.status(200).json({ data: 'here is the protected data' });
    } catch (err) {
      console.error(err);
      res.status(401).end();
    }
  });
  app.post('/api/login', users.login);


  const PORT = 3003;
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});