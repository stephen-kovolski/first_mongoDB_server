const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie')
const adminAuth = require('../middleware/admin_auth')

router.get('/', (req, res) => {
    //expected query properties: "msg" and "title"
    const { msg, title } = req.query;

    console.log(msg, title)

    res.render('test', 
        {
            message: msg || 'asdf', 
            titleVar: title || 'Title Here'
        });
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

router.get('/mrental/admin/:key', (req, res) => {

    res.render('admin-movie')

})


//request all movies in collection/DB
module.exports = router;