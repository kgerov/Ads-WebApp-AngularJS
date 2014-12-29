var adsApp = angular.module('adsApp', ['ngRoute']);

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