// To make a wrapper over GitHub API and automate the some tasks 
const express = require('express');

const app = require('express')();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // for parsing application/json
app.listen(PORT, () => {
	  console.log(`Server is listening on port ${PORT}`);
});