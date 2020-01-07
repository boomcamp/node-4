function login(req, res) {
    const db = req.app.get('db');
    const { username, password } = req.body;

    db.users
        .findOne({
            username,
        }, {
            fields: ['id', 'username', 'email']
        })
        .then(user => {
            if (!user) {
                throw new Error('Invalid Username');
            }
            return argon2.verify(user.password, password)
                .then(valid => {
                    if (!valid) {
                        throw new Error('Incorrect Password');
                    }
                    const token = jwt.sign({ userId: user.id }, secret);
                    delete user.password;
                    res.status(200).json({ ...user, token });
                });
        })
        .catch(e => {
            if (['Invalid Username', 'Incorrect Password'].includes(e.message)) {
                res.status(400).json({ error: err.message });
            } else {
                console.error(e);
                res.status(500).end();
            }
        });
}

module.exports = {
    login
}