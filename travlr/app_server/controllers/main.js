// GET Homepage
const index = (reg, res) => {
    res.render('index', {title: "Travl Getaways"});
};

module.exports = {
    index
};