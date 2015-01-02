adsApp.factory('adsFactory', ['$resource', '$http', 'pageSize', function($resource, $http, pageSize){
	var resource = $resource('http://softuni-ads.azurewebsites.net/api/ads?pagesize=:size&startpage=:pageNum&townid=:cityid&categoryid=:catid',
		{size: '@size', pageNum: '@pageNum', cityid: '@cityid', catid: '@catid'});

	var userResource = $resource('http://softuni-ads.azurewebsites.net/api/user/ads?pagesize=:size&startpage=:pageNum&&status=:stat',
		{size: '@size', pageNum: '@pageNum', stat: '@stat'});

	function getAdsFromPage (desiredPage, townId, catId) {
		return resource.get({ size: pageSize, pageNum: desiredPage, cityid: townId, catid: catId });
	}

	function publishNewAd (ad) {
		return userResource.save(ad);
	}

	function getUserAds (desiredPage, currStatus) {
		return userResource.get({ size: pageSize, pageNum: desiredPage, stat: currStatus });
	}
	return {
		getAdsFromPage: getAdsFromPage, 
		publishNewAd: publishNewAd,
		getUserAds: getUserAds
	};
}])