var jQT = new $.jQTouch({
	icon: 'images/igithub.png',
	addGlossToIcon: false,
	startupScreen: 'images/jqt_startup.png',
	preloadImages: [
		'jqtouch/themes/apple/img/actionButton.png',
		'jqtouch/themes/apple/img/backButton.png',
		'jqtouch/themes/apple/img/chevron.png',
		'jqtouch/themes/apple/img/loading.gif',
		'jqtouch/themes/apple/img/pinstripes.png',
		'jqtouch/themes/apple/img/selection.png',
		'jqtouch/themes/apple/img/toolbar.png',
		'jqtouch/themes/apple/img/toolButton.png'
	]
});

$(function(){
	$('#formHomeSearch').submit(function(e){
		e.preventDefault();
		alert('Sorry, search is not yet available.');
		return false;
	});
	
	$('#formHomeSearchSubmit').tap(function(e){
		e.preventDefault();
		alert('Sorry, search is not yet available.');
		return false;
	});
	
	$('.try').tap(function(e){
		e.preventDefault();
		alert('Sorry, try examples not yet available.');
	});
	
	$('#formHomeBrowse').submit(function(e){
		loadUser(e);
		return false;
	});

	$('#formHomeBrowseSubmit').tap(function(e){
		loadUser(e);
		return false;
	});
		
	function loadUser(e){	
		e.preventDefault();
		user = $('#formHomeBrowsePath').val();
		if(user == '')
		{
			alert('Please enter a GitHub username.');
			return false;
		}
		
		pageIdUser = idEncode(user);
		
		dict_user = GitHub.DataCache[user] = {};
		dict_user['name'] = user;
		dict_user['idEncode'] = pageIdUser;
		dict_user['repos'] = {};

		if($('#' + pageIdUser).length < 1)
		{
			userClone = $('#templateUser').clone(true);
			userClone.appendTo('#jqt').attr('id',pageIdUser)
			userClone.find('h1').text(user);
			
			jQT.goTo('#' + pageIdUser, 'slide', $(this).hasClass('reverse'));
			
			GitHub.RepositoryAPI.ShowUser(user, function(json, status){
				userClone.find('.loadingPage').remove();
				userCloneList = $('<ul class="rounded"></ul>');
				userClone.append(userCloneList);
				
				dict_repos = {};
				
				$.each(json, function(i){
					repo = this.name;
					pageIdRepo = idEncode( user + '/' + repo );
					
					dict_repos_repo = dict_repos[repo] = {};
					dict_repos_repo['name'] = repo;
					dict_repos_repo['idEncode'] = pageIdRepo;
					dict_repos_repo['branches'] = {};
					
					userCloneListItem = $('<li class="arrow"><a href="#'+pageIdRepo+'">'+repo+'</a></li>');
					userCloneList.append(userCloneListItem);
				});
				
				dict_user['repos'] = dict_repos;
				
				userClone.find('ul li a').each(function(i){
					
					$(this).bind('click', function(e){
						anchorHref = $(this).attr('href');
						anchorText = $(this).text();

						if($(anchorHref).length < 1)
						{
							repoClone = $('#templateRepo').clone(true);
							repoClone.appendTo('#jqt').attr('id', anchorHref.slice(1));
							repoClone.find('h1').text(anchorText);
							
							jQT.goTo(anchorHref, 'slide', $(this).hasClass('reverse'));
							
							pathArray = idDecode(anchorHref.slice(1)).split('/');
							user = pathArray[0];
							repo = pathArray[1];
							
							GitHub.RepositoryAPI.ShowUserRepoBranches(user, repo, function(json, status){
								repoClone.find('.loadingPage').remove();
								repoCloneList = $('<ul class="rounded"></ul>');
								repoClone.append(repoCloneList);
								
								dict_branches = {};
								
								$.each(json, function(i){
									branches = this;
									branchNames = $.keys(this);

									$(branchNames).each(function(i){
										branchName = String(this);
										sha = branches[this];
										
										pageIdBranch = idEncode( user + '/' + repo + '/' + branchName );
										
										dict_branches_branch = dict_branches[branchName] = {};
										dict_branches_branch['name'] = branchName;
										dict_branches_branch['idEncode'] = pageIdBranch;
										dict_branches_branch['sha'] = sha;
										dict_branches_branch['trees'] = {};
										dict_branches_branch['blobs'] = {};
										
										repoCloneListItem = $('<li class="arrow"><a href="#'+pageIdBranch+'">'+branchName+'</a></li>');
										repoCloneList.append(repoCloneListItem);
									});
								});
									
								GitHub.DataCache[user]['repos'][repo]['branches'] = dict_branches;

								repoClone.find('ul li a').each(function(i){
			
									$(this).bind('click', function(e){
										anchorHref = $(this).attr('href');
										anchorText = $(this).text();

										if($(anchorHref).length < 1)
										{
											treeClone = $('#templateTree').clone(true);
											treeClone.appendTo('#jqt').attr('id', anchorHref.slice(1));
											treeClone.find('h1').text(anchorText);
					
											jQT.goTo(anchorHref, 'slide', $(this).hasClass('reverse'));
					
											pathString = idDecode(anchorHref.slice(1));
											pathArray = pathString.split('/');
											user = pathArray[0];
											repo = pathArray[1];
											branchName = pathArray[2];
											
											branchSha = GitHub.DataCache[user]['repos'][repo]['branches'][branchName]['sha'];

											GitHub.ObjectAPI.TreeShowUserRepoSha(user, repo, branchSha, function(json, status){
												treeClone.find('.loadingPage').remove();
												treeCloneListTrees = $('<ul class="rounded trees"></ul>');
												treeCloneListBlobs = $('<ul class="rounded blobs"></ul>');
												treeCloneListTreesAdded = false;
												treeCloneListBlobsAdded = false;

												dict_objects = {};
												dict_objects['trees'] = {};
												dict_objects['blobs'] = {};

												$.each(json, function(i){
													objectName = this.name;
													objectType = this.type;
													pageIdObject = idEncode( pathString + '/' + objectName );
													
													if(objectType == 'tree')
													{
														dict_objects_object = dict_objects['trees'][objectName] = {}
														dict_objects_object['name'] = objectName;
														dict_objects_object['idEncode'] = pageIdObject;
														dict_objects_object['sha'] = this.sha;
														
														dict_objects_object['trees'] = {};
														dict_objects_object['blobs'] = {};
														
														treeCloneListItem = $('<li class="arrow"><a href="#'+pageIdObject+'" class="'+objectType+'">'+objectName+'</a></li>');
														treeCloneListTrees.append(treeCloneListItem);
														treeCloneListTreesAdded = true;
													}
													else if(objectType == 'blob')
													{
														dict_objects_object = dict_objects['blobs'][objectName] = {}
														dict_objects_object['name'] = objectName;
														dict_objects_object['idEncode'] = pageIdObject;
														dict_objects_object['sha'] = this.sha;
														
														dict_objects_object['size'] = this.size;
														dict_objects_object['mime_type'] = this.mime_type;
														
														treeCloneListItem = $('<li class="arrow"><a href="#'+pageIdObject+'" class="'+objectType+'">'+objectName+'</a></li>');
														treeCloneListBlobs.append(treeCloneListItem);
														treeCloneListBlobsAdded = true;
													}
												});
												
												if( treeCloneListTreesAdded )
												{
													treeClone.append(treeCloneListTrees);
												}

												if( treeCloneListBlobsAdded )
												{
													treeClone.append(treeCloneListBlobs);
												}
												
												GitHub.DataCache[user]['repos'][repo]['branches'][branchName]['trees'] = dict_objects['trees'];
												GitHub.DataCache[user]['repos'][repo]['branches'][branchName]['blobs'] = dict_objects['blobs'];
												
												treeClone.find('ul li a').each(function(i){
													$(this).bind('click', function(e){
														anchorHref = $(this).attr('href');
														anchorText = $(this).text();

														if($(anchorHref).length < 1)
														{
															if($(this).hasClass('tree'))
															{
																loadTree( anchorHref, anchorText );
															}
															else
															{
																loadBlob( anchorHref, anchorText );
															}
														}
														jQT.goTo(anchorHref, 'slide', $(this).hasClass('reverse'));
													});
												});
											});
										}
										jQT.goTo(anchorHref, 'slide', $(this).hasClass('reverse'));
									});
								});
							});
						}
						jQT.goTo(anchorHref, 'slide', $(this).hasClass('reverse'));
					});
				});
			});
		}
		jQT.goTo('#' + pageIdUser, 'slide', $(this).hasClass('reverse'));
	};
	
	function loadTree( anchorHref, anchorText )
	{
		treeClone = $('#templateTree').clone(true);
		treeClone.appendTo('#jqt').attr('id', anchorHref.slice(1));
		treeClone.find('h1').text(anchorText);

		jQT.goTo(anchorHref, 'slide', $(this).hasClass('reverse'));

		pathString = idDecode(anchorHref.slice(1));
		pathArray = pathString.split('/');
		user = pathArray[0];
		repo = pathArray[1];
		branchName = pathArray[2];
		treePath = pathArray.slice(3);

		branch = GitHub.DataCache[user]['repos'][repo]['branches'][branchName];
		branchSha = branch['sha'];

		treeObject = GitHub.DataCache[user]['repos'][repo]['branches'][branchName];

		$.each(treePath, function( i, name ){
			treeObject = treeObject['trees'][name];
		});

		treeSha = treeObject['sha'];
		treeName = treeObject['name'];

		GitHub.ObjectAPI.TreeShowUserRepoSha(user, repo, treeSha, function(json, status){
			treeClone.find('.loadingPage').remove();
			treeCloneListTrees = $('<ul class="rounded trees"></ul>');
			treeCloneListBlobs = $('<ul class="rounded blobs"></ul>');
			treeCloneListTreesAdded = false;
			treeCloneListBlobsAdded = false;

			dict_objects = {};
			dict_objects['trees'] = {};
			dict_objects['blobs'] = {};

			$.each(json, function(i){
				objectName = this.name;
				objectType = this.type;
				pageIdObject = idEncode( pathString + '/' + objectName );

				if(objectType == 'tree')
				{
					dict_objects_object = dict_objects['trees'][objectName] = {};
					dict_objects_object['name'] = objectName;
					dict_objects_object['idEncode'] = pageIdObject;
					dict_objects_object['sha'] = this.sha;
					
					dict_objects_object['trees'] = {};
					dict_objects_object['blobs'] = {};
					
					treeCloneListItem = $('<li class="arrow"><a href="#'+pageIdObject+'" class="'+objectType+'">'+objectName+'</a></li>');
					treeCloneListTrees.append(treeCloneListItem);
					treeCloneListTreesAdded = true;
				}
				else if(objectType == 'blob')
				{
					dict_objects_object = dict_objects['blobs'][objectName] = {};
					dict_objects_object['name'] = objectName;
					dict_objects_object['idEncode'] = pageIdObject;
					dict_objects_object['sha'] = this.sha;
					
					dict_objects_object['size'] = this.size;
					dict_objects_object['mime_type'] = this.mime_type;
					
					treeCloneListItem = $('<li class="arrow"><a href="#'+pageIdObject+'" class="'+objectType+'">'+objectName+'</a></li>');
					treeCloneListBlobs.append(treeCloneListItem);
					treeCloneListBlobsAdded = true;
				}
			});
			
			if( treeCloneListTreesAdded )
			{
				treeClone.append(treeCloneListTrees);
			}
			
			if( treeCloneListBlobsAdded )
			{
				treeClone.append(treeCloneListBlobs);
			}

			treeObject['trees'] = dict_objects['trees'];
			treeObject['blobs'] = dict_objects['blobs'];

			treeClone.find('ul li a').each(function(i){
				$(this).bind('click', function(e){
					anchorHref = $(this).attr('href');
					anchorText = $(this).text();

					if($(anchorHref).length < 1)
					{
						if($(this).hasClass('tree'))
						{
							loadTree( anchorHref, anchorText );
						}
						else
						{
							loadBlob( anchorHref, anchorText );
						}
					}
					jQT.goTo(anchorHref, 'slide', $(this).hasClass('reverse'));
				});
			});
		});
	}
	
	
	function loadBlob( anchorHref, anchorText )
	{
		blobClone = $('#templateBlob').clone(true);
		blobClone.appendTo('#jqt').attr('id', anchorHref.slice(1));
		blobClone.find('h1').text(anchorText);

		jQT.goTo(anchorHref, 'slide', $(this).hasClass('reverse'));

		pathString = idDecode(anchorHref.slice(1));
		pathArray = pathString.split('/');
		user = pathArray[0];
		repo = pathArray[1];
		branchName = pathArray[2];
		blobPath = pathArray.slice(3);
		blobPathLength = blobPath.length;
		blobPathString = blobPath.join('/');
		
		branch = GitHub.DataCache[user]['repos'][repo]['branches'][branchName];
		branchSha = branch['sha'];

		blobObject = GitHub.DataCache[user]['repos'][repo]['branches'][branchName];

		$.each(blobPath, function( i, name ){
			if( i != blobPathLength - 1)
			{
				blobObject = blobObject['trees'][name];
			}
			else
			{
				blobObject = blobObject['blobs'][name];
			}
		});

		blobSha = blobObject['sha'];
		blobName = blobObject['name'];
		blobMimeType = blobObject['mime_type'];

		GitHub.ObjectAPI.BlobShowUserRepoShaPath(user, repo, branchSha, blobPathString, function(json, status){
			blobClone.find('.loadingPage').remove();
			blobCloneContentWrapper = $('<div class="code"></div>');

			blobData = json.blob.data;
			
			// Not sure if we need to store the blob data in the GitHub.DataCache ... would bloat the array.
			// blobObject['data'] = blobData;

			var mime_match = /text\//i
			if(!mime_match.test(blobMimeType))
			{
				// we don't yet support non-text files such as binary files
			}
			else
			{
				// // plain text
				// blobCloneContent = $('<pre class="plain"></pre>');
				// blobCloneContent.text(blobData);
				// // .text() calls the DOM method .createTextNode(), which replaces special characters with their HTML entity equivalents (such as &lt; for <).

				// styled text
				blobCloneContent = $('<pre class="prettyprint"></pre>');
				blobCloneContent.text(blobData).html(prettyPrintOne(blobCloneContent.html()));
				// .prettyPrintOne() allows you to pass in a string to be prettified. 
			}
			
			blobCloneContentWrapper.append(blobCloneContent);
			blobClone.append(blobCloneContentWrapper);
		});
	}
	
	// $('#templateUser').bind('pageAnimationEnd', function(e, info){
	// 	if (!$(this).data('loaded')) {
	// 		// console.log('load it!');
	// 		$(this).append($('<div class="loadingPage">Loading</div>'));
	// 		$(this).data('loaded', true);  
	// 	}
	// 	else
	// 	{
	// 		// console.log('already loaded');
	// 	}
	// });
	// 
	// $('#templateRepo').bind('pageAnimationEnd', function(e, info){
	// 	if (!$(this).data('loaded')) {
	// 		// console.log('load it!');
	// 		$(this).append($('<div class="loadingPage">Loading</div>'));
	// 		$(this).data('loaded', true);  
	// 	}
	// 	else
	// 	{
	// 		// console.log('already loaded');
	// 	}
	// });
	
	
	$('a[target="_blank"]').click(function() {
		if (confirm('This link opens in a new window.')) {
			return true;
		} else {
			return false;
		}
	});
	
	// Page animation callback events
	$('#pageevents').
		bind('pageAnimationStart', function(e, info){ 
			$(this).find('.info').append('Started animating ' + info.direction + '&hellip; ');
		}).
		bind('pageAnimationEnd', function(e, info){
			$(this).find('.info').append(' finished animating ' + info.direction + '.<br /><br />');
		});
	
	// Page animations end with AJAX callback event, example 1 (load remote HTML only first time)
	$('#callback').bind('pageAnimationEnd', function(e, info){
		// Make sure the data hasn't already been loaded (we'll set 'loaded' to true a couple lines further down)
		if (!$(this).data('loaded')) {
			// Append a placeholder in case the remote HTML takes its sweet time making it back
			// Then, overwrite the "Loading" placeholder text with the remote HTML
			$(this).append($('<div>Loading</div>').load('ajax.html .info', function() {        
				// Set the 'loaded' var to true so we know not to reload
				// the HTML next time the #callback div animation ends
				$(this).parent().data('loaded', true);  
			}));
		}
	});


	// API TESTING
	var runtests = false;
	var fullstack = true;
	
	if(runtests)
	{
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
	}
	
});