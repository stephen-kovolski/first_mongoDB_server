let Movie = require('../models/Movie');

async function findMovie(req, res, next){


    try{

        const id = req.params.movieId;
        let foundMovie = await Movie.find({_id: id});

        if (foundMovie.length == 0) { 

            res.status(404).json({
                status: 404,
                message: 'No movie with the given id'
            })
            
        } else {

            foundMovie = foundMovie[0];

            req.foundMovie = foundMovie

            next()

        }

    }catch(err){
            res.status(500).json({
                status: 500,
                message: err.message,
                full_report: err
            })
        }

}

module.exports = findMovie;