adsApp.factory('adsFactory', ['$resource', '$http', 'pageSize', function($resource, $http, pageSize){
	var resource = $resource('http://softuni-ads.azurewebsites.net/api/ads?pagesize=:size&startpage=:pageNum',
		{size: '@size', pageNum: '@pageNum'});

	function getAdsFromPage (desiredPage) {
		return resource.get({ size: pageSize, pageNum: desiredPage });
	}

	return {
		getAdsFromPage: getAdsFromPage
	};
}])