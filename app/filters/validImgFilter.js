angular.module('validImgFilter', []).filter('validImg', function ($q) {
	return function (url) {
		if (url) {
			return url;
		} else {
			return 'images/noimg.png';
		}
	}
})
.filter('emptyText', function ($q) { 
	return function (text) {
		if (text) {
			return text;
		} else {
			return 'No Information';
		}
	}
});