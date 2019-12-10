const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TweetSchema = new Schema({
  tweet: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
});

module.exports = TweetSchema;