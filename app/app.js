var adsApp = angular.module('adsApp', ['ngRoute', 
	'ngResource',
	'ngStorage', 
	'ngTouch', 
	'angularUtils.directives.dirPagination', 
	'validImgFilter', 
	'validation.match',
	'angularSpinner']);

adsApp.config(function($routeProvider) {
	$routeProvider
		.when('/',
		{
			controller: 'adsListController',
			templateUrl: 'app/partials/ads/listAds.html'
		})
		.when('/login',
		{
			controller: 'loginUserController',
			templateUrl: 'app/partials/user/login.html'
		})
		.when('/register',
		{
			controller: 'registerUserController',
			templateUrl: 'app/partials/user/register.html'
		})
		.when('/:user/home',
		{
			controller: 'adsListController',
			templateUrl: 'app/partials/ads/listAds.html'
		})
		.when('/:user/ads',
		{
			controller: 'adsListController',
			templateUrl: 'app/partials/ads/listAds.html'
		})
		.when('/:user/ads/delete/:id',
		{
			controller: 'deleteAdController',
			templateUrl: 'app/partials/ads/deleteAd.html'
		})
		.when('/:user/ads/edit/:id',
		{
			controller: 'AdCreateEditController', 
			templateUrl: 'app/partials/ads/adCreateEditMode.html'
		})
		.when('/:user/publish',
		{
			controller: 'AdCreateEditController',
			templateUrl: 'app/partials/ads/adCreateEditMode.html'
		})
		.when('/:user/profile',
		{
			controller: 'userProfileEditorController',
			templateUrl: 'app/partials/user/userProfile.html'
		})
		.when('/admin/home',
		{
			controller: 'adsListController',
			templateUrl: 'app/partials/ads/listAds.html'
		})
		.when('/admin/ads/edit/:id',
		{
			controller: 'AdCreateEditController', 
			templateUrl: 'app/partials/ads/adCreateEditMode.html'
		})
		.when('/admin/categories/list',
		{
			controller: 'filtersArrangeListController', 
			templateUrl: 'app/partials/filtersArrange/filtersArrange.html'
		})
		.when('/admin/categories/edit/:id',
		{
			controller: 'filtersArrangeListEditController', 
			templateUrl: 'app/partials/filtersArrange/filtersArrangeEdit.html'
		})
		.when('/admin/categories/delete/:id',
		{
			controller: 'filtersArrangeListDeleteController', 
			templateUrl: 'app/partials/filtersArrange/filtersArrangeDelete.html'
		})
		.otherwise({redirectTo: '/'});
});

adsApp.run(function($location, $rootScope, authService) {
    $rootScope.$on('$routeChangeStart', function(event, val) {
        var requestedPath = $location.path();

        if ((!authService.isLoggedIn()) && 
        	requestedPath !== '/login' &&
            requestedPath !== '/register' && 
            requestedPath !== '/') {
        	
            $location.path('/');
        }
    });
})

adsApp.constant("pageSize", 3);
adsApp.constant('filterPageSize', 6);
adsApp.constant('baseUrl', 'http://softuni-ads.azurewebsites.net/api/');