// contains the script for entering the seed data into MongoDB instance

// import mongodb connection
const Mongoose = require('./db');
// import schema
const Trip = require('./travlr');

// read seed data from json file
var fs = require('fs');
var trips = JSON.parse(fs.readFileSync('../../data/trips.json'));

// delete existing records, then insert seed data into database
const seedDB = async () => {
    // delete everything
    await Trip.deleteMany({});
    // insert data
    await Trip.insertMany(trips);
};

// close mongodb connection and exit
seedDB().then(async() => {
    await Mongoose.connection.close();
    process.exit(0);
});