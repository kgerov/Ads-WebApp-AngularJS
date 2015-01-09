adsApp.controller('filtersArrangeListController', ['$scope', 'categoryFactory', 'filterPageSize', '$location', 
	function($scope, categoryFactory, filterPageSize, $location){
	
	$scope.filterCollection = [];
    $scope.filterCollectionCount = 0;
    $scope.nofilterCollection = false;
    $scope.filtersPerPage = filterPageSize;
    $scope.inCategoriesMenu = ($location.path().match(/\/admin\/categories\/list/g) != null ? true : false);
    $scope.currentFilter = '';
    $scope.filterIdActive = false;
    $scope.filterCatActive = false;
    $scope.filterIdAsc = false;
    $scope.filterCatAsc = false;

    getPageContent(1);

	$scope.pageChangeHandler = function(num) {
        var filter = $scope.currentFilter;
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

  	$scope.EditFilter = function (id, name) {
  		if ($scope.inCategoriesMenu) {
  			$location.path('/admin/categories/edit/' + name + '/'+ id);
  		} else {
  			$location.path('/admin/towns/edit/' + name + '/'+ id);
  		}
  	}

  	$scope.DeleteFilter = function (id, name) {
  		if ($scope.inCategoriesMenu) {
  			$location.path('/admin/categories/delete/' + name + '/'+ id);
  		} else {
  			$location.path('/admin/towns/delete/' + name + '/'+ id);
  		}
  	}

    $scope.startSortId = function () {
      $scope.filterIdActive = true;
    $scope.filterCatActive = false;
    $scope.sortAscId();
    }

    $scope.startSortCat = function () {
      $scope.filterIdActive = false;
    $scope.filterCatActive = true;
    $scope.sortAscCategory();
    }

  	$scope.sortAscId = function () {
  		$scope.filterIdAsc = true;
            $scope.currentFilter = 'Id';
            $scope.pageChangeHandler(1);
  	}

  	$scope.sortDescId = function () {
  		$scope.filterIdAsc = false;
      $scope.currentFilter = '-Id';
      $scope.pageChangeHandler(1);
  	}

  	$scope.sortAscCategory = function () {
            $scope.filterCatAsc = true;	
            $scope.currentFilter = 'Name';
            $scope.pageChangeHandler(1);
  	}

  	$scope.sortDescCategory = function () {
            $scope.filterCatAsc = false;
            $scope.currentFilter = '-Name';
            $scope.pageChangeHandler(1);
  	}
}])