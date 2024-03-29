# GitHub Wrapper API

### Author
> [@jitinchekka](https://github.com/jitinchekka)

### Built With
<div align="center">
<img src="https://badges.aleen42.com/src/node.svg" alt="Node.js">
<img src="https://badges.aleen42.com/src/javascript.svg" alt="JavaScript">
<img src="https://img.shields.io/badge/Postman-FF6C37?style=flat&logo=Postman&logoColor=white" alt="Postman"/>
 ![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white
</div>

### Installation
1. Clone the repo using the command 
``` shell
git clone https://github.com/jitinchekka/github-wrapper-api-cometlabs.git 
```
2. Install all the packages using the command
``` shell
npm i
```
3. Start the server on port 3000 by default
``` shell
npm start 
```
OR
``` shell
node inde.js
```
4. Create a .env file and store your Github Personal Access token in the following Way   
Example: 
```
Github_Api= YOUR_PAT
```
Replace your PAT by your PAT   
5. Test the API using Postman

### API Endpoints
1. `GET /api/repos`: API endpoint that can list all Repos of a User   
**Request Body:**
- Username of user (if not mentioned lists the repos of authenticated user)
2. `POST /api/repos`:  API endpoint that can create a repo with the name provided by the user   
**Request Body:**
- name (Compulsory)
- description(Optional)
- private (optional defaults to true)
3. `GET /api/repos/:repoName/topics`: API endpoint for listing the repo topics   
**Request Body:**
- username (Optional defaults to the authenticated user)
Request Params:
- repoName
4. `PUT /api/repos/:repoName/topics`: API endpoint for Updating the repo topics   
**Request Body:**
- username (Optional defaults to the authenticated user)
Request Params:
- repoName
5. `DELETE /api/repos/:repoName/topics`: API endpoint for deleting the repo topics   
__Request Body:__
- username (Optional defaults to the authenticated user)
Request Params:
- repoName
6. `GET /api/stargazers/`: API endpoint for listing all stargazers   
__Request Body:__
- username (Optional defaults to the authenticated user)
- repo
7. `GET /api/repos/repo-with-filters?owner=false`: API endpoint to list all the repos of a given user with > 5 commits in last 10 days   
__Request Query Params:__   
- owner=false (commits made by anyone)   
__Request Body:__   
- username (Optional defaults to the authenticated user)      
![Screenshot 7](/images/repo-filters.jpg)   
8. `GET /api/repos/repo-with-filters?owner=true`: API endpoint to list all the repos of a given user with > 5 commits by owner in last 10 days   
__Request Query Params:__   
- owner=true (commits made by owner)   
__Request Body:__   
- username (Optional defaults to the authenticated user)   
![Screenshot 8](/images/repo-filters-owner.jpg)
