const tweets = ["I'm a tweet"];

const index = (req, res) => {
    res.render('tweets/index', { tweets });
}

module.exports = {
    index
}