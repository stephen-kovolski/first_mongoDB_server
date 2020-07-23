const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const findMovie = require('../models/findMovie')
const admin_auth = require('../middleware/admin_auth');
const newError = require('../utilities/newError');


//routes to make

//add/delete movie inventory

//TODO make movie routes admin/user only include adminAuth/user

router.patch('/addinven', admin_auth, async(req, res) => {

    console.log(req.admin)

    const {movieId, inc}  = req.body;

    const adminLvl = req.admin.adminProperty.adminLevel; 
    

    



    try {

        if (typeof movieId === 'string' && movieId.length != 24) throw newError('movie id is invalid', 404);

        if (typeof inc != 'number') throw newError('invalid input used for movie increase', 400);



        if (
            (adminLvl === 1 && (inc > 1 || inc < 0))
                ||
            (adminLvl === 2 && (inc > 10 || inc < 0))
                ||
            (adminLvl === 3 && (inc > 100 || inc < 0))
        
            ){
                throw newError(`not authorized to increase by ${inc}`, 401)
            }

        const updateMovie = await Movie.findByIdAndUpdate(
            {_id: movieId}, 
            {$inc: {'inventory.available': inc}},
            {new: 1}
        );

        
        res.json({
            movie: updateMovie
        })


    } catch (err) {

        const errMsg = err.message || err;
        const errCode = err.code || 500;

        res.status(errCode).json({
            error: errMsg
        })

    }




})

router.patch('/removeinven', admin_auth, async(req, res) => {


    const {movieId, inc}  = req.body;

    const adminLvl = req.admin.adminProperty.adminLevel; 
    

    



    try {

        if (typeof movieId === 'string' && movieId.length != 24) throw newError('movie id is invalid', 404);

        if (typeof inc != 'number') throw newError('invalid input used for movie increase', 400);



        if (
            (adminLvl === 1 && (inc > 1 || inc < 0))
                ||
            (adminLvl === 2 && (inc > 10 || inc < 0))
                ||
            (adminLvl === 3 && (inc > 100 || inc < 0))
        
            ){
                throw newError(`not authorized to increase by ${inc}`, 401)
            }

        const updateMovie = await Movie.findByIdAndUpdate(
            {_id: movieId}, 
            {$inc: {'inventory.available': -inc}},
            {new: 1}
        );

        
        res.json({
            movie: updateMovie
        })


    } catch (err) {

        const errMsg = err.message || err;
        const errCode = err.code || 500;

        res.status(errCode).json({
            error: errMsg
        })

    }




})

router.get('/adminTest', admin_auth, async (req, res) => {
    try {

        res.json({message: 'youre an admin', admin_info: req.admin})

        } catch ( err) {

            const errMsg = err.message || err
            console.log('error in movie router test');
            res.status(500).json({error: errMsg})

        }
})

router.get('/all', async (req, res) => {

    try {
        
        const allMovies = await Movie.find();

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

router.get('/getmovie/:movieId', findMovie, (req, res) => {

    res.status(200).json({
        stauts: 200,
        message: 'A movie was found',
        movie: req.foundMovie

    })

})

router.delete('/delete/:movieId', findMovie, admin_auth, async (req, res) => { 
   
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
 
router.patch('/patch/:movieId', findMovie, async (req, res) => {
   
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

router.post('/post', async (req, res) => {

    try {

        const newMovie = await Movie.create(req.body)

        await newMovie.save()

        res.json({
            status: 201,
            new_movie: newMovie,
            message: 'added to DB'
        })

    } catch (err) {

        if ( err ) {
            
            console.log(err.message);

            res.status(500).json({
                message: "An error ocured During the Post Request",
                error: err.message,
                status: 500  
            })
            

        }

    }

})

//patch all movies to now have inventory that matches the model
router.patch('/moviepatch1', admin_auth, async (req, res) => {

    try {

            const report = await Movie.updateMany(
                {}, 
                {
                    inventory: {
                        available: 1,
                        rented: []
                    }
                }
            )

            res.json({
                allDoc: await Movie.find({}),
                report: report,
                message: 'successfull patch'
            })

    } catch (err){

        res.status(500).json({error: err.message || err})
    }

})





module.exports = router;