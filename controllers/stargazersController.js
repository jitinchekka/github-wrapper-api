const Octokit = require("octokit").Octokit;
const cleanObject = require("../utils/cleanObject");
const dotenv = require("dotenv");
dotenv.config();
const API_KEY = process.env.Github_Api;
console.log("API_KEY is: " + API_KEY);
const octokit = new Octokit({
	auth: API_KEY,
});

const getStargazers = async (req, res) => {
	try {
		let username = req.body.username;
		if (username) {
			const { data } = await octokit.request(
				"GET /repos/{owner}/{repo}/stargazers",
				{
					owner: req.body.username,
					repo: req.body.repo,
				}
			);
			res.status(200).json(data);
		}
		else {
			// Find the authenticated user
			const { authuser } = await octokit.request("GET /user", {
				token: API_KEY,
			});
			username = authuser.login;
			const { data } = await octokit.request(
				"GET /repos/{owner}/{repo}/stargazers",
				{
					owner: username,
					repo: req.params.repoName,
				}
			);
			res.status(200).json(data);
		}
	} catch (err) {
		console.log("Error\n");
		console.log("Repo name is: " + req.params.repoName);
		res.status(404).json({ message: err.message });
	}
};

module.exports = {
	getStargazers,
};
