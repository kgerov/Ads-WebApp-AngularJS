adsApp.controller('categoriesListController', ['$scope', 'categoryFactory', 'filterPageSize', '$location', 
	function($scope, categoryFactory, filterPageSize, $location){
	
	$scope.filterCollection = [];
    $scope.filterCollectionCount = 0;
    $scope.nofilterCollection = false;
    $scope.filtersPerPage = filterPageSize;
    $scope.inCategoriesMenu = ($location.path().match(/\/admin\/categories\/list/g) != null ? true : false);
    $scope.currentFilter = { };
    $scope.filterIdActive = false;
    $scope.filterCatActive = false;
    $scope.filterIdAsc = false;
    $scope.filterCatAsc = false;

    getPageContent(1);

	$scope.pageChangeHandler = function(num, filter) {
        getPageContent(num, filter);
  	};

  	function getPageContent (pageNumber, filter) {
        $scope.filterCollection = [];
        $scope.nofilterCollection = false;
        $scope.startSpin();
        
        if ($scope.inCategoriesMenu) {
        	categoryFactory.adminGetAllCategories(pageNumber, filter).$promise
            .then(function (data) {
                handleData(data);
            }, function (error) {
                handleError();
            });
        } else {

        }

        function handleData (data) {
                $scope.filterCollection = data.categories;
                checkNumberOfFilters(data.categories.length);
                $scope.filterCollectionCount = data.numItems;
                $scope.stopSpin();
                $('html, body').animate({scrollTop : 0},100);
        }

        function handleError () {
            adsNoty(false, 'Connection to server lost. Please try again later');
        }

        function checkNumberOfFilters (num) {
            if (num == 0) {
                $scope.nofilterCollection = true;
            } else {
                $scope.nofilterCollection = false;
            }
        }
  	}

  	$scope.EditFilter = function (id) {
  		if ($scope.inCategoriesMenu) {
  			$location.path('/admin/categories/edit/' + id);
  		} else {
  			$location.path('/admin/towns/edit/' + id);
  		}
  	}

  	$scope.DeleteFilter = function (id) {
  		if ($scope.inCategoriesMenu) {
  			$location.path('/admin/categories/delete/' + id);
  		} else {
  			$location.path('/admin/towns/delete/' + id);
  		}
  	}

  	$scope.sortAscId = function () {
  		if ($scope.filterIdActive) {
  			$scope.sortDescId();
  		} else {
  			$scope.filterIdActive = true;
    		$scope.filterCatActive = false;
  		}

  		
  	}

  	$scope.sortDescId = function () {
  		
  	}

  	$scope.sortAscCategory = function () {
		$scope.filterIdActive = false;
    	$scope.filterCatActive = true;		
  	}

  	$scope.sortDescCategory = function () {
  		
  	}
}])