const mongoose = require("mongoose");
const TweetSchema = require("./../schemas/tweets_schema");

const TweetModel = mongoose.model("tweet", TweetSchema);

module.exports = TweetModel;