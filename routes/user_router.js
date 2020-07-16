const express = require('express');
const router = express.Router();
const User = require('../models/User');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;


const validateUser = require('../middleware/validateUser')
const logInUser = require('../middleware/logInUser')
const user_auth = require('../middleware/user_auth')


router.get('/testAuth', user_auth, (req, res) => {
    res.send('success, youre logged in')
})



//POST
//localhost:5000/user
//@desc post/make
//@access public
router.post('/', validateUser, async (req, res) => {



        req.body.password = await bcrypt.hash (req.body.password, 10)


        try {

            const newUser = await User.create(req.body);

            res.json({
                msg: 'user creatd',
                document: newUser
            })
            
        } catch (error) {

            res.status(500).json({error: error.message || error})
            
        }

})


//PUT (login) route
//localhost:5000/user
//@desc put/login a new user and store in users collection
//@access public
router.put('/', logInUser, async (req, res) => {

    const token = jwt.sign({id: req.id}, secret, {expiresIn: 120})

    console.log(req.id)

    res.json({token})
})






module.exports = router;