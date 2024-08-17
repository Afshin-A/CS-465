const mongoose = require('mongoose');
// The schema
const Trip = require('../models/travlr');
// The compiled model
const Model = mongoose.model('trips');

// from module 5 guide
const tripsList = async(req, res) => {
    const q = await Model
        .find({})
        .exec();
    
    console.log(q);

    if (!q) {
        return res
            .status(404)
            .json(err);
    }
    else {
        return res
            .status(200)
            .json(q);
    }
};


// from the book
const tripsFindByCode = async(req, res) => {
    const q = await Model
        .find({'code': req.params.tripCode})
        .exec();
    if (!q) {
        return res.status(404).json(err);
    }
    else {
        return res.status(200).json(q);
    }
};

module.exports = {
    tripsList,
    tripsFindByCode
};