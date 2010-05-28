var jQT = new $.jQTouch({
	preloadImages: [
		'jqtouch/themes/apple/img/backButton.png',
		'jqtouch/themes/apple/img/blueButton.png',
		'jqtouch/themes/apple/img/whiteButton.png',
		'jqtouch/themes/apple/img/loading.gif'
	]
});

// Return the key's of an object
// Useage:
// var obj = {a: 1, b: 2, c: 3, d: 4, kitty: 'cat'}
// alert($.keys(obj));    // a,b,c,d,kitty
$.extend({
	keys: function(obj){
		var a = [];
		$.each(obj, function(k){ a.push(k) });
		return a;
	}
})

// Some sample Javascript functions:
$(function(){
	$('a[target="_blank"]').click(function() {
		if (confirm('This link opens in a new window.')) {
			return true;
		} else {
			$(this).removeClass('active');
			return false;
		}
	});

	// Orientation callback event
	$('body').bind('turn', function(e, data){
		$('#orient').html('Orientation: ' + data.orientation);
	});

	// Page animations end with AJAX callback event, example 1 (load remote HTML only first time)
	$('#callback').bind('pageAnimationEnd', function(e, info){
		if (!$(this).data('loaded')) {                      // Make sure the data hasn't already been loaded (we'll set 'loaded' to true a couple lines further down)
			$(this).append($('<div>Loading</div>').         // Append a placeholder in case the remote HTML takes its sweet time making it back
				load('jqtouch/demos/igithub/ajax.html .info', function() {        // Overwrite the "Loading" placeholder text with the remote HTML
					$(this).parent().data('loaded', true);  // Set the 'loaded' var to true so we know not to re-load the HTML next time the #callback div animation ends
			}));
		}
	});

	
	function string2charCodeString (s){
		var i, f = 0, a = [];

		s += '';
		f = s.length;

		for (i = 0; i<f; i++) {
			a[i] = s.charCodeAt(i);
		}

		return a.join('_');
	}
	
	function charCodeString2string (s){
		var i, f = 0, a = [], s2 = '';

		s += '';
		a = s.split('_');
		
		f = a.length;

		for (i = 0; i<f; i++) {
			s2 += String.fromCharCode(parseInt(a[i]));
		}

		return s2;
	}
	
	var test1 = "ABC";
	var test2 = "http://github.com/rails/rails/tree/master/actionmailer/";
	var test3 = "http://github.com/rails/rails/blob/master/actionmailer/install.rb";
	
	var chars1 = string2charCodeString(test1);
	var chars2 = string2charCodeString(test2);
	var chars3 = string2charCodeString(test3);	
	
	var strings1 = charCodeString2string(chars1);
	var strings2 = charCodeString2string(chars2);
	var strings3 = charCodeString2string(chars3);
	
	console.log(test1, test2, test3);
	console.log(chars1,chars2,chars3);
	console.log(strings1,strings2,strings3);
	
	

	// GitHub API wrapper. http://develop.github.com/
	function GitHub(){}

	// http://develop.github.com/p/repo.html
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

	// TESTING
	var fullstack = true;
	
	if(fullstack)
	{
		// FULL STACK
		// var user = "chrisjacob";
		var user = 'rails';
		var repo = "";
		var branches = [];
		var branch = "";
		var commit_sha = "";
		var root_tree_sha = "";
		var tree_sha = "";
	
		GitHub.RepositoryAPI.ShowUser(user, function(json, status){
			console.log('FULL STACK Repository.ShowUser');
			$.each(json, function(i){
				console.log(this);
				console.log($.keys(this));
				
				// repo = this.name;
				// repo = 'chrisjacob.github.com';
				repo = 'rails';
			
				GitHub.RepositoryAPI.ShowUserRepoBranches(user, repo, function(json, status){
					console.log('FULL STACK Repository.ShowUserRepoBranches');
					$.each(json, function(i){
						console.log(this);
						console.log($.keys(this));
						
						branches = $.keys(this);
						branch = branches[0];
						console.log(branch);
						
						commit_sha = this[branch]
						console.log(commit_sha);
						
						GitHub.CommitsAPI.ShowUserRepoSha(user, repo, commit_sha, function(json, status){
							console.log('FULL STACK Commits.ShowUserRepoSha');
							$.each(json, function(i){
								console.log(this);
								console.log($.keys(this));
								
								root_tree_sha = this.tree;
								console.log(root_tree_sha);
								
								GitHub.ObjectAPI.TreeShowUserRepoSha(user, repo, root_tree_sha, function(json, status){
									console.log('FULL STACK ObjectAPI.TreeShowUserRepoSha ROOT');
									$.each(json, function(i){
										console.log(this);
										// console.log($.keys(this));
										
										var object_name = this.name;
										
										if(this.type == 'tree')
										{
											tree_sha = this.sha;
											
											GitHub.ObjectAPI.TreeShowUserRepoSha(user, repo, tree_sha, function(json, status){
												console.log('FULL STACK ObjectAPI.TreeShowUserRepoSha ' + object_name);
												$.each(json, function(i){
													console.log(this);
													// console.log($.keys(this));

												});
											});
										}
										
										if(this.type == 'blob')
										{									
											GitHub.ObjectAPI.BlobShowUserRepoShaPath(user, repo, root_tree_sha, object_name, function(json, status){
												console.log('FULL STACK ObjectAPI.BlobShowUserRepoShaPath ' + object_name);
												$.each(json, function(i){
													console.log(this);
													// console.log($.keys(this));

													var mime_match = /text\//i
													if(!mime_match.test(this.mime_type))
													{
														// we don't yet support non-text files such as binary files
													}
													else
													{
														// plain text
														//$('#code').append('<p>'+ object_name +'</p><pre></pre>');
														//$('#code > pre:last').text(this.data);
														//// .text() calls the DOM method .createTextNode(), which replaces special characters with their HTML entity equivalents (such as &lt;  for <).

														// styled text
														$('#code').append('<p>'+ object_name +'</p><pre class="prettyprint"></pre>');
														$('#code > pre:last').text(this.data).html(prettyPrintOne($('#code > pre:last').html()));
														// .prettyPrintOne() allows you to pass in a string to be prettified. 
													}
												
												});
											});
										}
										
									});
								});
								
								return false; // exit the loop after first iteration
							});
						});
						
						return false; // exit the loop after first iteration
					});
				});
			
				return false; // exit the loop after first iteration
			});
		});
	}
	else
	{
		// REPO
		GitHub.RepositoryAPI.ShowUser("chrisjacob", function(json, status){
			console.log('Repository.ShowUser');
			$.each(json, function(i){
				console.log(this);
			});
		});
	
		GitHub.RepositoryAPI.ShowUserRepo("chrisjacob", "igithub", function(json, status){
			console.log('Repository.ShowUserRepo');
			$.each(json, function(i){
				console.log(this);
			});
		});
	
		GitHub.RepositoryAPI.ShowUserRepoBranches("chrisjacob", "igithub", function(json, status){
			console.log('Repository.ShowUserRepoBranches');
			$.each(json, function(i){
				console.log(this);
			});
		});
	
		// COMMITS
		GitHub.CommitsAPI.ListUserRepoBranch("chrisjacob", "igithub", "master", function(json, status){
			console.log('Commits.ListUserRepoBranch');
			$.each(json, function(i){
				console.log(this);
			});
		});
	
		GitHub.CommitsAPI.ShowUserRepoSha("chrisjacob", "igithub", "7df8cd7d183cf86944be1c2360155b6bdbf12883", function(json, status){
			console.log('Commits.ShowUserRepoSha');
			$.each(json, function(i){
				console.log(this);
			});
		});
		
		// OBJECT
		GitHub.ObjectAPI.TreeShowUserRepoSha("chrisjacob", "igithub", "dc8c12208b7b22c1ba9b8313a2b2d21219a1bcfb", function(json, status){
			console.log('ObjectAPI.TreeShowUserRepoSha');
			$.each(json, function(i){
				console.log(this);
			});
		});
		
		GitHub.ObjectAPI.BlobShowUserRepoShaPath("chrisjacob", "igithub", "dc8c12208b7b22c1ba9b8313a2b2d21219a1bcfb", "public/javascripts/application.js", function(json, status){
			console.log('ObjectAPI.BlobShowUserRepoShaPath');
			$.each(json, function(i){
				console.log(this);
			});
		});
	} 
});