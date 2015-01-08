adsApp.factory('modifyUserProfileService', ['$resource', '$http', 'baseUrl', function($resource, $http, baseUrl) {
	var resource = $resource(baseUrl + 'user/profile', {}, { 
		update: {
			method: 'PUT'
		}});
	
	var changePassResource = $resource(baseUrl + 'user/changePassword', {}, { 
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