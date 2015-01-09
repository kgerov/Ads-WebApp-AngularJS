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

		if (valid) {
			var jsonUser = {
				'username': user.Username,
				'password': user.Pass,
				'confirmPassword': user.PassConfirm,
				'name': user.Name,
				'email': user.Email,
				'phone': user.Phone,
				'townId': user.Town || null
			};

			authService.registerUser(jsonUser).$promise
				.then(function () {
					adsNoty(true, 'Acount created successfuly. Welcome.')
					$location.path('/' + authService.getCurrUserName() + '/home');	
				}, function (error) {
					var message = 'Invalid registration: ';
					for (item in error.data.modelState) {
					    message += error.data.modelState[item].join(', ');
					}
					adsNoty(false, message);
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