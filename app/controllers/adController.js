adsApp.controller('adController', ['$scope', 'adsFactory', 'pageSize', '$rootScope', function($scope, adsFactory, pageSize, $rootScope){
    $scope.ads = [];
    $scope.adsCount = 0;
    $scope.usersPerPage = pageSize;
    $scope.currentFilters = { categoryFilterRadio : 'all-cat', townFilterRadio : 'all-town', adStatus: '' };
    getPageContent(1);

    $rootScope.$on('filterChanged', function (event, filters) {
        console.log(filters);
    	//$scope.currentFilters = filters;
    	//$scope.pageChangeHandler(1, filters);
    });

  	$scope.pageChangeHandler = function(num, filters) {
        var cat = filters.categoryFilterRadio,
            town = filters.townFilterRadio,
            catId = cat != 'all-cat' ? cat.substring(1, cat.length) : '',
            townId = town != 'all-town' ? town.substring(1, town.length) : '';
            
    	getPageContent(num, townId, catId);
  	};

  	function getPageContent (pageNumber, townId, catId) {
        if ($scope.inUserAds) {
            adsFactory.getUserAds(pageNumber).$promise
                .then(function (data) {
                    $scope.ads = data.ads;
                    $scope.adsCount = data.numItems;
                    $('html, body').animate({scrollTop : 0},100);
                }, function (error) {
                    adsNoty(false, 'Connection to server lost. Please try again later');
                });
        } else {
            adsFactory.getAdsFromPage(pageNumber, townId, catId).$promise
            .then(function (data) {
                $scope.ads = data.ads;
                $scope.adsCount = data.numItems;
                $('html, body').animate({scrollTop : 0},100);
            }, function (error) {
                adsNoty(false, 'Connection to server lost. Please try again later');
            });
        }
  	}
}])