const jwt = require('jsonwebtoken');
const User = require('../models/User')

module.exports = async (req, res, next) => {

    const { JWT_SECRET: jwtKey } = process.env;

    const userToken = req.authKey


    try{

    const decodedData = jwt.verify(userToken, jwtKey);

    if (decodedData.id == undefined && decodedData.id.length === 24) {
        throw new Error('ID was not defined in the payload or the length was invalid')
    }

    const query = {_id: decodedData.id};

    const projection = {password: 0, adminProperty: 0, __v: 0}

    const user = await User.findOne(query, projection);

    if (user === null){


        throw new Error ('user no longer in the database')
    }


    console.log(user)

    req.user = user

    } catch (err) {

        const errMsg = err.message || err;

        console.error(`\nError in user_auth: ${errMsg}\n`)

        return res.status(401).json({error: 'Not Authorized'})

    }

    
    next()

}