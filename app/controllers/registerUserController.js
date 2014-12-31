adsApp.controller('registerUserController', ['$scope', 'townFactory', 'authService', '$location', '$http', function($scope, townFactory, authService, $location, $http ){
	$scope.touchUsername = false;
	$scope.touchPass = false;
	$scope.touchPassConfirm = false;
	$scope.touchPhone = false;
	$scope.touchEmail = false;
	$scope.touchName = false;
	$scope.touchTown = false;

	$scope.formSubmitted = false;
	$scope.towns = [];

	init();

	$scope.registerUser = function (user, valid) {
		$scope.formSubmitted = true;
		console.log(valid);
		if (valid) {
			var jsonUser = {
				'username': user.Username,
				'password': user.Pass,
				'confirmPassword': user.PassConfirm,
				'name': user.Name,
				'email': user.Email,
				'phone': user.Phone,
				'townId ': user.Town || null
			};
			console.log(jsonUser);

			authService.registerUser(jsonUser).$promise
				.then(function () {
					$location.path('/' + authService.getCurrUserName() + '/home');	
				}, function () {
					
				});
		}
	}

	function init () {
		townFactory.getAllTowns().$promise
			.then(function (data) {
				$scope.towns = data;
			}, function (error) {
				
			});
	}
}]);