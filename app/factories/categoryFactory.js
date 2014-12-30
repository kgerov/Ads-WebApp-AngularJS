adsApp.factory('categoryFactory', ['$resource', '$http', function($resource, $http){
	var resource = $resource('http://softuni-ads.azurewebsites.net/api/categories');

	function getAllCategories () {
		return resource.query();
	}

	return {
		getAllCategories: getAllCategories
	};
}])