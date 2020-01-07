const express = require('express');
const massive = require('massive');
const users = require('./controllers/users');
const jwt = require('jsonwebtoken');
const secret = require('../secret');


massive({
  host: 'localhost',
  port: 5432,
  database: 'node4db',
  user: 'postgres',
  password: 'node4db',
}).then(db => {
  const app = express();

  app.set('db', db);
  app.use(express.json());

  app.post('/api/register', users.register);
  app.get('/api/protected/data', (req, res) => {
    if (!req.headers.authorization) {
      return res.status(401).end();
    }
   
    try {
      const token = req.headers.authorization.split(' ')[1];
      jwt.verify(token, secret); // will throw an Error when token is invalid!!!
      res.status(200).json({ data: 'here is the protected data' });
    } catch (err) {
      console.error(err);
      res.status(401).end();
    }
   });
   app.post('/api/login', users.login)

  const PORT = 3003;
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});