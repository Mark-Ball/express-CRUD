const mongoose = require('mongoose');
const UserSchema = require("./../schemas/users_schema");

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;