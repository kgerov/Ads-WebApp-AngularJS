angular.module('validImgFilter', []).filter('validImg', function ($q) {
	return function (url) {
		if (url) {
			return url;
		} else {
			return 'https://cdn0.iconfinder.com/data/icons/very-basic-android-l-lollipop-icon-pack/24/cancel-2-128.png';
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