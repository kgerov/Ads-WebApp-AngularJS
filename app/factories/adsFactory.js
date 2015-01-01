adsApp.factory('adsFactory', ['$resource', '$http', 'pageSize', function($resource, $http, pageSize){
	var resource = $resource('http://softuni-ads.azurewebsites.net/api/ads?pagesize=:size&startpage=:pageNum&townid=:cityid&categoryid=:catid',
		{size: '@size', pageNum: '@pageNum', cityid: '@cityid', catid: '@catid'});

	function getAdsFromPage (desiredPage, townId, catId) {
		return resource.get({ size: pageSize, pageNum: desiredPage, cityid: townId, catid: catId });
	}

	function publishNewAd (ad) {
		return resource.save(ad);
	}
	return {
		getAdsFromPage: getAdsFromPage, 
		publishNewAd: publishNewAd
	};
}])