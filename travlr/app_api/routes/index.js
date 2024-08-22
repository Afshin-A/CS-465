const express = require('express');
const router = express.Router();

const tripsController = require('../controllers/trips');

router
    .route('/trips')
    .get(tripsController.tripsList)
    .post(tripsController.tripsAddTrip); // routing post request

router
    .route('/trips/code/:tripCode') // can be retrieved using req.params.tripCode, where req is a request object
    .get(tripsController.tripsFindByCode)
    .put(tripsController.tripsUpdateTrip);

module.exports = router;


/* This doesn't work for single exports. Only use when exporting multiple exports
module.exports = {
        router
};
*/
