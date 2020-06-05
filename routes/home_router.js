const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const findMovie = require('../models/findMovie')

router.get('/', (req, res) => {
    res.send('gfy');   

});

//request all movies in collection/DB
router.get('/all', async (req, res) => {

    try {
        
        const allMovies = await Movie.find();
        let Json;

        if (allMovies.length == 0) {
            Json = {
                status: 200,
                message: 'No movies currently in the database',

            }
        } else {
            Json = {
                status: 200,
                message: 'All movies were found',
                movies: allMovies

        }

        res.status(200).json({
            status: 200,
            message: 'All movies were found',
            movies: allMovies
        })
    }

    } catch (err) {
        
        res.status(500).json({
            status: 500,
            message: 'An error occured',
            error: error.message,
            full_report: err
        })

    }

})

router.get('/movie/:movieId', findMovie, (req, res) => {

    res.status(200).json({
        stauts: 200,
        message: 'A movie was found',
        movie: req.foundMovie

    })

})

router.delete('/', (req, res) => { //dont forget try/catch - fix the route
    Movie.findByIdAndDelete
    //once item is deleted make sure to show the client that its not there anymore
})
 
router.patch('/', (req, res) => {//dont forget try/catch - fix the route
    Movie.update({_id: id}, req.body)
})



router.post('/', async (req, res) => {

    try {

        const newMovie = await new Movie(req.body)

        await newMovie.save()

        res.json({
            status: 201,
            new_movie: newMovie,
            message: 'added to DB'
        })

    } catch (err) {

        if ( err ) {
            
            console.log(err.message);

            res.json({
                message: "An error ocured During the Post Request",
                error: err.message,
                status: 500
            })
            

        }

    }

})

module.exports = router;