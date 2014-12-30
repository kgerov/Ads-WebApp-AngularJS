adsApp.controller('adsListController', ['$scope', 'adsFactory', 'pageSize', function($scope, adsFactory, pageSize) {
	$scope.ads = [];
    $scope.adsCount = 0;
    $scope.usersPerPage = pageSize;
    getPageContent(1);

  	$scope.pageChangeHandler = function(num) {
    	getPageContent(num);
  	};

  	function getPageContent (pageNumber) {
  		adsFactory.getAdsFromPage(pageNumber).$promise
			.then(function (data) {
				$scope.ads = data.ads;
				$scope.adsCount = data.numItems;
			}, function (error) {

			});
  	}
}]);

//https://cdn3.iconfinder.com/data/icons/free-3d-glossy-interface-icon-set/64/Erase.png