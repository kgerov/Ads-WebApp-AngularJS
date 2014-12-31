adsApp.controller('loginUserController', ['$scope', 'authService', '$http', '$location', function($scope, authService,$http, $location){
	$scope.fieldUsernameTouched = false;
	$scope.fieldPassTouched = false;
	$scope.formSubmitted = false;

	$scope.loginUser = function (user, valid) {
		$scope.formSubmitted = true;
		if (valid) {
			var jsonUser = {
				'username': user.Name,
				'password': user.Pass
			};

			authService.loginUser(jsonUser).$promise
				.then(function () {
					$location.path('/');	
				}, function () {
					
				});
		}
	}

}]);