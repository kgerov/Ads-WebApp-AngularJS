adsApp.controller('usersListController', ['$scope', 'userPageSize', '$location', 'userFactory',
	function($scope, userPageSize, $location, userFactory) {
		$scope.users = [];
	    $scope.usersCount = 0;
	    $scope.noUsers = false;
	    $scope.usersPerPage = userPageSize;
	    $scope.currentFilter = '';

	    $scope.filterUsernameActive = false;
	    $scope.filterCatActive = false;
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
	        $scope.users = [];
	        $scope.noUsers = false;
	        $scope.startSpin();
	        
	        userFactory.getAllUsers(pageNumber, filter).$promise
	        	.then(function (data) {
	        		handleData(data);
	        	}, function () {
	        		handleError();
	        	});

	        function handleData (data) {
	            $scope.users = data.users;
	            checkNumberOfFilters(data.users.length);
	            $scope.usersCount = data.numItems;
	            $scope.stopSpin();
	            $('html, body').animate({scrollTop : 0},100);
	        }

	        function handleError () {
	            adsNoty(false, 'Connection to server lost. Please try again later');
	        }

	        function checkNumberOfFilters (num) {
	            if (num == 0) {
	                $scope.noUsers = true;
	            } else {
	                $scope.noUsers = false;
	            }
	        }
	  	}

	  	$scope.EditFilter = function (id) {
	  		$location.path('/admin/users/edit/'+ id);
	  	}

	  	$scope.DeleteFilter = function (id) {
	  		$location.path('/admin/users/delete/'+ id);
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