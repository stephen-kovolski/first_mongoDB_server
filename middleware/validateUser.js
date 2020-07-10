const User = require('../models/User');
const validator = require('validator');



const validate = async (req, res, next) => {

const email = req.body.email;
const pW = req.body.password;
const failedValues = [];

        if (!validator.isEmail(email)) { //checking to make sure the email that is entered is valid.  If not it sends the error message
            failedValues.push({
                key: "email",
                message: "Valid Email Required"
            })
        }


const emailExist = await User.findOne({email: email}) != null;

        if (emailExist) {
            failedValues.push({
                key:"email",
                message: "Email in Use"
            })
            
        } 

    

        if (!validator.isLength(pW, {min: 7, max: 100}) || !validator.isAlphanumeric(pW, 'en-US')) {// validating length & requients of pw entered

            failedValues.push({
                key: "password",
                mmessage: "Length Failed Requirements or special character not included"
            })

        }


        if (failedValues.length > 0) {
            res
            .status(400)
            .json({
                validation_error: failedValues
            })
        } else {

            next()

        }




}

module.exports = validate;