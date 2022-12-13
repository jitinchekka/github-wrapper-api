const express = require("express");
const reposController = require("../controllers/controller");
const reposTopicsController = require("../controllers/repoTopicsController");
const router = express.Router();

router.get("/", reposController.getRepos);
router.post("/", reposController.createRepo);

// get repository topics
router.get("/:repoName/topics", reposTopicsController.getRepoTopics);

// update all respository topics
router.put("/:repoName/topics", reposTopicsController.updateRepoTopics);

// delete all repository topics
router.delete("/:repoName/topics", reposTopicsController.deleteRepoTopics);

module.exports = router;
