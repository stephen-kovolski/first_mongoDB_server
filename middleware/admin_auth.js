const jwt = require('jsonwebtoken');

module.exports = async (req, res, next, adminLevel) => {

    console.log(adminLevel);

    const { JWT_SECRET: jwtKey, HEAD_AUTH_KEY: headerKey } = process.env;

    const userToken = req.headers[headerKey]


    try{

    const decodedData = jwt.verify(userToken, jwtKey);

    if (decodedData.id == undefined) {
        throw new Error('ID was not defined in the payload')
    }
    
    const admin = await User.findOne({"_id": decodedData.id});
   

    if(admin === null) {
        throw new Error ('user id is invalid')
    }

    const { _id: id, email: email, 'adminProps.isAdmin': isAdmin} = admin;

    const info = {
        id: id,
        user: user,
        isAdmin: isAdmin
    }
        console.log(info)

        if(info.isAdmin === false) throw new Error ('')

        req.admin = info;

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