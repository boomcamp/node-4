const express = require('express');
const massive = require('massive');

const endpoint = require('./controllers/endpoints.js');

massive({
	host: 'localhost',
	port: 5432,
	database: 'node4db',
	user: 'postgres',
	password: 'node4db',
}).then(db => {
	const app = express();
	app.set('db', db);

	//--- Middlewares goes here ---
	app.use(express.json());

	//--- Endpoint Routes ---
	app.post('/api/register', endpoint.register);
	app.get('/api/protected/data', endpoint.tokenizer);
	app.post('/api/login', endpoint.login);

	//--- Server Test ---
	app.get('/', function(req, res) {
		res.status(200).send('<h1>Yee Haw! It works!</h1>');
	});

	const PORT = 3002;
	app.listen(PORT, () => {
		console.log(`Server listening on PORT: ${PORT}`);
	});
});

