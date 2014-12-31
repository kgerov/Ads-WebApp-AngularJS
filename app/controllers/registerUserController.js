adsApp.controller('registerUserController', ['$scope', function($scope){
	$scope.touchUsername = false;
	$scope.touchPass = false;
	$scope.touchPassConfirm = false;
	$scope.touchPhone = false;
	$scope.touchEmail = false;
	$scope.touchName = false;
	$scope.touchTown = false;

	$scope.formSubmitted = false;

	$scope.registerUser = function (user, valid) {
		$scope.formSubmitted = true;
		if (valid) {
			console.log(user);
		}
	}
}]);