require('dotenv').config()
const express = require('express')
const path = require('path')
const {logger} = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors');
const corsOptions = require('./config/corsOptions')
// const { MongoClient } = require('mongodb');
// const mongoose = require('mongoose');

console.log(process.env.NODE_ENV)

const app = express()
const port = process.env.PORT || 5000;

app.use(logger)

app.use(cors(corsOptions));

app.use(express.json()); 

app.use(cookieParser());

app.use('/', express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes/root'))


app.all('*', (req, res) => {
    res.status(404)
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    }else if(req.accepts('json')){
        res.json({message: '404 Not Found'})
    }else{
        res.type('txt').send('404 Not Found')
    }
})



// app.use(express.json());

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
app.use(errorHandler)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})