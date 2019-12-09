const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
  tweet: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
});

module.exports = ContactSchema;