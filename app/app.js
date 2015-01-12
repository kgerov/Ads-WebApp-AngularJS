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
		.when('/admin/categories/edit/:name/:id',
		{
			controller: 'filtersArrangeListEditController', 
			templateUrl: 'app/partials/filtersArrange/filtersArrangeEdit.html'
		})
		.when('/admin/categories/delete/:name/:id',
		{
			controller: 'filtersArrangeListDeleteController', 
			templateUrl: 'app/partials/filtersArrange/filtersArrangeDelete.html'
		})
		.when('/admin/categories/create',
		{
			controller: 'filtersArrangeListEditController', 
			templateUrl: 'app/partials/filtersArrange/filtersArrangeEdit.html'
		})
		.when('/admin/towns/list',
		{
			controller: 'filtersArrangeListController', 
			templateUrl: 'app/partials/filtersArrange/filtersArrange.html'
		})
		.when('/admin/towns/edit/:name/:id',
		{
			controller: 'filtersArrangeListEditController', 
			templateUrl: 'app/partials/filtersArrange/filtersArrangeEdit.html'
		})
		.when('/admin/towns/delete/:name/:id',
		{
			controller: 'filtersArrangeListDeleteController', 
			templateUrl: 'app/partials/filtersArrange/filtersArrangeDelete.html'
		})
		.when('/admin/towns/create',
		{
			controller: 'filtersArrangeListEditController', 
			templateUrl: 'app/partials/filtersArrange/filtersArrangeEdit.html'
		})
		.when('/admin/users/list',
		{
			controller: 'usersListController', 
			templateUrl: 'app/partials/adminUserList/usersList.html'
		})
		.when('/admin/users/edit/:id',
		{
			controller: 'userProfileEditorController', 
			templateUrl: 'app/partials/user/userProfile.html'
		})
		.when('/admin/users/delete/:id',
		{
			controller: 'userProfileDeleteController', 
			templateUrl: 'app/partials/adminUserList/userProfileDelete.html'
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
adsApp.constant('userPageSize', 10);
adsApp.constant('baseUrl', 'http://softuni-ads.azurewebsites.net/api/');
//adsApp.constant('baseUrl', 'http://localhost:1337/api/');