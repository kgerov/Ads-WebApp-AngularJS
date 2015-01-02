adsApp.factory('modifyUserProfileService', ['$resource', '$http', function($resource, $http) {
	var resource = $resource('http://softuni-ads.azurewebsites.net/api/user/profile');

	function getUserData () {
		return resource.query();
	}

	return {
		getUserData: getUserData
	};
}])