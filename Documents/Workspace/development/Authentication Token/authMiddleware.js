const jwt = require('jsonwebtoken');

const verifyToken = (req,res,next) => {
    const bearerToken = req.headers['authorization'];

    if(typeof bearerToken !== 'undefined'){
        const bearer = bearerToken.split(' ');
        const token = bearer[1]

        jwt.verify(token, '1234',(err,authData) => {
            if(err) {
                res.sendStatus(403) //Forbidden
            } else {
                req.authData = authData
                next();
            }
        })
    } else {
        res.sendStatus(401) // Unauthorized
    }
}

module.exports = verifyToken;