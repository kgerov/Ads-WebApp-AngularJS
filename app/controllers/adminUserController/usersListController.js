adsApp.controller('usersListController', ['$scope', 'userPageSize', '$location', 'userFactory', '$localStorage',
	function($scope, userPageSize, $location, userFactory, $localStorage) {
		$scope.users = [];
	    $scope.userCount = 0;
	    $scope.noUsers = false;
	    $scope.usersPerPage = userPageSize;
	    $scope.currentFilter = '';

	    $scope.filterUsernameActive = false;
	    $scope.filterNameActive = false;
	    $scope.filterEmailActive = false;
	    $scope.filterPhoneActive = false;

	    $scope.filterUsernameAsc = false;
	    $scope.filterNameAsc = false;
	    $scope.filterEmailAsc = false;
	    $scope.filterPhoneAsc = false;

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
	            $scope.userCount = data.numItems;
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

	  	//Edit + Delete
	  	$scope.EditFilter = function (id, user) {
	  		$localStorage.userToEdit = user;
	  		$location.path('/admin/users/edit/'+ id);
	  	}

	  	$scope.DeleteFilter = function (id, user) {
	  		$localStorage.userToDelete = user;
	  		$location.path('/admin/users/delete/'+ id);
	  	}


	  	//Filters

	  	//Deactivates all filters
	  	$scope.deactivateFilters = function () {
	  		$scope.filterUsernameActive = false;
		    $scope.filterNameActive = false;
		    $scope.filterEmailActive = false;
		    $scope.filterPhoneActive = false;
	  	}


	  	//Start Filters
	    $scope.startSortUsername = function () {
	    	$scope.deactivateFilters();
	        $scope.filterUsernameActive = true;
	        $scope.sortAscUsername();
	    }

	    $scope.startSortName = function () {
	    	$scope.deactivateFilters();
	        $scope.filterNameActive = true;
	        $scope.sortAscName();
	    }

	    $scope.startSortEmail = function () {
	    	$scope.deactivateFilters();
	        $scope.filterEmailActive = true;
	        $scope.sortAscEmail();
	    }

	    $scope.startSortPhone = function () {
	    	$scope.deactivateFilters();
	        $scope.filterPhoneActive = true;
	        $scope.sortAscPhone();
	    }


	    //Sorting
	  	$scope.sortAscUsername = function () {
	        $scope.filterUsernameAsc = true;
	        $scope.currentFilter = 'UserName';
	        $scope.pageChangeHandler(1);
	  	}

	  	$scope.sortDescUsername = function () {
	        $scope.filterUsernameAsc = false;
	        $scope.currentFilter = '-UserName';
	        $scope.pageChangeHandler(1);
	  	}

	  	$scope.sortAscName = function () {
	        $scope.filterNameAsc = true;	
	        $scope.currentFilter = 'Name';
	        $scope.pageChangeHandler(1);
	  	}

	  	$scope.sortDescName = function () {
	        $scope.filterNameAsc = false;
	        $scope.currentFilter = '-Name';
	        $scope.pageChangeHandler(1);
	  	}

	  	$scope.sortAscEmail = function () {
	        $scope.filterEmailAsc = true;
	        $scope.currentFilter = 'Email';
	        $scope.pageChangeHandler(1);
	  	}

	  	$scope.sortDescEmail = function () {
	        $scope.filterEmailAsc = false;
	        $scope.currentFilter = '-Email';
	        $scope.pageChangeHandler(1);
	  	}

	  	$scope.sortAscPhone = function () {
	        $scope.filterPhoneAsc = true;	
	        $scope.currentFilter = 'PhoneNumber';
	        $scope.pageChangeHandler(1);
	  	}

	  	$scope.sortDescPhone = function () {
	        $scope.filterPhoneAsc = false;
	        $scope.currentFilter = '-PhoneNumber';
	        $scope.pageChangeHandler(1);
	  	}
}])