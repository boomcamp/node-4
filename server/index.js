const express = require('express')
// const app = express()
const massive = require('massive')
const user = require('./controllers/user_controllers.js')

massive({
    host: 'localhost',
    port: 5432,
    database: 'node4db',
    user: 'postgres',
    password: 'node4db',
})
.then(db =>{
    const app = express()
    app.set('db', db)
    app.use(express.json())

    app.post('/api/register', user.register)
    app.get('/api/protected/data', 
        function(req, res){
            if(!req.handlers.authorization){
                return res.status(401).end();
            }

            try{
                const token = req.headers.authorization.split(' ')[1];
                jwt.verify(toke, secret);
                res.status(200).json({ data: 'here is the protected data.'});
            }catch(err){
                console.error(err)
                res.status(500).end()
            }
            
    })
    app.post('/api/login', user.login)

    const PORT = 3001;
    app.listen(PORT, err =>{
        if(err){
            console.log(`Unable to listen to Port ${PORT}`)
        }
        console.log(`Server starts listening to Port ${PORT}`)
    })
})