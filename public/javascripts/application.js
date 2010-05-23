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
});