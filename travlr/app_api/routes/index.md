const express = require('express');
const router = express.Router();
const ctrlLocations = require('../controllers/locations');
const ctrlReviews = require('../controllers/reviews');


// router for locations
// this new syntax of chain calling the crud methods makes it so that
// we don't have to type router.get(...); router.post(...); router.put(...);
// makes it a bit more compact 
router
    .route('/locations')
    .get(ctrlLocations.locationsListByDistance)
    .post(ctrlLocations.locationsCreate);

router
    // :locationid syntax makes it so we can use locationid as a parameter
    .route('/locations/:locationid')
    .get(ctrlLocations.locationsReadOne)
    .put(ctrlLocations.locationsUpdateOne)
    .delete(ctrlLocations.locationsDeleteOne);

// router for reviews
router
    .route('/locations/:locationid/reviews')
    // reminder note of how this works: when post method is called on this url,
    // the controller function ctrlReviews.reviewsCreate is called
    .post(ctrlReviews.reviewsCreate)
    .put(ctrlReviews.reviewsReadOne)
    .delete(ctrlReviews.reviewsDeleteOne);

// makes other modules be able to export router using the require method
module.exports = router;