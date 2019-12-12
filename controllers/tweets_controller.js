const TweetModel = require("./../database/models/tweets_model");
const UserModel = require("./../database/models/users_model");

const index = async (req, res) => {
    try {
        let tweets = await TweetModel.find();
        res.render('tweets/index', { tweets });
    } catch(err) {
        return res.status(500).send(`Error: ${err}`);
    }
}

const tweetForm = async (req, res) => {
    const users = await UserModel.find().select("_id name");
    res.render('tweets/form', { users });
}

const create = async (req, res) => {
    let { message, user } = req.body;
    await TweetModel.create({ message, user });
    res.redirect('/tweets');
}

const show = async (req, res) => {
    let id = req.params.id;
    let tweet = await TweetModel.findById(id).populate("user");
    res.render('tweets/show', { tweet, id });
}

const destroy = async (req, res) => {
    await TweetModel.findByIdAndRemove(req.params.id);
    res.redirect('/tweets');
}

const update = async (req, res) => {
    const id = req.params.id;
    await TweetModel.findByIdAndUpdate(id, req.body);
    // req.body
    res.redirect(`/tweets/${id}`);
}

module.exports = {
    index,
    tweetForm,
    create,
    show,
    destroy,
    update
}