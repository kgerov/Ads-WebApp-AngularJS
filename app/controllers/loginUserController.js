adsApp.controller('loginUserController', ['$scope', 'authService', '$http', function($scope, authService,$http){
	$scope.loginUser = function (user) {
		console.log(user);
		var jsonUser = {
			'username': user.Name,
			'password': user.Pass
		};
		authService.loginUser(jsonUser);
		// authService.createUser(jsonUser).$promise
		// 	.then(function (data) {
		// 		console.log("success");
		// 		console.log(data);
		// 	}, function (error) {
		// 		console.log("error");
		// 		console.log(error);
		// 	});
	}

	
}]);