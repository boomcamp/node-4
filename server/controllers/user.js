const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

function register(req, res) {
    const db = req.app.get('db');
    const { username, email, password } = req.body;

    argon2
        .hash(password)
        .then(hash => {
            return db.users.insert({
                username,
                email,
                password: hash
            }, {
                fields: ['id', 'username', 'email']
            });
        })
        .then(user => {
            const token = jwt.sign({ userId: user.id }, secret);
            res.status(201).json({ ...user, token });
        })
        .catch(e => {
            console.error(e);
            res.status(500).end();
        });
};

module.exports = {
    register
};