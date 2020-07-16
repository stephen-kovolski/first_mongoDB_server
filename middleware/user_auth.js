const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    const { JWT_SECRET: jwtKey, HEAD_AUTH_KEY: headerKey } = process.env;

    const userToken = req.headers[headerKey]


    try{

    const decodedData = jwt.verify(userToken, jwtKey);

    if (decodedData.id == undefined) {
        throw new Error('ID was not defined in the payload')
    }

    req.userId = decodedData.id;

    } catch (error) {

        const errMsg = err.message || err;

        console.log(`\nError in user_auth: ${errMsg}\n`)

        return res.status(401).json({error: 'Not Authorized'})

    }

    
    next()

}