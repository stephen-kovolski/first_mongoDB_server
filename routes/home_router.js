const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie')

router.get('/', (req, res) => {
    res.render('test', {message:'Test', titleVar: 'Title Here'})
})


router.get('/mrental', async (req, res) => {
    
    const allMovies = await Movie.find({});
    const clientMsg = 'Number of Movies:' + allMovies.length;



    res.render('home', {all_movies: allMovies, message: clientMsg})
})


router.get('/mrental/static', (req, res) => {

    const fileLocation = process.cwd() + '\\public\\home.html';


    res.sendFile(fileLocation);   

});





//request all movies in collection/DB
module.exports = router;