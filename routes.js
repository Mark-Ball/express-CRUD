const express = require('express');
const router = express.Router();
const TweetsController = require("./controllers/tweets_controller");

router.get("/tweets", TweetsController.index);
router.get("/tweets/new", TweetsController.tweetForm);
router.post("/tweets", TweetsController.create);
router.get("/tweets/:id", TweetsController.show);

module.exports = router;