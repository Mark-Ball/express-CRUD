const mongoose = require("mongoose");
const TweetSchema = require("./../schemas/tweets_schema");

const TweetModel = mongoose.model("tweet", TweetSchema); //tweet is the name of the collection in the database

module.exports = TweetModel;