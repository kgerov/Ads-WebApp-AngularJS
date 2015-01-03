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
			controller: 'adsListController',
			templateUrl: 'app/partials/listAllAds.html'
		})
		.when('/:user/ads/delete/:id',
		{
			controller: 'deleteAdController',
			templateUrl: 'app/partials/deleteAd.html'
		})
		.when('/:user/ads/edit/:id',
		{
			controller: 'newAdController', 
			templateUrl: 'app/partials/publishNewAd.html'
		})
		.when('/:user/publish',
		{
			controller: 'newAdController',
			templateUrl: 'app/partials/publishNewAd.html'
		})
		.when('/:user/profile',
		{
			controller: 'userProfileEditorController',
			templateUrl: 'app/partials/userProfile.html'
		})
		.otherwise({redirectTo: '/'});
});

adsApp.constant("pageSize", 3);