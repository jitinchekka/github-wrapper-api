const express = require("express");
const stargazersController = require("../controllers/stargazersController");
const router = express.Router();

router.get("/", stargazersController.getStargazers);
module.exports = router;