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

// var string1 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
// var string2 = "`-=~!@#$%^&*()_+{}[];:'\"?/><,.\\|";
// var string3 = "http://github.com/chris/project123/blob/master/new_mailer/install-file.rb";
// var string4 = '';
// 
// var encode1 = idEncode(string1);
// var encode2 = idEncode(string2);
// var encode3 = idEncode(string3);		
// var encode4 = idEncode(string4);	
// 
// var decode1 = idDecode(encode1);
// var decode2 = idDecode(encode2);
// var decode3 = idDecode(encode3);
// var decode4 = idDecode(encode4);
// 
// console.log(string1);
// console.log(encode1);
// console.log(decode1);
// 
// console.log(string2);
// console.log(encode2);
// console.log(decode2);
// 
// console.log(string3);
// console.log(encode3);
// console.log(decode3);
// 
// console.log(string4);
// console.log(encode4);
// console.log(decode4);


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

// var string1 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
// var string2 = "`-=~!@#$%^&*()_+{}[];:'\"?/><,.\\|";
// var string3 = "http://github.com/chris/project123/blob/master/new_mailer/install-file.rb";
// var string4 = '';
// 
// var encode1 = string2charCodeString(string1);
// var encode2 = string2charCodeString(string2);
// var encode3 = string2charCodeString(string3);		
// var encode4 = string2charCodeString(string4);	
// 
// var decode1 = charCodeString2string(encode1);
// var decode2 = charCodeString2string(encode2);
// var decode3 = charCodeString2string(encode3);
// var decode4 = charCodeString2string(encode4);
// 
// console.log(string1);
// console.log(encode1);
// console.log(decode1);
// 
// console.log(string2);
// console.log(encode2);
// console.log(decode2);
// 
// console.log(string3);
// console.log(encode3);
// console.log(decode3);
// 
// console.log(string4);
// console.log(encode4);
// console.log(decode4);


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
});