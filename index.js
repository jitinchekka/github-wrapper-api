// To make a wrapper over GitHub API and automate the some tasks 
const express = require('express');
// Importing the repos router ./routes/repo.js
const repos = require('./routes/repo'); 
const stargazers = require('./routes/stargazers');
const app = require('express')();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // for parsing application/json

app.get('/', (req, res) => {
	res.send('Hello World!');
});

// Requests to /api/repos will be handled by repos router
app.use('/api/repos', repos);
// Requests to /api/stargazers will be handled by stargazers router
app.use('/api/stargazers', stargazers);
app.listen(PORT, () => {
	  console.log(`Server is listening on port ${PORT}`);
});