adsApp.controller('adsListController', ['$scope', 'adsFactory', 'pageSize', function($scope, adsFactory, pageSize) {
	$scope.ads = [];
    $scope.adsCount = 0;
    $scope.usersPerPage = pageSize;
    getPageContent(1);

    $scope.defailtImg = 'images/no_image.png';
	
  	$scope.pageChangeHandler = function(num) {
    	getPageContent(num);
  	};

  	function getPageContent (pageNumber) {
  		adsFactory.getAdsFromPage(pageNumber).$promise
			.then(function (data) {
				var sort = jQuery.extend({}, data.ads);
				sort[0].imageDataUrl = 'https://cdn0.iconfinder.com/data/icons/very-basic-android-l-lollipop-icon-pack/24/cancel-2-128.png';
				$scope.ads = sort;
				$scope.adsCount = data.numItems;
			}, function (error) {

			});
  	}
}]);

//https://cdn3.iconfinder.com/data/icons/free-3d-glossy-interface-icon-set/64/Erase.png