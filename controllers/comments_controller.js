const TweetModel = require('./../database/models/tweets_model');

const create = async (req, res) => {
    const { id } = req.params;
    const { comment } = req.body;

    const tweet = await TweetModel.findById(id);

    tweet.comments.push({ comment });
    await tweet.save();

    res.redirect(`/tweets/${id}`);
}

module.exports = { create }