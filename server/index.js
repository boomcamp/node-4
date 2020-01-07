const express = require('express');
const massive = require('massive');

const user = require('./controllers/user');
const login = require('./controllers/login');

massive({
    host: 'localhost',
    port: 5432,
    database: 'node4db',
    user: 'postgres',
    password: 'node4db'
})
    .then(db => {
        const app = express();
        app.set('db', db);
        app.use(express.json());

        // New User
        app.post('/api/register', user.register);

        // Authorization
        app.get('/api/protected/data', function (req, res) {
            if (!req.headers.authorization) {
                return res.status(401).end();
            }

            try {
                const token = req.headers.authorization.split(' ')[1];
                jwt.verify(token, secret);
                res.status(200).json({ data: 'protected data' });
            } catch (err) {
                console.error(err);
                res.status(401).end();
            }
        });

        // Login user
        app.post('/api/login', login.login)

        const port = 3000;
        app.listen('port', () => {
            console.log(`Listening on port ${port}`);
        });
    })
    .catch(e => {
        console.error(e);
        res.status(401).end();
    })