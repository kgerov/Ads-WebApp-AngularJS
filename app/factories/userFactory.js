adsApp.factory('userFactory', ['$resource', '$http', 'baseUrl', 'userPageSize', function($resource, $http, baseUrl, userPageSize) {
	var resource = $resource(baseUrl + 'admin/users?sortBy=:sort&pagesize=:size&startpage=:page',
		{sort: '@sort', size: '@size', page: '@page'});

	var deleteResource = $resource(baseUrl + 'admin/user/:user',
		{user: '@user'});

	function getAllUsers (pageNum, filter) {
		return resource.get({sort: filter, size: userPageSize, page: pageNum});
	}

	function deleteUser (username) {
		return deleteResource.delete({user: username});
	}

	return {
		getAllUsers: getAllUsers,
		deleteUser: deleteUser
	}
}])