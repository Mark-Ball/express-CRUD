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

const show = async (req, res) => {
    const id = req.params.id;
    const user = await UserModel.findById(id);
    res.render("users/show", { user });
}

module.exports = {
    index,
    userForm,
    create,
    show
}