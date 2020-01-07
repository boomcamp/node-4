const express = require('express');
const massive = require('massive');

const users = require('./controllers/users');

massive({
	host: 'localhost',
	port: 5432,
	database: 'node4db',
	user: 'postgres',
	password: 'node4db'
}).then(db => {
	const app = express();
	app.use(express.json());
	app.set('db', db);

	app.post('/api/register', users.register);
	app.get('/api/protected/data', users.protectData);
	app.post('/api/login', users.login);

	const port = 4000;
	app.listen(port, () => {
		console.log(`server listening on port ${port}`);
	});
});
