adsApp.controller('deleteAdController', ['$scope', 'adsFactory', '$routeParams', '$location',
	function($scope, adsFactory, $routeParams, $location) {

	$scope.ad = {};
	var id = $routeParams.id;

	init(id);

	function init (id) {
		adsFactory.getAdById(id).$promise
			.then(function (data) {
				$scope.ad = data;
			}, function (error) {
				adsNoty(false, 'Couln\'t recieve ad from server.');
			});
	}
}]);