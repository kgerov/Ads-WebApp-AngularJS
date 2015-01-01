 adsApp.factory('authService', ['$resource', '$localStorage', '$http', function($resource, $localStorage, $http){
	var resource = $resource(
		'http://softuni-ads.azurewebsites.net/api/user/login'
	);

	var regResource = $resource('http://softuni-ads.azurewebsites.net/api/user/register');

	function loginUser (user) {
		return resource.save(user, function (data) {
			$localStorage.isLoggedIn = true;
			$localStorage.currUser = data.username;
			$http.defaults.headers.common['Authorization'] = 'Bearer ' + data.access_token;
			if (data.isAdmin) {
				$localStorage.isAdmin = true;
			} else {
				$localStorage.isAdmin = false;
			}
		}, function (error) {
		});
	}

	function isLoggedIn () {
		return $localStorage.isLoggedIn;
	}

	function getCurrUserName () {
		return $localStorage.currUser;
	}

	function isAdmin () {
		return $localStorage.isAdmin;
	}

	function logoutUser () {
		$localStorage.$reset();
		$http.defaults.headers.common['Authorization'] = '';
	}

	function registerUser (user) {
		return regResource.save(user, function (data) {
			$localStorage.isLoggedIn = true;
			$localStorage.currUser = data.username;
			$http.defaults.headers.common['Authorization'] = 'Bearer ' + data.access_token;
			if (data.isAdmin) {
				$localStorage.isAdmin = true;
			} else {
				$localStorage.isAdmin = false;
			}
		}, function (error) {
			
		});
	}

	return {
		loginUser: loginUser,
		isLoggedIn: isLoggedIn,
		getCurrUserName: getCurrUserName,
		logoutUser: logoutUser,
		isAdmin: isAdmin,
		registerUser: registerUser
	};
}])