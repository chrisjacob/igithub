var jQT = new $.jQTouch({
	preloadImages: [
		'jqtouch/themes/apple/img/backButton.png',
		'jqtouch/themes/apple/img/blueButton.png',
		'jqtouch/themes/apple/img/whiteButton.png',
		'jqtouch/themes/apple/img/loading.gif'
	]
});

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



	// GitHub API wrapper. http://develop.github.com/
	function GitHubAPI(){}

	GitHubAPI.Repos = function Repos(){}
	GitHubAPI.Repos.ShowUser = function ShowUser(){}
	GitHubAPI.Repos.ShowUserRepo = function ShowUserRepo(){}
	GitHubAPI.Repos.ShowUserRepo = function ShowUserRepoBranches(){}
	
	GitHubAPI.Commits = function Commits(){}
	GitHubAPI.Commits.ListUserRepoBranch = function ListUserRepoBranch(){}
	
	// http://develop.github.com/p/repo.html
	GitHubAPI.Repos.ShowUser = function(user, callback){
		requestURL = "http://github.com/api/v2/json/repos/show/" + user + "?callback=?";
		$.getJSON(requestURL, function(json, status){
			callback(json.repositories.reverse(), status);
		});
	}

	// http://develop.github.com/p/repo.html
	GitHubAPI.Repos.ShowUserRepo = function(user, repo, callback){
		requestURL = "http://github.com/api/v2/json/repos/show/" + user + "/" + repo + "?callback=?";
		$.getJSON(requestURL, function(json, status){
			callback(json.repository, status);
		});
	}
	
	// http://develop.github.com/p/repo.html
	GitHubAPI.Repos.ShowUserRepoBranches = function(user, repo, callback){
		requestURL = "http://github.com/api/v2/json/repos/show/" + user + "/" + repo + "/branches?callback=?";
		$.getJSON(requestURL, function(json, status){
			callback(json, status);
		});
	}
	
	http://develop.github.com/p/commits.html
	GitHubAPI.Commits.ListUserRepoBranch = function(user, repo, branch, callback){
		requestURL = "http://github.com/api/v2/json/commits/list/" + user + "/" + repo + "/" + branch + "?callback=?";
		$.getJSON(requestURL, function(json, status){
			callback(json.commits, status);
		});
	}


	// TESTING
	GitHubAPI.Repos.ShowUser("chrisjacob", function(json, status){
		$.each(json, function(i){
			console.log(this);
		});
	});
	
	GitHubAPI.Repos.ShowUserRepo("chrisjacob", "igithub", function(json, status){
		console.log(json);
	});
	
	GitHubAPI.Repos.ShowUserRepoBranches("chrisjacob", "igithub", function(json, status){
		$.each(json, function(i){
			console.log(this);
		});
	});
	
	GitHubAPI.Commits.ListUserRepoBranch("chrisjacob", "igithub", "master", function(json, status){
		$.each(json, function(i){
			console.log(this);
		});
	});
    
});