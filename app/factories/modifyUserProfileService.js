adsApp.factory('modifyUserProfileService', ['$resource', '$http', function($resource, $http) {
	var resource = $resource('http://softuni-ads.azurewebsites.net/api/user/profile', {}, { 
		update: {
			method: 'PUT'
		}});
	
	var changePassResource = $resource('http://softuni-ads.azurewebsites.net/api/user/changePassword', {}, { 
		update: {
			method: 'PUT'
		}});

	function getUserData () {
		return resource.get();
	}

	function updateUserProfile (user) {
		return resource.update(user);
	}

	function changePass (pass) {
		return changePassResource.update(pass);
	}

	return {
		getUserData: getUserData,
		updateUserProfile: updateUserProfile,
		changePass: changePass
	};
}])