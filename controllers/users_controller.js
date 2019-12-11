const UserModel = require('./../database/models/users_model');

const index = async (req, res) => {
    const users = await UserModel.find();
    res.render("users/index", { users });
}

const userForm = (req, res) => {
    res.render("users/form");
}

const create = async (req, res) => {
    await UserModel.create(req.body)
    res.redirect("/users");
}

module.exports = {
    index,
    userForm,
    create
}