const UserModel = require('./../database/models/users_model');

const index = async (req, res) => {
    console.log("users index hit");
    const users = await UserModel.find();
    res.render("users/index", { users });
}

module.exports = {
    index
}