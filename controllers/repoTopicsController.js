const Octokit = require("octokit").Octokit;
const dotenv = require("dotenv");
const { use } = require("../routes/repo");
dotenv.config();
const API_KEY = process.env.Github_Api;
console.log("API_KEY is: " + API_KEY);
const octokit = new Octokit({
  auth: API_KEY,
});

// API endpoint for listing all the topics of a repository
const getRepoTopics = async (req, res) => {
  try {
    console.log("Get repo topics\n");
    let username = req.body.username;
    if (!username) {
      // List all the repositories of the authenticated user
      const { data } = await octokit.request("GET /user", {
        token: API_KEY,
      });
      username = data.login;
      console.log("Username is: " + username);
    }
    const { data } = await octokit.request("GET /repos/{owner}/{repo}/topics", {
      owner: username,
      repo: req.body.repo,
    });
    res.status(200).json(data.names);
  } catch (err) {
    console.log("Error\n");
    console.log("Username is: " + req.body.username+" and repo is: "+req.body.repo);
    res.status(404).json({ message: err.message });
  }
};

module.exports = {
  getRepoTopics,
};
