const TweetModel = require("./../database/models/tweets_model");

let tweets = [
    { tweet: "I'm a tweet", name: "Mark" },
    { tweet: "I'm the second tweet", name: "Bruce" }
];

const index = async (req, res) => {
    try {
        let tweets = await TweetModel.find();
        res.render('tweets/index', { tweets });
    } catch(err) {
        return res.status(500).send(`Error: ${err}`);
    }
}

const tweetForm = (req, res) => {
    res.render('tweets/form');
}

const create = async (req, res) => {
    await TweetModel.create(req.body);
    res.redirect('/tweets');
}

const show = async (req, res) => {
    let id = req.params.id;
    let tweet = await TweetModel.findById(id);
    res.render('tweets/show', { tweet, id });
}

const destroy = async (req, res) => {
    await TweetModel.findByIdAndRemove(req.params.id);
    res.redirect('/tweets');
}

const update = async (req, res) => {
    await TweetModel.findByIdAndUpdate(req.params.id, req.body);
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