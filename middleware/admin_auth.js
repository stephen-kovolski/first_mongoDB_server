const jwt = require('jsonwebtoken');

module.exports = async (req, res, next, adminLevel) => {

    console.log(adminLevel);

    const { JWT_SECRET: jwtKey, HEAD_AUTH_KEY: headerKey } = process.env;

    const userToken = req.headers[headerKey]


    try{

    const decodedData = jwt.verify(userToken, jwtKey);

    if (decodedData.id == undefined && decodedData.id.length != 24) {
        throw new Error('ID was not defined in the payload or the length was invalid')
    }
    const query = {_id: decodedData.id, 'adminProperty.isAdmin': true};

    const projection = { password: 0, __v: 0 };
    
    const admin = await User.findOne(query, projection);
   

    if(admin === null) {
        throw new Error ('user is not an admin')
    }


        req.admin = admin;

        next()

    


    } catch (err) {

        const errMsg = err.message || err;

        console.log(`\nErr with admin_auth: ${errMsg}\n`)

        return res.status(401).json({error: 'Not Authorized'})

    }


}


// function project() {

//     User.findOne({ []})

// }