//log in rute
//maje jwt and store it in the clients browser
//create the ui


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
const extractToken = require ('../middleware/extractToken')



router.get('/testAuth', user_auth, (req, res) => {
    res.send('success, youre logged in')
})

router.get('/testAdminAuth', adminAuth, (req, res) => {
    res.send('success, youre logged in')
})


router.patch('/rent_or_return', extractToken, user_auth, async (req, res) => {

    console.log('test')
        
    const {movieId, isRenting = true} = req.body;

    try {

        const movieQuery = 
                isRenting 
                ? { _id: movieId, 'inventory.available': { $gte: 1 }} 
                : { _id: movieId };

        const userUpdate = 
                isRenting 
                ? { $addToSet: { rentedMovies: movieId} } 
                : { $pull: { rentedMovies: movieId} };

        const movieUpdate = 
                isRenting 
                ? { $addToSet: { 'inventory.rented': req.user._id }, $inc: { 'inventory.available': -1 }} 
                : { $pull: { 'inventory.rented': req.user._id }, $inc: { 'inventory.available': 1 }};

        const movie = await Movie.findOne(movieQuery);

        if (movie === null) {
            console.log(`Movie Id caused error renting ${movieId}`);
            throw newError('Movie Not Found or Movie Unavailable', 404);
        }
        
        
        

        //modify the user doc
        const newUser = await User.findByIdAndUpdate(
            req.user._id,
            userUpdate,
            {new: 1}
        )

        //modifying the movie doc
        const newMovie = await Movie.findByIdAndUpdate(
            movieId,
            movieUpdate,
            {new: 1}
        )

        res.json({
            message: "successs",
            user: newUser,
            movie: newMovie
        })
        
    } catch (err) {
        const errMsg = err.message || err;
        const errCode = err.code || 500;

        console.log(`Error in movie renting: ${errMsg}`);
        
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





// router.patch('/return', user_auth, async (req, res) => {

//     const {movieId, isRenting = true} = req.body.movieId;


//     const movieQ = isRenting ? {_id: movieId, 'inventory.available': {$gte: 1}} : {_id: movieId};
//     const userUp = isRenting ? { $addToSet: {rentedMovies: movieId}} : {$pull: {rentedMovies:movieId}};
//     const movieUp = isRenting ? {$pull: {"inventory.rented": req.user._id}, $inc: { 'inventory.available': 1}};



//     try {
//                     //dont have to check inventory
//         const movie = await Movie.findOne({_id: movieId, 'inventory.available': {$gte: 1}})

//         if (movie === null) {
//             console.log(`Movie Id caused error renting ${movieId}`);
//             throw newError('Movie not found or Movie unavailable', 404);
//         }

//         if(req.user.rentedMovies.indexOf(movieId) != -1) {
//             console.log(`User tried to rent movie twice\n movieId; ${movieId}\nUserId: ${req.user._id}`);
//             throw newError('Movie not found or Movie unavailable', 409)
//         }

//         const newUser = await User.findByIdAndUpdate(
//                 req.user._id,
//                 userUp,
//                 {$pull: {rentedMovies: movieId}},   //use $pull instead of add to set****
//                 {new: 1}

//         )

//         const newMovie = await Movie.findByIdAndUpdate(
//             movieId,
//             {
//                 $pull: {'inventory.rented': req.user._id},
//                 $inc: {'inventory.available': +1}                           //use +1******
//             },
//             {new: 1}

//         )

//     res.json({
//         message: "success",
//         user: newUser,
//         movie: newMovie
//     })


//     } catch (err) {

//         const errMsg = err.message || err;
//         const errCode = err.code || 500;

//         console.log(`Error in movie renting ${errMsg}`)

//         res.status(errCode).json({
//             error: errMsg
//         })

//     }


// })
