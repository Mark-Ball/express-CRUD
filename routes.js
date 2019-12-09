const express = require('express');
const router = express.Router();
const TweetsController = require("./controllers/tweets_controller");

const methodOverride = require('method-override');

router.get("/tweets", TweetsController.index);
router.get("/tweets/new", TweetsController.tweetForm);
router.post("/tweets", TweetsController.create);
router.get("/tweets/:id", TweetsController.show);
router.delete("/tweets/:id", TweetsController.destroy);

module.exports = router;