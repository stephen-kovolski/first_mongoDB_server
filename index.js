dotenv = require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose'); 
const morgan = require('morgan');
const app = express();
const PORT = process.env.PORT || 5000;
const connectionURI = process.env.MONGO;
const deprecatedObj = {useUnifiedTopology: true, useNewUrlParser: true}
const homeRouter = require('./routes/home_router')
const movieRouter = require('./routes/movieRouter')
const user_router = require('./routes/user_router')

app.set('view engine', 'pug')


app.use(morgan('dev'))
app.use(express.json());
app.use('/movie', movieRouter);
app.use('/', homeRouter)
app.use(express.static('./public'));
app.use('/user', user_router)

mongoose.connect(connectionURI, deprecatedObj, () => {  
    console.log('The server is connected to the database')  
})

mongoose.connection.on('error', (err) => {  
    console.log(`An error has occured trying to connect to Mongo DB. Error: ` + err)
})

mongoose.connection.on('connected', () => {
    console.log(`The server is trying to connect to Mongo DB...`)
})


app.listen(PORT, console.log(`listening on port ${PORT}`)); 