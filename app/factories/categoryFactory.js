adsApp.factory('categoryFactory', ['$resource', '$http', 'filterPageSize', 'baseUrl', 
	function($resource, $http, filterPageSize, baseUrl){
	var resource = $resource(baseUrl + 'categories');

	var adminResource = $resource(baseUrl + 'admin/categories?sortBy=:sort&pagesize=:size&startpage=:page',
		{sort: '@sort', size: '@size', page: '@page'});

	var adminCategory = $resource(baseUrl + 'admin/categories/:id',
		{id: '@id'}, { 
		update: {
			method: 'PUT'
		}});

	function getAllCategories () {
		return resource.query();
	}

	function adminGetAllCategories (pageNum, filter) {
		return adminResource.get({sort: filter, size: filterPageSize, page: pageNum});
	}

	function deleteCategory (currId) {
		return adminCategory.delete({id: currId});
	}

	function updateCategory (currId, category) {
		return adminCategory.update({id: currId}, category);
	}

	function createCategory (category) {
		return adminCategory.save(category);
	}

	return {
		getAllCategories: getAllCategories,
		adminGetAllCategories: adminGetAllCategories,
		deleteCategory: deleteCategory,
		updateCategory: updateCategory,
		createCategory: createCategory
	};
}])