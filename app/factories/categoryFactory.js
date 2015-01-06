adsApp.factory('categoryFactory', ['$resource', '$http', 'filterPageSize', function($resource, $http, filterPageSize){
	var resource = $resource('http://softuni-ads.azurewebsites.net/api/categories');

	var adminResource = $resource('http://softuni-ads.azurewebsites.net/api/admin/categories?sortBy=:sort&pagesize=:size&startpage=:page',
		{sort: '@sort', size: '@size', page: '@page'});

	function getAllCategories () {
		return resource.query();
	}

	function adminGetAllCategories (pageNum, filter) {
		return adminResource.get({sort: '-Name', size: filterPageSize, page: pageNum});
	}

	return {
		getAllCategories: getAllCategories,
		adminGetAllCategories: adminGetAllCategories
	};
}])