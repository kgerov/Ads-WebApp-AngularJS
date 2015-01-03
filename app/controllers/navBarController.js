adsApp.controller('navBarController', ['$scope', 'authService', function($scope, authService){
	$scope.logout = function () {
		adsNoty(true, 'Successfuly logged out.');
		authService.logoutUser();
	}

	$scope.$watch(authService.isLoggedIn, function (isLoggedIn) {
		$scope.isLoggedIn = authService.isLoggedIn();
		$scope.username = authService.getCurrUserName();
		$scope.isAdmin = authService.isAdmin();
	});
}]);