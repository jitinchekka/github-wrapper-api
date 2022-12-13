const express = require("express");
const reposController = require("../controllers/controller");

const router = express.Router();

router.get("/", reposController.getRepos);
module.exports = router;