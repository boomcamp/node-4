const express = require('express');
const massive = require('massive');

const user = require('../controllers/users')

massive({
    host: 'localhost',
    port: 5433,
    database: 'node4db',
    user: 'postgres',
    password: 'node4db'
}).then(db => {
    const app = express();

    app.set('db', db);
    app.use(express.json());

    app.post('/api/register', user.register)
    app.get('/api/protected/data', user.auth)
    app.post('/api/login', user.login)


    const PORT = 3004;
    app.listen(PORT, () => {
        console.log(`Server is Listening on port ${PORT}`)
    })
})