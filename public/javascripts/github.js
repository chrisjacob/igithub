	// GitHub API wrapper. http://develop.github.com/
	function GitHub(){}

	// http://develop.github.com/p/repo.html
	GitHub.DataCache = {};
	GitHub.RepositoryAPI = function RepositoryAPI(){}
	GitHub.RepositoryAPI.ShowUser = function ShowUser(){}
	GitHub.RepositoryAPI.ShowUserRepo = function ShowUserRepo(){}
	GitHub.RepositoryAPI.ShowUserRepoBranches = function ShowUserRepoBranches(){}
	GitHub.RepositoryAPI.ShowUserRepoTags = function ShowUserRepoTags(){}
	
	// List All Repositories for a user
	// Return: repositories
	GitHub.RepositoryAPI.ShowUser = function(user, callback){
		requestURL = "http://github.com/api/v2/json/repos/show/" + user + "?callback=?";
		$.getJSON(requestURL, function(json, status){
			callback(json.repositories.reverse(), status);
		});
	}
	
// TODO Watched Repos
// To see which repositories a user is watching, you can call:
// /repos/watched/:user

// TODO Following Network
// If you want to look at the following network on GitHub, you can request the users that a specific user is following with:
// /user/show/:user/following

	// Show Repository Info - more in-depth information for a repository
	// Return: repository
	GitHub.RepositoryAPI.ShowUserRepo = function(user, repo, callback){
		requestURL = "http://github.com/api/v2/json/repos/show/" + user + "/" + repo + "?callback=?";
		$.getJSON(requestURL, function(json, status){
			callback(json, status);
		});
	}
	
	// List Repository Branches
	// Return: branches 
	GitHub.RepositoryAPI.ShowUserRepoBranches = function(user, repo, callback){
		requestURL = "http://github.com/api/v2/json/repos/show/" + user + "/" + repo + "/branches?callback=?";
		$.getJSON(requestURL, function(json, status){
			callback(json, status);
		});
	}
	
// TODO need test case
	// List Repository Tags
	// Return: tags
	GitHub.RepositoryAPI.ShowUserRepoTags = function(user, repo, callback){
		requestURL = "http://github.com/api/v2/json/repos/show/" + user + "/" + repo + "/tags?callback=?";
		$.getJSON(requestURL, function(json, status){
			callback(json, status);
		});
	}
	
	
	// http://develop.github.com/p/commits.html
	GitHub.CommitsAPI = function CommitsAPI(){}
	GitHub.CommitsAPI.ListUserRepoBranch = function ListUserRepoBranch(){}
	GitHub.CommitsAPI.ShowUserRepoSha = function ShowUserRepoSha(){}
	
	// List Commits on a Branch
	// Return: commits
	GitHub.CommitsAPI.ListUserRepoBranch = function(user, repo, branch, callback){
		requestURL = "http://github.com/api/v2/json/commits/list/" + user + "/" + repo + "/" + branch + "?callback=?";
		$.getJSON(requestURL, function(json, status){
			callback(json.commits, status);
		});
	}
	
	// Show a Specific Commit
	// Returns: commit
	GitHub.CommitsAPI.ShowUserRepoSha = function(user, repo, sha, callback){
		requestURL = "http://github.com/api/v2/json/commits/show/" + user + "/" + repo + "/" + sha + "?callback=?";
		$.getJSON(requestURL, function(json, status){
			callback(json, status);
		});
	}
	
	
	// http://develop.github.com/p/object.html
	GitHub.ObjectAPI = function ObjectAPI(){}
	GitHub.ObjectAPI.TreeShowUserRepoSha = function TreeShowUserRepoSha(){}
	GitHub.ObjectAPI.BlobShowUserRepoShaPath = function BlobShowUserRepoShaPath(){}
	
	// Show Tree Content for the tree SHA provided 
	// Return: tree
	GitHub.ObjectAPI.TreeShowUserRepoSha = function(user, repo, sha, callback){
		requestURL = "http://github.com/api/v2/json/tree/show/" + user + "/" + repo + "/" + sha + "?callback=?";
		$.getJSON(requestURL, function(json, status){
			callback(json.tree, status);
		});
	}
	
	// Show Blob Data for the tree SHA and path provided
	// Return: blob
	GitHub.ObjectAPI.BlobShowUserRepoShaPath = function(user, repo, sha, path, callback){
		requestURL = "http://github.com/api/v2/json/blob/show/" + user + "/" + repo + "/" + sha + "/" + path + "?callback=?";
		$.getJSON(requestURL, function(json, status){
			callback(json, status);
		});
	}