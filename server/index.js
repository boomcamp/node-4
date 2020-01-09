const express = require('express');
const massive = require('massive');
const users = require('./controllers/users');

massive({
  host: 'localhost',
  port: 5432,
  database: 'node4db',
  user: 'postgres',
  password: 'node4db'
})
  .then( db => {
    const app = express();
    app.set('db', db);
    app.use(express.json());

    app.post('/api/register', users.signup);
    app.get('/api/protected/data', users.getData);
    app.post('/api/login', users.login);

    const PORT = 3002; //port
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  });