const jwt = require('jsonwebtoken');
const User = require('../models/User')

const JWT_SECRET = process.env.JWT_SECRET

module.exports = async (req, res, next) => {

    const token = req.authKey;

   // const test = ;

    

    if(token == undefined || token.trim().length < 1) {

        //req.isAdmin = false;

        return next()
    } 

        //console.log(JWT_SECRET)

        console.log(typeof token);

        try{
            const decodedJWT = jwt.verify(token, JWT_SECRET);

            console.log(decodedJWT)

            const data = await User.findById(decodedJWT.id);

            req.isAdmin = data != null && data.adminProp.isAdmin === true

            req.userId = decodedJWT.id;


                next()

            } catch (err) {
                    console.log(err.message || err)
                    next()
            }
                
    
      
    



    
}