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
const colors = require('colors')

app.set('view engine', 'pug')


app.use(morgan('dev'))
app.use(express.json());
app.use('/movie', movieRouter);
app.use('/', homeRouter)
app.use(express.static('./public'));
app.use('/user', user_router)


mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

// error handlers in case the db doesnt connect to the server
// these are through mogoose. check out their documentation for a lot more good info

mongoose.connect(connectionURI, deprecatedObj, () => {  
    console.log('The server is connected to the database'.underline.yellow)  
})

mongoose.connection.on('error', (err) => {  
    console.log(`An error has occured trying to connect to Mongo DB. Error: ` + err)
})

mongoose.connection.on('connected', () => {
    console.log(`The server is trying to connect to Mongo DB...`.underline.yellow)
})


app.listen(PORT, console.log(`listening on port ${PORT}`.underline.yellow)); 