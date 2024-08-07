// GET Homepage
const index = (reg, res) => {
    console.log('rendering index');
    res.render('index', {title: "Travl Getaways"});
};

module.exports = {
    index
};