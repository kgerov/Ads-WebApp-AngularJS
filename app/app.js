var adsApp = angular.module('adsApp', ['ngRoute', 
	'ngResource',
	'ngStorage', 
	'ngTouch', 
	'angularUtils.directives.dirPagination']);

adsApp.config(function($routeProvider) {
	$routeProvider
		.when('/',
		{
			controller: 'adsListController',
			templateUrl: 'app/partials/listAllAds.html'
		})
		.when('/login',
		{
			controller: 'loginUserController',
			templateUrl: 'app/partials/login.html'
		})
		.when('/register',
		{
			controller: 'registerUserController',
			templateUrl: 'app/partials/register.html'
		})
		.otherwise({redirectTo: '/'});
});

adsApp.constant("pageSize", 3);

adsApp.filter('subtitles', function () {
	return function (bool) {
		if (bool) {
			return "Yes";
		} else {
			return "No";
		}
	}
});