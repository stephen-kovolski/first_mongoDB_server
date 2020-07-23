//movie rent route
//movie return route


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
const adminAuth = require('../middleware/admin_auth');
const Movie = require('../models/Movie');
const newError = require('../utilities/newError');



router.get('/testAuth', user_auth, (req, res) => {
    res.send('success, youre logged in')
})

router.get('/testAdminAuth', adminAuth, (req, res) => {
    res.send('success, youre logged in')
})

router.patch('/rent', user_auth, async (req, res) => {

    const movieId = req.body.movieId;


    try {

        const movie = await Movie.findOne({_id: movieId, 'inventory.available': {$gte: 1}})

        if (movie === null) {
            console.log(`Movie Id caused error renting ${movieId}`);
            throw newError('Movie not found or Movie unavailable', 404);
        }

        if(req.user.rentedMovies.indexOf(movieId) != -1) {
            console.log(`User tried to rent movie twice\n movieId; ${movieId}\nUserId: ${req.user._id}`);
            throw newError('Movie not found or Movie unavailable', 409)
        }

        const newUser = await User.findByIdAndUpdate(
                req.user._id,
                {$addToSet: {rentedMovies: movieId}},
                {new: 1}

        )

        const newMovie = await Movie.findByIdAndUpdate(
            movieId,
            {
                $addToSet: {'inventory.rented': req.user._id},
                $inc: {'inventory.available': -1}
            },
            {new: 1}

        )

    res.json({
        message: "success",
        user: newUser,
        movie: newMovie
    })


    } catch (err) {

        const errMsg = err.message || err;
        const errCode = err.code || 500;

        console.log(`Error in movie renting ${errMsg}`)

        res.status(errCode).json({
            error: errMsg
        })

    }


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

    const token = jwt.sign({id: req.id}, secret, {expiresIn: '2h'})

    console.log(req.id)

    res.json({token})
})






module.exports = router;