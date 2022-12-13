const Octokit = require("octokit").Octokit;
const dotenv = require("dotenv");
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
      repo: req.params.repoName,
    });
    res.status(200).json(data.names);
  } catch (err) {
    console.log("Error\n");
    console.log("Repo name is: " + req.params.repoName);
    res.status(404).json({ message: err.message });
  }
};

// API endpoint for updating all the topics of a repository
const updateRepoTopics = async (req, res) => {
  try {
    console.log("Update repo topics\n");
    let username = req.body.username;
    if (!username) {
      // Authenticated user
      const { data } = await octokit.request("GET /user", {
        token: API_KEY,
      });
      username = data.login;
      console.log("Username is: " + username);
    }
    const { data } = await octokit.request("PUT /repos/{owner}/{repo}/topics", {
      owner: username,
      repo: req.params.repoName,
      names: req.body.names,
    });
    res.status(200).json(data.names);
  } catch (err) {
    console.log("Error\n");
    console.log("Repo name is: " + req.params.repoName+" and username is: "+req.body.username);
    console.log("Topics are: " + req.body.names);
    res.status(404).json({ message: err.message });
  }
};

// API endpoint for deleting all the topics of a repository
const deleteRepoTopics = async (req, res) => {
  try {
    console.log("Delete repo topics\n");
    let username = req.body.username;
    if (!username) {
      // Authenticated user
      const { data } = await octokit.request("GET /user", {
        token: API_KEY,
      });
      username = data.login;
      console.log("Username is: " + username);
    }

    const { data } = await octokit.request("PUT /repos/{owner}/{repo}/topics", {
      owner: username,
      repo: req.params.repoName,
      names: [], // empty array
    });
    res.status(200).json(data.names);
  } catch (err) {
    console.log("Error\n");
    console.log("Repo name is: " + req.params.repoName);
    res.status(404).json({ message: err.message });
  }
};
module.exports = {
  getRepoTopics,
  updateRepoTopics,
  deleteRepoTopics,
};
