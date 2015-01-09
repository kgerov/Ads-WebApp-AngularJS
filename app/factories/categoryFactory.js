adsApp.factory('categoryFactory', ['$resource', '$http', 'filterPageSize', 'baseUrl', function($resource, $http, filterPageSize, baseUrl){
	var resource = $resource(baseUrl + 'categories');

	var adminResource = $resource(baseUrl + 'admin/categories?sortBy=:sort&pagesize=:size&startpage=:page',
		{sort: '@sort', size: '@size', page: '@page'});

	var adminDeleteCategory = $resource(baseUrl + 'admin/categories/:id',
		{id: '@id'});

	function getAllCategories () {
		return resource.query();
	}

	function adminGetAllCategories (pageNum, filter) {
		return adminResource.get({sort: filter, size: filterPageSize, page: pageNum});
	}

	function deleteCategory (currId) {
		return adminDeleteCategory.delete({id: currId});
	}

	return {
		getAllCategories: getAllCategories,
		adminGetAllCategories: adminGetAllCategories,
		deleteCategory: deleteCategory
	};
}])