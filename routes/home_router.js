const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const findMovie = require('../models/findMovie')

router.get('/', (req, res) => {
    res.send('gfy');   

});

//request all movies in collection/DB
router.get('/movie/all', async (req, res) => {

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

router.delete('/delete/:movieId', findMovie, async (req, res) => { //dont forget try/catch - fix the route
   
    try {

        await Movie.findByIdAndDelete(req.params.movieId);

        res.status(200).json({
            status: 200,
            message: 'Item deleted successfully',
            deleted_movie: req.foundMovie
        })


    } catch (err) {

        console.log('error in home_router:' + err.message);

        res.status(500).json({
            status: 500,
            message: 'Could not delete, error occured:' + err.message
        })

    }
})
 
router.patch('/movie/patch/:movieId', findMovie, async (req, res) => {//dont forget try/catch - fix the route
   
    const id = req.params.movieId;

    let newVersion = req.foundMovie._v + 1;

    req.body._v = newVersion;

    try {

        await Movie.updateOne({ _id: id}, req.body);

        const updatedDocument = await Movie.findById(id);

        res.status(200).json({
            status: 200,
            new_document: updatedDocument,
            old_document: req.foundMovie
        })
        
    } catch (error) {

        res.status(500).json({
            status: 500,
            message: 'Could not patch, error occured:' + error.message
        })

    }
   
   
    Movie.update({_id: id}, req.body)
})



router.post('/movies/all', async (req, res) => {

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