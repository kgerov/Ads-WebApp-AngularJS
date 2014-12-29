adsApp.factory('authService', ['$resource', '$localStorage', function($resource, $localStorage){
	var resource = $resource(
		'http://softuni-ads.azurewebsites.net/api/user/login'
	);

	function createUser (user) {
		return resource.save(user, function (data) {
			$localStorage.isLoggedIn = true;
			$localStorage.currUser = data.username;
		});
	}

	function isLoggedIn () {
		return $localStorage.isLoggedIn;
	}

	function getCurrUserName () {
		return $localStorage.currUser;
	}

	function logoutUser () {
		$localStorage.$reset();
	}

	return {
		createUser: createUser,
		isLoggedIn: isLoggedIn,
		getCurrUserName: getCurrUserName,
		logoutUser: logoutUser
	};
}])