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

	
	// idEncode converts a string into a valid HTML id attribute [A-Za-z0-9_-] 
	// Useful for producing readable window.location.hash fragments
	//
	// Params:
	// "s" string to encode
	// "prefix" to be affixed before the encoded string - HTML id attributes must start with an [A-Za-z] char
	// "exclude" regex string of characters that should not be encoded
	// "spacer" the character that joins encoded items
	// "replace" object of post-encoded strings to str.replace e.g. {"-47-" = "_"} replaces all encoded "/" chars with a "_" 
	//
	// Example:
	// http://github.com/chris/project123/blob/master/new_mailer/install-file.rb
	// id_http-58-__github-46-com_chris_project123_blob_master_new-95-mailer_install-45-file-46-rb
	
	function idEncode ( s, prefix, exclude, spacer, replace )
	{
		if(typeof(s) != 'string') return false;
		
		prefix = typeof(prefix) != 'undefined' ? prefix : 'id_'; // use '' to not add any prefix
		exclude = typeof(exclude) != 'undefined' ? exclude : '[^A-Za-z0-9]'; // use '.' to encode every character
		spacer = typeof(spacer) != 'undefined' ? spacer : '-'; // use '' to not add any spacer
		replace = typeof(replace) != 'undefined' ? replace : { '-47-' : '_' }; // use FALSE to not make any replacements

		// encode chars
		regxExclude = new RegExp( exclude, 'g' );
		s = s.replace( regxExclude, function( matched ){
			return spacer + matched.charCodeAt( 0 ) + spacer;
		});
		
		// replace some special chars
		if(replace)
		{
			for ( var i in replace )
			{
				regxReplace = new RegExp( i, "g" );
				s = s.replace( regxReplace, replace[i] );
			}
		}

		// add the prefix and return
		return prefix + s;
	}
	
	
	// idDecode converts an "idEncode" string back to it's original string
	//
	// Params:
	// "s" string to decode
	// "prefix" to be removed from the string
	// "spacer" the character that joins encoded items
	// "replace" object of strings to str.replace e.g. {"_" = "/"} replaces all "_" chars with a "/"
	//
	// Example:
	// id_http-58-__github-46-com_chris_project123_blob_master_new-95-mailer_install-45-file-46-rb
	// http://github.com/chris/project123/blob/master/new_mailer/install-file.rb
	
	function idDecode ( s, prefix, spacer, replace )
	{
		if(typeof(s) != 'string') return false;
		
		prefix = typeof(prefix) != 'undefined' ? prefix : 'id_';
		spacer = typeof(spacer) != 'undefined' ? spacer : '-';
		replace = typeof(replace) != 'undefined' ? replace : {'_' : '/'};
		
		spacerLength = spacer.length;
		
		// remove prefix
		s = prefix ? s.slice( prefix.length ) : s;
		
		// replace some special chars
		if( replace )
		{
			for ( var i in replace )
			{
				regxReplace = new RegExp( i, "g" );
				s = s.replace( regxReplace, replace[i]);
			}
		}
		
		// decode chars
		regxCharCode = new RegExp( spacer+'\\d+'+spacer, 'g' );
		s = s.replace( regxCharCode, function( matched ){
			return String.fromCharCode( parseInt( matched.slice( spacerLength, matched.length - spacerLength ) ) );
		});

		return s;
	}
	
	var string1 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	var string2 = "`-=~!@#$%^&*()_+{}[];:'\"?/><,.\\|";
	var string3 = "http://github.com/chris/project123/blob/master/new_mailer/install-file.rb";
	var string4 = '';
	
	var encode1 = idEncode(string1);
	var encode2 = idEncode(string2);
	var encode3 = idEncode(string3);		
	var encode4 = idEncode(string4);	
	
	var decode1 = idDecode(encode1);
	var decode2 = idDecode(encode2);
	var decode3 = idDecode(encode3);
	var decode4 = idDecode(encode4);
	
	console.log(string1);
	console.log(encode1);
	console.log(decode1);
	
	console.log(string2);
	console.log(encode2);
	console.log(decode2);
	
	console.log(string3);
	console.log(encode3);
	console.log(decode3);
	
	console.log(string4);
	console.log(encode4);
	console.log(decode4);
	

	// Example:
	// http://github.com/chris/project123/blob/master/new_mailer/install-file.rb
	// 104-116-116-112-58-47-47-103-105-116-104-117-98-46-99-111-109-47-99-104-114-105-115-47-112-114-111-106-101-99-116-49-50-51-47-98-108-111-98-47-109-97-115-116-101-114-47-110-101-119-95-109-97-105-108-101-114-47-105-110-115-116-97-108-108-45-102-105-108-101-46-114-98
	function string2charCodeString (s){
		if(typeof(s) != 'string') return false;
		a = [];
		f = s.length;
		for (i = 0; i<f; i++) {
			a[i] = s.charCodeAt(i);
		}
		return a.join('-');
	}
	
	function charCodeString2string (s){
		if(typeof(s) != 'string') return false;
		s2 = '';
		a = s.split('-');
		f = a.length;
		for (i = 0; i<f; i++) {
			s2 += String.fromCharCode(parseInt(a[i]));
		}
		return s2;
	}
	
	var string1 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	var string2 = "`-=~!@#$%^&*()_+{}[];:'\"?/><,.\\|";
	var string3 = "http://github.com/chris/project123/blob/master/new_mailer/install-file.rb";
	var string4 = '';
	
	var encode1 = string2charCodeString(string1);
	var encode2 = string2charCodeString(string2);
	var encode3 = string2charCodeString(string3);		
	var encode4 = string2charCodeString(string4);	
	
	var decode1 = charCodeString2string(encode1);
	var decode2 = charCodeString2string(encode2);
	var decode3 = charCodeString2string(encode3);
	var decode4 = charCodeString2string(encode4);
	
	console.log(string1);
	console.log(encode1);
	console.log(decode1);
	
	console.log(string2);
	console.log(encode2);
	console.log(decode2);
	
	console.log(string3);
	console.log(encode3);
	console.log(decode3);
	
	console.log(string4);
	console.log(encode4);
	console.log(decode4);
	

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