adsApp.factory('townFactory', ['$resource', '$http', function($resource, $http){
	var resource = $resource('http://softuni-ads.azurewebsites.net/api/towns');

	function getAllTowns () {
		return resource.query();
	}

	return {
		getAllTowns: getAllTowns
	};
}])