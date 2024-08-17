// to connec to database
const mongoose = require('mongoose');
// importing model we created in app_server/models/travl.js
const loc = mongoose.model('trips');


const reviewsReadOne = (reg, res) => {
    // example of how to send API respnse
    res
        .status(200) // resopnse status code
        .json({"status": "success"}); // response body
};

const reviewsDeleteOne = (reg, res) => {
    res
    .status(200)
    .json({"status": "success"});
};

module.exports = {
    reviewsReadOne,
    reviewsDeleteOne
}
