adsApp.controller('categoriesListController', ['$scope', 'categoryFactory', 'filterPageSize', function($scope, categoryFactory, filterPageSize){
	$scope.categories = [];
    $scope.categoriesCount = 0;
    $scope.noCategories = false;
    $scope.categoriesPerPage = filterPageSize;
    $scope.currentFilter = { };

    getPageContent(1);

	$scope.pageChangeHandler = function(num, filter) {
        getPageContent(num, filter);
  	};

  	function getPageContent (pageNumber, filter) {
        $scope.categories = [];
        $scope.noCategories = false;
        //startSpin();
        
        categoryFactory.adminGetAllCategories(pageNumber, filter).$promise
            .then(function (data) {
                handleData(data);
            }, function (error) {
                handleError();
            });

        function handleData (data) {
                $scope.categories = data.categories;
                checkNumberOfAds(data.categories.length);
                $scope.categoriesCount = data.numItems;
                //stopSpin();
                $('html, body').animate({scrollTop : 0},100);
        }

        function handleError () {
            adsNoty(false, 'Connection to server lost. Please try again later');
        }

        function checkNumberOfAds (num) {
            if (num == 0) {
                $scope.noCategories = true;
            } else {
                $scope.noCategories = false;
            }
        }
  	}
}])