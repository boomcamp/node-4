const express = require('express');
const massive = require('massive');
const jwt = require('jsonwebtoken');

const secret = require('../secret.js');

const users = require('./controllers/users');

massive({
  host: 'localhost',
  port: 5433,
  database: 'node4db',
  user: 'postgres',
  password: 'node4db',
}).then(db => {
  const app = express();

  app.set('db', db);

  app.use(express.json());

  app.post('/api/register', users.register);
  app.post('/api/login', users.login);

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

  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});