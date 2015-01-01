var adsNoty = function (isSuccess, text) {
	var nType = '';

	if (isSuccess) {
		nType = 'success';
	} else {
		nType = 'error';
	}

	var n = noty({
    	layout: 'bottom',
	    theme: 'custom',
	    type: nType,
	    text: text,
	    timeout: 3000
	});
}