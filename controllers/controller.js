const Octokit = require("octokit").Octokit;
const cleanObject=require('../utils/cleanObject');
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
		const repository=cleanObject(data);
		res.status(201).json({data});
	} catch (err) {
		res.status(409).json({ message: err.message });
	}
};

module.exports = {
	getRepos,
	createRepo,
};
