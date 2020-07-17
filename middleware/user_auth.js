const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {

    const { JWT_SECRET: jwtKey, HEAD_AUTH_KEY: headerKey } = process.env;

    const userToken = req.headers[headerKey]


    try{

    const decodedData = jwt.verify(userToken, jwtKey);

    if (decodedData.id == undefined) {
        throw new Error('ID was not defined in the payload')
    }

    const user = await findOne({_id: decodedData.id});

    if (user === null){


        throw new Error ('user id in payload was invalid for mong/mongoose')
    }

    req.user = user

    } catch (err) {

        const errMsg = err.message || err;

        console.error(`\nError in user_auth: ${errMsg}\n`)

        return res.status(401).json({error: 'Not Authorized'})

    }

    
    next()

}