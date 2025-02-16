const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken'); // Enable JSON Web Tokens

const tripsController = require('../controllers/trips');
const authController = require('../controllers/authentication');
const { authenticate } = require('passport');

function authenticateJWT(req, res, next) {
    // console.log('In Middleware');
    const authHeader = req.headers['authorization'];
    // console.log('Auth Header: ' + authHeader);
    if (authHeader == null) {
        console.log('Auth Header Required but NOT PRESENT!');
        return res.sendStatus(401);
    }
    let headers = authHeader.split(' ');
    if (headers.length < 1) {
        console.log('Not enough tokens in Auth Header: ' +
            headers.length);
        return res.sendStatus(501);
    }
    const token = authHeader.split(' ')[1];
    // console.log('Token: ' + token);
    if (token == null) {
        console.log('Null Bearer Token');
        return res.sendStatus(401);
    }
    // console.log(process.env.JWT_SECRET);
    // console.log(jwt.decode(token));
    const verified = jwt.verify(token, process.env.JWT_SECRET, (err,
        verified) => {
        if (err) {
            return res.sendStatus(401).json('Token Validation Error!');
        }
        req.auth = verified; // Set the auth paramto the decoded object
    });
    next(); // We need to continue or this will hang forever
}


router
    .route('/trips')
    .get(tripsController.tripsList)
    .post(authenticateJWT, tripsController.tripsAddTrip); // routing post request

router
    .route('/trips/code/:tripCode') // can be retrieved using req.params.tripCode, where req is a request object
    .get(tripsController.tripsFindByCode)
    .put(authenticateJWT, tripsController.tripsUpdateTrip);

router
    .route('/register')
    .post(authController.register);

router
    .route('/login')
    .post(authController.login);


// Method to authenticate our JWT


module.exports = router;


/* This doesn't work for single exports. Only use when exporting multiple exports
module.exports = {
        router
};
*/
