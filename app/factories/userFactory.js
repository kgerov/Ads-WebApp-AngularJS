adsApp.factory('userFactory', ['$resource', '$http', 'baseUrl', 'userPageSize', function($resource, $http, baseUrl, userPageSize) {
	var resource = $resource(baseUrl + 'admin/users?sortBy=:sort&pagesize=:size&startpage=:page',
		{sort: '@sort', size: '@size', page: '@page'});

	function getAllUsers (pageNum, filter) {
		return resource.get({sort: filter, size: userPageSize, page: pageNum});
	}

	return {
		getAllUsers: getAllUsers
	}
}])