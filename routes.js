const express = require('express');
const router = express.Router();
const TweetsController = require("./controllers/tweets_controller");

router.get("/tweets", TweetsController.index);

module.exports = router;