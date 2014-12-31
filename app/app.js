var adsApp = angular.module('adsApp', ['ngRoute', 
	'ngResource',
	'ngStorage', 
	'ngTouch', 
	'angularUtils.directives.dirPagination', 
	'validImgFilter', 
	'validation.match']);

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
		.when('/:user/home',
		{
			controller: 'adsListController',
			templateUrl: 'app/partials/listAllAds.html'
		})
		.when('/:user/ads',
		{
			controller: 'userAdsController',
			templateUrl: 'app/partials/listUserAds.html'
		})
		.when('/:user/ads/publish',
		{
			controller: 'newAdController',
			templateUrl: 'app/partials/publishNewAd.html'
		})
		.otherwise({redirectTo: '/'});
});

adsApp.constant("pageSize", 3);