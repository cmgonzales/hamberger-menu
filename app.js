const express = require('express')
const jwt = require('jsonwebtoken')


const app = express()

app.get('/api', (req,res) => {
    res.json({
        message: 'Welcome to API'
    })
})

app.post('/api/posts', verifyToken, (req,res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) =>{
        if(err){
            res.sendStatus(403)
        }else{
            res.json({
                message: 'posts created...',
                authData
            })
        }
    })
})

app.post('/api/login', (req,res) => {
    //mock user
    const user = {
        id: 1,
        username: 'chris',
        email: 'chris@gmail.com'
    }

    jwt.sign({user}, 'secretkey',{expireIn: '30s'}, (err, token) => {
        res.json({
        token
    })
    });
})
//Format of TOKEN
// Authorization: Bearer <access_token>

//Verify Token

function verifyToken(req,res,next){
    //Get auth header value
    const bearerHeader = req.headers['authorization']

    // check if bearer is undefine

    if(typeof bearerHeader !== 'undefined'){
        // Split at the space

        const bearer = bearerHeader.split(' ')
        //Get token from array

        const bearerToken = bearer[1]
        //Set the Token
        req.token = bearerToken;
        // Next Middleware
        next()
    }else{
        //forbiden
        res.sendStatus(403)
    }


}

app.listen(3000, () => console.log('server started'))