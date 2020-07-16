//like user_auth

const jwt = require('jsonwebtoken')
const apiKey = process.env.MOVIE_ADMIN_KEY
const User = require('../models/User');

function admin_Auth(req, res, next) {

    const user = User.findOne({_id: payload.id})


    if (user.isAdmin === true){
        next()
    }

    // check the admin properties.  make sure they are an admin
    //is it an admin property from the User model.



}

module.exports = admin_Auth