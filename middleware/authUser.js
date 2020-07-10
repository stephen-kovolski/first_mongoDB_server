const User = require('../models/User');
const bcrypt = require('bcrypt');
const validator = require('validator');

const failedLogin = ( req, res) => {
    return res.status(409).json({message: "Login Failed"});
}




module.exports = async (req, res, next) => {

    try {

    const email = req.body.email;

    const emailValid = (email === undefined || email.trim() === '') ? false : validator.isEmail(email);

        if (!emailValid) {
            console.log('login failed. email not valid')
            failedLogin()
        }
        

    const user = await User.findOne({email: req.body.email});

        if (user === null) {
            console.log('loog in failed, email not in use')
            failedLogin()
        }

    const pass = req.body.password

    const passTest = (pass == undefined || pass.trim() === '') ? false : await bcrypt.compare(pass, user.password)

        if (!passTest) {
            console.log('login failed, password incorrect')
            failedLogin()
        }

            req.id = user._id

            next()  //if code execution reaches here, it is assumed the user has successfully logged in

        } catch (err) {
            
        res.status(500).json({
        errorAt: err.stack,
        message: err.message || err
        })
        }

}