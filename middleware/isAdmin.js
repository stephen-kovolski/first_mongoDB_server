const jwt = require('jsonwebtoken');
const User = require('../models/User')

const JWT_SECRET = process.env.JWT_SECRET

module.exports = async (req, res, next) => {

    const token = req.authKey;

    const  test = token.trim().length < 1;

    if(test) {

        //req.isAdmin = false;

        return next()
    } 

        //console.log(JWT_SECRET)

        console.log(typeof token);

        try{
            const decodedJWT = jwt.verify(token, JWT_SECRET);

            console.log(decodedJWT)

            const data = await User.findById(decodedJWT.id);

            console.log(data);
                
            req.isAdmin = data != null && data.adminProperty.isAdmin === true;

                next()

            } catch (err) {
                    console.log(err.message || err)
                    next()
            }
                
    
      
    



    
}