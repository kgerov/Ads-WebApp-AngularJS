adsApp.factory('townFactory', ['$resource', '$http', 'baseUrl', 'filterPageSize', 
	function($resource, $http, baseUrl, filterPageSize){
	var resource = $resource(baseUrl + 'towns');

	var adminResource = $resource(baseUrl + 'admin/towns?sortBy=:sort&pagesize=:size&startpage=:page',
		{sort: '@sort', size: '@size', page: '@page'});

	var adminTown = $resource(baseUrl + 'admin/towns/:id',
		{id: '@id'}, { 
		update: {
			method: 'PUT'
		}});

	function getAllTowns () {
		return resource.query();
	}

	function adminGetAllTowns (pageNum, filter) {
		return adminResource.get({sort: filter, size: filterPageSize, page: pageNum});
	}

	function deleteTown (currId) {
		return adminTown.delete({id: currId});
	}

	function updateTown (currId, town) {
		return adminTown.update({id: currId}, town);
	}

	function createTown (town) {
		return adminTown.save(town);
	}

	return {
		getAllTowns: getAllTowns,
		adminGetAllTowns: adminGetAllTowns,
		deleteTown: deleteTown,
		updateTown: updateTown,
		createTown: createTown
	};
}])