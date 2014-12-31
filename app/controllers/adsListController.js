adsApp.controller('adsListController', ['$scope', 'adsFactory', 'pageSize', function($scope, adsFactory, pageSize) {
	$scope.filterAds = { categoryFilterRadio : 'all-cat', townFilterRadio : 'all-town' };

    $scope.ads = [];
    $scope.adsCount = 0;
    $scope.usersPerPage = pageSize;
    getPageContent(1);

    $scope.filterChange = function () {
        $scope.pageChangeHandler(1, $scope.filterAds);
        //$('#goToPageOne').triggerHandler('on-page-change');
    }

  	$scope.pageChangeHandler = function(num, filters) {
        var cat = filters.categoryFilterRadio,
            town = filters.townFilterRadio,
            catId = cat != 'all-cat' ? cat.substring(1, cat.length) : '',
            townId = town != 'all-town' ? town.substring(1, town.length) : '';
            
    	getPageContent(num, townId, catId);
  	};

  	function getPageContent (pageNumber, townId, catId) {
  		adsFactory.getAdsFromPage(pageNumber, townId, catId).$promise
			.then(function (data) {
				$scope.ads = data.ads;
				$scope.adsCount = data.numItems;
        $('html, body').animate({scrollTop : 0},100);
			}, function (error) {

			});
  	}
}]);

//https://cdn3.iconfinder.com/data/icons/free-3d-glossy-interface-icon-set/64/Erase.png
//a