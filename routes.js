const express = require('express');
const router = express.Router();
const TweetsController = require("./controllers/tweets_controller");
const UsersController = require("./controllers/users_controller");

const methodOverride = require('method-override');

// Tweets routes
router.get("/tweets", TweetsController.index);
router.get("/tweets/new", TweetsController.tweetForm);
router.post("/tweets", TweetsController.create);
router.get("/tweets/:id", TweetsController.show);
router.delete("/tweets/:id", TweetsController.destroy);
router.put("/tweets/:id", TweetsController.update);

// Users routes
router.get("/users", UsersController.index);
router.get("/users/new", UsersController.userForm);
router.post("/users", UsersController.create);
router.get("/users/:id", UsersController.show);
router.delete("/users/:id", UsersController.destroy);

module.exports = router;