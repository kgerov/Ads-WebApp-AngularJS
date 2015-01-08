adsApp.factory('townFactory', ['$resource', '$http', 'baseUrl', function($resource, $http, baseUrl){
	var resource = $resource(baseUrl + 'towns');

	function getAllTowns () {
		return resource.query();
	}

	return {
		getAllTowns: getAllTowns
	};
}])