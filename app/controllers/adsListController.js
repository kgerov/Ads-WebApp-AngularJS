adsApp.controller('adsListController', ['$scope', 'adsFactory', 'pageSize', '$location', function($scope, adsFactory, pageSize, $location) {
    $scope.inUserAds = ($location.path().match(/\/(.+?)\/ads/g) != null ? true : false);
}]);

//https://cdn3.iconfinder.com/data/icons/free-3d-glossy-interface-icon-set/64/Erase.png
