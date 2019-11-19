(function( $ ) {
	'use strict';


	$('#podcaster_oauth_data_delete').live('click', function () {
		if (window.confirm('Daten wirklich löschen?')) {
			var data = {
				'action': 'podcaster_oauth_data_delete'
			};
			$.post(ajaxurl, data, function(response) {
				window.location.reload();
			});
		}
		return false;
	});

	$("#podcaster_oauth_connection_test").live('click', function() {
	    var data = {
            'action': 'podcaster_oauth_connection_test'
        };
        $.post(ajaxurl, data, function(response) {
            alert('Got this from the server: ' + response);
        });
    });

	$('#podcaster_oauth_connection_delete').live('click', function () {
		if (window.confirm('Verbindung wirklich trennen?')) {
			var data = {
				'action': 'podcaster_oauth_connection_delete'
			};
			$.post(ajaxurl, data, function(response) {
				window.location.reload();
			});
		}
		return false;
	});

	$('.externalLink').live('click', function(e) {

		window.open(e.currentTarget.href, '_blank');

		return false;
	});

})( jQuery );