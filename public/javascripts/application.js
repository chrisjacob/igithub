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


function get_html_translation_table (table, quote_style) {
    // http://kevin.vanzonneveld.net
    // +   original by: Philip Peterson
    // +    revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: noname
    // +   bugfixed by: Alex
    // +   bugfixed by: Marco
    // +   bugfixed by: madipta
    // +   improved by: KELAN
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // +      input by: Frank Forte
    // +   bugfixed by: T.Wild
    // +      input by: Ratheous
    // %          note: It has been decided that we're not going to add global
    // %          note: dependencies to php.js, meaning the constants are not
    // %          note: real constants, but strings instead. Integers are also supported if someone
    // %          note: chooses to create the constants themselves.
    // *     example 1: get_html_translation_table('HTML_SPECIALCHARS');
    // *     returns 1: {'"': '&quot;', '&': '&amp;', '<': '&lt;', '>': '&gt;'}
    
    var entities = {}, hash_map = {}, decimal = 0, symbol = '';
    var constMappingTable = {}, constMappingQuoteStyle = {};
    var useTable = {}, useQuoteStyle = {};
    
    // Translate arguments
    constMappingTable[0]      = 'HTML_SPECIALCHARS';
    constMappingTable[1]      = 'HTML_ENTITIES';
    constMappingQuoteStyle[0] = 'ENT_NOQUOTES';
    constMappingQuoteStyle[2] = 'ENT_COMPAT';
    constMappingQuoteStyle[3] = 'ENT_QUOTES';

    useTable       = !isNaN(table) ? constMappingTable[table] : table ? table.toUpperCase() : 'HTML_SPECIALCHARS';
    useQuoteStyle = !isNaN(quote_style) ? constMappingQuoteStyle[quote_style] : quote_style ? quote_style.toUpperCase() : 'ENT_COMPAT';

    if (useTable !== 'HTML_SPECIALCHARS' && useTable !== 'HTML_ENTITIES') {
        throw new Error("Table: "+useTable+' not supported');
        // return false;
    }

    entities['38'] = '&amp;';
    if (useTable === 'HTML_ENTITIES') {
        entities['160'] = '&nbsp;';
        entities['161'] = '&iexcl;';
        entities['162'] = '&cent;';
        entities['163'] = '&pound;';
        entities['164'] = '&curren;';
        entities['165'] = '&yen;';
        entities['166'] = '&brvbar;';
        entities['167'] = '&sect;';
        entities['168'] = '&uml;';
        entities['169'] = '&copy;';
        entities['170'] = '&ordf;';
        entities['171'] = '&laquo;';
        entities['172'] = '&not;';
        entities['173'] = '&shy;';
        entities['174'] = '&reg;';
        entities['175'] = '&macr;';
        entities['176'] = '&deg;';
        entities['177'] = '&plusmn;';
        entities['178'] = '&sup2;';
        entities['179'] = '&sup3;';
        entities['180'] = '&acute;';
        entities['181'] = '&micro;';
        entities['182'] = '&para;';
        entities['183'] = '&middot;';
        entities['184'] = '&cedil;';
        entities['185'] = '&sup1;';
        entities['186'] = '&ordm;';
        entities['187'] = '&raquo;';
        entities['188'] = '&frac14;';
        entities['189'] = '&frac12;';
        entities['190'] = '&frac34;';
        entities['191'] = '&iquest;';
        entities['192'] = '&Agrave;';
        entities['193'] = '&Aacute;';
        entities['194'] = '&Acirc;';
        entities['195'] = '&Atilde;';
        entities['196'] = '&Auml;';
        entities['197'] = '&Aring;';
        entities['198'] = '&AElig;';
        entities['199'] = '&Ccedil;';
        entities['200'] = '&Egrave;';
        entities['201'] = '&Eacute;';
        entities['202'] = '&Ecirc;';
        entities['203'] = '&Euml;';
        entities['204'] = '&Igrave;';
        entities['205'] = '&Iacute;';
        entities['206'] = '&Icirc;';
        entities['207'] = '&Iuml;';
        entities['208'] = '&ETH;';
        entities['209'] = '&Ntilde;';
        entities['210'] = '&Ograve;';
        entities['211'] = '&Oacute;';
        entities['212'] = '&Ocirc;';
        entities['213'] = '&Otilde;';
        entities['214'] = '&Ouml;';
        entities['215'] = '&times;';
        entities['216'] = '&Oslash;';
        entities['217'] = '&Ugrave;';
        entities['218'] = '&Uacute;';
        entities['219'] = '&Ucirc;';
        entities['220'] = '&Uuml;';
        entities['221'] = '&Yacute;';
        entities['222'] = '&THORN;';
        entities['223'] = '&szlig;';
        entities['224'] = '&agrave;';
        entities['225'] = '&aacute;';
        entities['226'] = '&acirc;';
        entities['227'] = '&atilde;';
        entities['228'] = '&auml;';
        entities['229'] = '&aring;';
        entities['230'] = '&aelig;';
        entities['231'] = '&ccedil;';
        entities['232'] = '&egrave;';
        entities['233'] = '&eacute;';
        entities['234'] = '&ecirc;';
        entities['235'] = '&euml;';
        entities['236'] = '&igrave;';
        entities['237'] = '&iacute;';
        entities['238'] = '&icirc;';
        entities['239'] = '&iuml;';
        entities['240'] = '&eth;';
        entities['241'] = '&ntilde;';
        entities['242'] = '&ograve;';
        entities['243'] = '&oacute;';
        entities['244'] = '&ocirc;';
        entities['245'] = '&otilde;';
        entities['246'] = '&ouml;';
        entities['247'] = '&divide;';
        entities['248'] = '&oslash;';
        entities['249'] = '&ugrave;';
        entities['250'] = '&uacute;';
        entities['251'] = '&ucirc;';
        entities['252'] = '&uuml;';
        entities['253'] = '&yacute;';
        entities['254'] = '&thorn;';
        entities['255'] = '&yuml;';
    }

    if (useQuoteStyle !== 'ENT_NOQUOTES') {
        entities['34'] = '&quot;';
    }
    if (useQuoteStyle === 'ENT_QUOTES') {
        entities['39'] = '&#39;';
    }
    entities['60'] = '&lt;';
    entities['62'] = '&gt;';


    // ascii decimals to real symbols
    for (decimal in entities) {
        symbol = String.fromCharCode(decimal);
        hash_map[symbol] = entities[decimal];
    }
    
    return hash_map;
}

