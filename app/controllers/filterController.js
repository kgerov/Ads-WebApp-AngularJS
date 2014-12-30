adsApp.controller('filterController', ['$scope', 'categoryFactory', 'townFactory', function($scope, categoryFactory, townFactory){
	$scope.categories = [];
	$scope.towns = [];

	init();

	function init () {
		categoryFactory.getAllCategories().$promise
			.then(function (data) {
				$scope.categories = data;
			}, function (error) {
				
			});

		townFactory.getAllTowns().$promise
			.then(function (data) {
				$scope.towns = data;
			}, function (error) {
				
			});
	}
}])