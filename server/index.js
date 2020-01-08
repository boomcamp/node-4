const express = require('express')
const massive = require('massive')
const jwt = require('jsonwebtoken');
const secret = require('../secret');
const register = require('./controller/register')

massive({

    host: 'localhost',
    port: 5433,
    database: 'node4db',
    user: 'postgres',
    password: 'node4db',

}).then(db => {

    const app = express()

    const auth = (req, res) => {
        if (!req.headers.authorization) {   // if without token
            return res.status(401).end();   // return unathorized
        }

        try {
            const token = req.headers.authorization.split(' ')[1];
            jwt.verify(token, secret); // will throw an Error when token is invalid!!!
            res.status(200).json({ data: 'here is the protected data' });
        } catch (err) {
            console.error(err);
            res.status(401).end();
        }
    }

    app.set('db', db)

    app.use(express.json())
    app.post('/api/register', register.register)
    app.get('/api/protected/data', auth)
        
    app.post('/api/login', auth, register.login)

    const PORT = 3001
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`)
    })
})
    .catch(console.error)