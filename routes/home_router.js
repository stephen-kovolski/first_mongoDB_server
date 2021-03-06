const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie')
const adminAuth = require('../middleware/admin_auth');
const extractToken = require('../middleware/extractToken')
const User = require('../models/User')
const isAdmin = require('../middleware/isAdmin')

router.get('/', extractToken, isAdmin, async (req, res) => {
    //expected query properties: "msg" and "title"
    const loggedIn = req.authKey == undefined || req.authKey.trim().length > 0;
        //console.log(req.authKey, "test")

    const allMovies = await Movie.find({'inventory.available': {$gte: 1}});

    const isAdmin = req.isAdmin || false;

    const renderOption = {
        all_movies: allMovies,
        isLoggedIn: loggedIn,
        isAdmin: isAdmin
    }

    res.render('home', renderOption)
})

router.get('/login', (req, res) => {

    res.render('login')

})

router.get('/mrental', async (req, res) => {
    
    const allMovies = await Movie.find({'inventory.available': {$gte: 1}});

    const clientMsg = 'Number of Movies:' + allMovies.length;



    res.render('home', {all_movies: allMovies, message: clientMsg})
})

router.get('/mrental/new', async (req, res) => {
    
    res.render('newMovie')
})

router.get('/mrental/update', (req, res) =>{
    
    res.render('updateMovie')
})

router.get('/mrental/static', (req, res) => {

    const fileLocation = process.cwd() + '\\public\\home.html';


    res.sendFile(fileLocation);   

});

router.get('/admin', extractToken, adminAuth, async (req, res) => {

    res.render('admin-movie')

})

router.get('/register', (req, res) => {

    res.render('register')


})

router.get('/profile/:username', extractToken, isAdmin, async(req, res) => {



        const profileOwner = await User.findOne({username: req.params.username})

        if (profileOwner === null) {

            const viewingUser = await User.findById(req.userId);

            const renderOption = {
                proUserName: profileOwner.username,
                rented:profileOwner.rentedMovies,
                viewerRented:viewingUser === null ? [] : viewingUser.rentedMovies,
            }

            console.log(renderOptions)

            res.render('profile', renderOption);

        }  

        


})


//request all movies in collection/DB
module.exports = router;