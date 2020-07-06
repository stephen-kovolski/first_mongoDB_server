const apiKey = process.env.MOVIE_ADMIN_KEY

function admin_Auth(req, res, next) {

    const userKey = req.params.key

    if (apiKey != userKey) return res.status(401).json({message: 'You are not authorized to use this route'})

    next()

}

module.exports = admin_Auth