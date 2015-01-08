adsApp.factory('adsFactory', ['$resource', '$http', 'pageSize', 'baseUrl', function($resource, $http, pageSize, baseUrl){
	var resource = $resource(baseUrl + 'ads?pagesize=:size&startpage=:pageNum&townid=:cityid&categoryid=:catid',
		{size: '@size', pageNum: '@pageNum', cityid: '@cityid', catid: '@catid'});

	var userResource = $resource(baseUrl + 'user/ads?pagesize=:size&startpage=:pageNum&status=:stat',
		{size: '@size', pageNum: '@pageNum', stat: '@stat'});

	var activateResource = $resource(baseUrl + 'user/ads/publishagain/:id',
		{id: '@id'}, { 
		update: {
			method: 'PUT'
		}});

	var deactivateResource = $resource(baseUrl + 'user/ads/deactivate/:id',
		{id: '@id'}, { 
		update: {
			method: 'PUT'
		}});

	var userAdResource = $resource(baseUrl + 'user/ads/:id', 
		{id: '@id'}, { 
		update: {
			method: 'PUT'
		}});

	var adminApproveResourse = $resource(baseUrl + 'admin/ads/approve/:id',
		{id: '@id'}, { 
		update: {
			method: 'PUT'
		}});

	var adminRejectResourse = $resource(baseUrl + 'admin/ads/reject/:id',
		{id: '@id'}, { 
		update: {
			method: 'PUT'
		}});

	var adminAdResourse = $resource(baseUrl + 'admin/ads/:id',
		{id: '@id'}, { 
		update: {
			method: 'PUT'
		}});

	var adminResource = $resource(baseUrl + 'admin/ads?pagesize=:size&startpage=:pageNum&townid=:cityid&categoryid=:catid&status=:stat&sortby=-Title',
		{size: '@size', pageNum: '@pageNum', cityid: '@cityid', catid: '@catid', stat: '@stat'});

	function getAdsFromPage (desiredPage, townId, catId) {
		return resource.get({ size: pageSize, pageNum: desiredPage, cityid: townId, catid: catId });
	}

	function publishNewAd (ad) {
		return userResource.save(ad);
	}

	function getUserAds (desiredPage, currStatus) {
		return userResource.get({ size: pageSize, pageNum: desiredPage, stat: currStatus });
	}

	function activateAd (currId) {
		return activateResource.update({id: currId});
	}

	function deactivateAd (currId) {
		return deactivateResource.update({id: currId});
	}

	function getAdById (currId) {
		return userAdResource.get({id: currId});
	}

	function deleteAdById (currId) {
		return userAdResource.delete({id: currId});
	}

	function updateAdById (currId, ad) {
		return 	userAdResource.update({id: currId}, ad);
	}

	function getAdminAds (desiredPage, townId, catId, currStatus) {
		return adminResource.get({ size: pageSize, pageNum: desiredPage, cityid: townId, catid: catId, stat: currStatus });
	}

	function approveAd (currId) {
		return adminApproveResourse.update({id: currId});
	}

	function rejectAd (currId) {
		return adminRejectResourse.update({id: currId});
	}

	function adminDeleteAd (currId) {
		return adminAdResourse.delete({id: currId});
	}

	function adminGetAdById (currId) {
		return adminAdResourse.get({id: currId});
	}

	function adminUpdateAd (currId, ad) {
		return adminAdResourse.update({id: currId}, ad);
	}

	return {
		getAdsFromPage: getAdsFromPage, 
		publishNewAd: publishNewAd,
		getUserAds: getUserAds,
		activateAd: activateAd,
		deactivateAd: deactivateAd,
		getAdById: getAdById,
		deleteAdById: deleteAdById,
		updateAdById: updateAdById,
		getAdminAds: getAdminAds,
		approveAd: approveAd,
		rejectAd: rejectAd,
		adminDeleteAd: adminDeleteAd,
		adminGetAdById: adminGetAdById,
		adminUpdateAd: adminUpdateAd
	};
}])