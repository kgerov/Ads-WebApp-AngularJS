adsApp.controller('filterController', ['$scope', 'categoryFactory', 'townFactory', '$rootScope', function($scope, categoryFactory, townFactory, $rootScope){
	$scope.filterAds = { categoryFilterRadio : 'all-cat', townFilterRadio : 'all-town' };
	
	$scope.categories = [];
	$scope.towns = [];

	init();

	$scope.filterChange = function () {
	        $rootScope.$broadcast('filterChanged', $scope.filterAds);
	}

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