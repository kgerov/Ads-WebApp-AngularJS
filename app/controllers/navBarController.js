adsApp.controller('navBarController', ['$scope', 'authService', function($scope, authService){
	$scope.logout = function () {
		console.log("logging out");
		authService.logoutUser();
	}

	$scope.$watch(authService.isLoggedIn, function (isLoggedIn) {
		$scope.user = authService.getCurrUserName();
	});
}]);