const express = require('express');
const massive = require('massive');

const register = require('./controllers/register.js')
const login = require('./controllers/login.js')

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

    app.post('/api/register', register.register);
    app.get('/api/protected/data', register.getData);
    app.post('/api/login', login.login);
    
    const PORT = 4000;
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
});