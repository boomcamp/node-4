const express = require('express');
const massive = require('massive');

//CONTROLLERS
const users = require('./controllers/users');

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

    const PORT = 3001;

    app.post('/api/register', users.register);
    app.get('/api/protected/data', users.webToken);
    app.post('/api/login', users.login);

    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });

});