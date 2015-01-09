adsApp.controller('userAdsFilterController', ['$scope', '$rootScope', function($scope, $rootScope){
	$scope.filterMyAds = { adStatus: '' };
	
	$scope.filterChange = function () {
	        $rootScope.$broadcast('filterChanged', $scope.filterMyAds);
	}
}]);