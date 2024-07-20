// GET Homepage
const travel = (reg, res) => {
    res.render('travel', {title: "Travl Getaways"});
};

module.exports = {
    travel
};