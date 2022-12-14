const Octokit = require("octokit").Octokit;
const cleanObject = require("../utils/cleanObject");
const dotenv = require("dotenv");
dotenv.config();
const API_KEY = process.env.Github_Api;
console.log("API_KEY is: " + API_KEY);
const octokit = new Octokit({
  auth: API_KEY,
});

// API endpoint to get the list of all the repositories of the user
const getRepos = async (req, res) => {
  let username = req.body.username;
  console.log("Username is: " + username);
  try {
    if (!username) {
      // List all the repositories of the authenticated user
      const { data } = await octokit.request("GET /user/repos");
    } else {
      console.log("Username is: " + username);
      const { data } = await octokit.request("GET /users/{username}/repos", {
        username: username,
      });
      // Send the list of repositories to the client
      res.status(200).json(data);
    }
  } catch (err) {
    console.log(req.body.username);
    res.status(404).json({ message: err.message });
  }
};

// API endpoint to create a new repository

const createRepo = async (req, res) => {
  console.log("Name is: " + req.body.name);
  try {
    const data = await octokit.request("POST /user/repos", {
      name: req.body.name,
      description: req.body.description || "",
      private: req.body.private || true,
    });
    const repository = cleanObject(data);
    res.status(201).json({ data });
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

// API endpoint to get the list of repositories with filters :
//  API endpoint to list all the repos of a given user with > 5 commits in last 10 days
// API endpoint to list all the repos of a given user with > 5 commits by owner in last 10 days
const getRepoWithFilters = async (req, res) => {
  try {
    let username = req.body.username;
    let owner = req.query.owner;
    // Typecast the owner flag to boolean
    owner = owner === "true";
    let commits = 5;
    let days = 10;
    // Get the list of repositories of the user and for each repository get the list of commits
    // If the number of commits is greater than the given number of commits, then add the repository to the list
    // If the owner flag is set, then check if the commit is made by the owner of the repository
    // If the owner flag is not set, then check if the commit is made by any user
    let commitList = [];
    let repoList = [];
    let response = []; // List of repositories with > 5 commits in last 10 days
    if (!username) {
      // List all the repositories of the authenticated user
      const { data } = await octokit.request("GET /user/repos");
      repoList = data.map((repo) => repo.name);
    }
    else {
      console.log("Username is: " + username);
      const { data } = await octokit.request("GET /users/{username}/repos", {
        username: username,
      });
      repoList = data.map((repo) => repo.name);
    }
    for (let i = 0; i < repoList.length; i++) {
      const { data } = await octokit.request(
        "GET /repos/{owner}/{repo}/commits",
        {
          owner: username,
          repo: repoList[i],
        }
      );
      commitList = data.map((commit) => commit.commit);
      let committerList = data.map((commit) => commit.committer);
      let count = 0;
      for (let j = 0; j < commitList.length; j++) {
        var dateDiff = new Date() - new Date(commitList[j].author.date);
        // If the commit is made in the last 10 days i.e. 10*24*60*60*1000 = 864000000 milliseconds    
        if (dateDiff < days * 24 * 60 * 60 * 1000) {
          if (owner) { // If the owner flag is set to true then check if the commit is made by the owner of the repository
            if (committerList[j].login === username) {
              count++;
            }
          } else { // If the owner flag is set to false then check if the commit is made by any user
            count++;
          }
        }
      }
      if (count > commits) { // If the number of commits is greater than the given number of commits, then add the repository to the list
        response.push(repoList[i]);
      }
    }
    res.status(200).json(response);
  } catch (err) {
    console.log("Error");
    console.log(req.body.username);
    res.status(404).json({ message: err.message });
  }
};

// Exporting the functions
module.exports = {
  getRepos,
  createRepo,
  getRepoWithFilters,
};