function htmlentities (string, quote_style) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +    revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: nobbler
    // +    tweaked by: Jack
    // +   bugfixed by: Onno Marsman
    // +    revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +    bugfixed by: Brett Zamir (http://brett-zamir.me)
    // +      input by: Ratheous
    // -    depends on: get_html_translation_table
    // *     example 1: htmlentities('Kevin & van Zonneveld');
    // *     returns 1: 'Kevin &amp; van Zonneveld'
    // *     example 2: htmlentities("foo'bar","ENT_QUOTES");
    // *     returns 2: 'foo&#039;bar'

    var hash_map = {}, symbol = '', tmp_str = '', entity = '';
    tmp_str = string.toString();
    
    if (false === (hash_map = this.get_html_translation_table('HTML_ENTITIES', quote_style))) {
        return false;
    }
    hash_map["'"] = '&#039;';
    for (symbol in hash_map) {
        entity = hash_map[symbol];
        tmp_str = tmp_str.split(symbol).join(entity);
    }
    
    return tmp_str;
}




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
	function GitHub(){}

	// http://develop.github.com/p/repo.html
	GitHub.RepositoryAPI = function RepositoryAPI(){}
	GitHub.RepositoryAPI.ShowUser = function ShowUser(){}
	GitHub.RepositoryAPI.ShowUserRepo = function ShowUserRepo(){}
	GitHub.RepositoryAPI.ShowUserRepoBranches = function ShowUserRepoBranches(){}
	
	GitHub.RepositoryAPI.ShowUser = function(user, callback){
		requestURL = "http://github.com/api/v2/json/repos/show/" + user + "?callback=?";
		$.getJSON(requestURL, function(json, status){
			callback(json.repositories.reverse(), status);
		});
	}

	GitHub.RepositoryAPI.ShowUserRepo = function(user, repo, callback){
		requestURL = "http://github.com/api/v2/json/repos/show/" + user + "/" + repo + "?callback=?";
		$.getJSON(requestURL, function(json, status){
			callback(json, status);
		});
	}
	
	GitHub.RepositoryAPI.ShowUserRepoBranches = function(user, repo, callback){
		requestURL = "http://github.com/api/v2/json/repos/show/" + user + "/" + repo + "/branches?callback=?";
		$.getJSON(requestURL, function(json, status){
			callback(json, status);
		});
	}
	
	// http://develop.github.com/p/commits.html
	GitHub.CommitsAPI = function CommitsAPI(){}
	GitHub.CommitsAPI.ListUserRepoBranch = function ListUserRepoBranch(){}
	GitHub.CommitsAPI.ShowUserRepoSha = function ShowUserRepoSha(){}
	
	GitHub.CommitsAPI.ListUserRepoBranch = function(user, repo, branch, callback){
		requestURL = "http://github.com/api/v2/json/commits/list/" + user + "/" + repo + "/" + branch + "?callback=?";
		$.getJSON(requestURL, function(json, status){
			callback(json.commits, status);
		});
	}
	
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
	
	GitHub.ObjectAPI.TreeShowUserRepoSha = function(user, repo, sha, callback){
		requestURL = "http://github.com/api/v2/json/tree/show/" + user + "/" + repo + "/" + sha + "?callback=?";
		$.getJSON(requestURL, function(json, status){
			callback(json.tree, status);
		});
	}
	
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
		var user = "chrisjacob";
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
				repo = 'chrisjacob.github.com';
			
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

													$('#code').append('<p>'+ object_name +'</p><br /><pre>'+ htmlentities(this.data, "ENT_QUOTES") +'</pre>');
													// $('#code').append('<p>'+ object_name +'</p><pre></pre>');
													// $('#code > pre:last').text(this.data); // .text() calls the DOM method .createTextNode(), which replaces special characters with their HTML entity equivalents (such as &lt;  for <).
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