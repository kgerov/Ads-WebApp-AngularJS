adsApp.factory('userFactory', ['$resource', '$http', 'baseUrl', 'userPageSize', function($resource, $http, baseUrl, userPageSize) {
	var resource = $resource(baseUrl + 'admin/users?sortBy=:sort&pagesize=:size&startpage=:page',
		{sort: '@sort', size: '@size', page: '@page'});

	var userResource = $resource(baseUrl + 'admin/user/:user',
		{user: '@user'}, { 
		update: {
			method: 'PUT'
		}});

	var setPassResource = $resource(baseUrl + 'admin/setpassword',
		{}, { 
		update: {
			method: 'PUT'
		}});

	function getAllUsers (pageNum, filter) {
		return resource.get({sort: filter, size: userPageSize, page: pageNum});
	}

	function editUser(username, user) {
		return userResource.update({user: username}, user);
	}

	function setPassword(newPass) {
		return setPassResource.update(newPass);
	}

	function deleteUser (username) {
		return userResource.delete({user: username});
	}

	return {
		getAllUsers: getAllUsers,
		deleteUser: deleteUser,
		editUser: editUser,
		setPassword: setPassword
	}
}])