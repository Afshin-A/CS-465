// GET Homepage


const fs = require('fs');

// TODO: Replace before deployment
// We don't want to read a file everytime a request is received
// fs.readFileSync reads a file synchronously
var trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));

const travel = (reg, res) => {
    console.log('Rendering travel page');
    res.render('travel', {title: "Travl Getaways", trips});
};

module.exports = {
    travel
};