let tweets = [
    { tweet: "I'm a tweet", name: "Mark" }
];

const index = (req, res) => {
    res.render('tweets/index', { tweets });
}

const tweetForm = (req, res) => {
    res.render('tweets/form');
}

const create = (req, res) => {
    console.log(req.body);
    let { name, tweet } = req.body;
    tweets.push({name, tweet});
    res.redirect('/tweets');
}

module.exports = {
    index,
    tweetForm,
    create
}