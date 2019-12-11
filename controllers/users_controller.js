const UserModel = require('./../database/models/users_model');

const index = async (req, res) => {
    const users = await UserModel.find();
    res.render("users/index", { users });
}

// now to create a new user
const userForm = (req, res) => {
    res.render("users/form");
}

module.exports = {
    index,
    userForm
}