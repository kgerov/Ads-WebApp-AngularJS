adsApp.controller('navBarController', ['$scope', 'authService', '$location', function($scope, authService, $location){
	$scope.logout = function () {
		adsNoty(true, 'Successfuly logged out.');
		authService.logoutUser();
	}

	$scope.$watch(authService.isLoggedIn, function (isLoggedIn) {
		$scope.isLoggedIn = authService.isLoggedIn();
		$scope.username = authService.getCurrUserName();
		$scope.isAdmin = authService.isAdmin();
	});

	$scope.getClass = function (path) {
		if (path == '/' && $location.path() != '/') {
			return false;
		}

		if ($location.path().indexOf(path) != -1) {
			return true;
		} else {
			return false;
		}
	}
}]);