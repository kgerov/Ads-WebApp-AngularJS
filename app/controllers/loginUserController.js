adsApp.controller('loginUserController', ['$scope', 'authService', '$http', '$location', function($scope, authService,$http, $location){
	$scope.loginUser = function (user) {
		console.log(user);
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
}]);