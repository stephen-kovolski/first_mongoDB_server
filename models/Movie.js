const mongoose = require('mongoose')
const validator = require('validator')
const Movie = new mongoose.Schema({


    //this is the schema we will be working with.  The way this is set up will be how all other objects will be set up and it will be how we access the informtion within the DB.

   

    title: {
        unique: true,
        require: true,
        type: String
    },

    release: {
        require: true,
        type: Number

    },

    imdb: {
        require: true,
        type: String,
        validate: (value) => {

            const urlTest = !validator.isURL(value);
            const imdbTest = /imdb/;

            if(urlTest && imdbTest.test(value)) { //this is saying if the URL was valid and the link has imdb in it.

                throw new Error('IMDB link was invalid')

            }

        }
    },

    img: {
        require: true,
        type: String,
        validate: (value) => {

            const test = !validator.isURL(value);
        
            if(test) {

                throw new Error('image link was invalid')

            }

        }
    },

    inventory: {
        required: false,
        type: Object,
        default: {
            available: 1,
            rented: 0
        }
    }

})

module.exports = mongoose.model(`Movie`, Movie);  