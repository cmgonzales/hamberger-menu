const express = require('express')
const jwt = require('jsonwebtoken')


const app = express()

app.get('api', (req,res) => {
    res.json({
        message: 'Welcome to API'
    })
})

app.post('/api/post', (req,res) => {
    res.json({
        message: 'post created...'
    })
})

app.listen(5000, () => console.log('server started'))