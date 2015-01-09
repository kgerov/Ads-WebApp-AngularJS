adsApp.controller('deleteAdController', ['$scope', 'adsFactory', '$routeParams', '$location',
	function($scope, adsFactory, $routeParams, $location) {

	$scope.ad = {};
	var id = $routeParams.id;

	init(id);

	$scope.deleteAd = function (id) {
		adsFactory.deleteAdById(id).$promise
			.then(function () {
				adsNoty(true, 'Ad deleted successfuly');
				$scope.returnToMyAds();
			}, function () {
				adsNoty(false, 'An error occured. Can\'t delete ad, please try later');
			});
	}

	$scope.returnToMyAds = function () {
		var username = $routeParams.user;
		$location.path('/' + username + '/ads');
	}

	function init (id) {
		adsFactory.getAdById(id).$promise
			.then(function (data) {
				$scope.ad = data;
			}, function (error) {
				adsNoty(false, 'Couln\'t recieve ad from server.');
			});
	}
}]);