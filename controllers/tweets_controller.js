const TweetModel = require("./../database/models/tweets_model");

let tweets = [
    { tweet: "I'm a tweet", name: "Mark" },
    { tweet: "I'm the second tweet", name: "Bruce" }
];

const index = (req, res) => {
    TweetModel.find()
        .then(tweets => {
            res.render('tweets/index', { tweets });
        })
}

// const index = (req, res) => {
//     res.render('tweets/index', { tweets });
// }

const tweetForm = (req, res) => {
    res.render('tweets/form');
}

const create = (req, res) => {
    let { name, tweet } = req.body;
    tweets.push({name, tweet});
    res.redirect('/tweets');
}

const show = (req, res) => {
    let tweet = tweets[req.params.id];
    let id = req.params.id;
    res.render('tweets/show', { tweet, id });
}

const destroy = (req, res) => {
    tweets.splice(req.params.id, 1);
    res.redirect('/tweets');
}

const update = (req, res) => {
    tweets[req.params.id].tweet = req.body.tweet;
    res.redirect("/tweets");
}

module.exports = {
    index,
    tweetForm,
    create,
    show,
    destroy,
    update
}