const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {

    const fileLocation = process.cwd() + '\\public\\home.html';


    res.sendFile(fileLocation);   

});

//request all movies in collection/DB
module.exports = router;