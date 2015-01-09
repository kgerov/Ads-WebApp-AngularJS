adsApp.controller('adController', ['$scope', 'adsFactory', 'pageSize', '$rootScope', '$routeParams', '$location',
    function($scope, adsFactory, pageSize, $rootScope, $routeParams, $location) {

    $scope.ads = [];
    $scope.adsCount = 0;
    $scope.noAds = false;
    $scope.usersPerPage = pageSize;
    $scope.currentFilters = { categoryFilterRadio : 'all-cat', townFilterRadio : 'all-town', adStatus: '' };
    getPageContent(1);

    $rootScope.$on('filterChanged', function (event, filters) {
        for(x in filters) {
            $scope.currentFilters[x] = filters[x];
        }

    	$scope.pageChangeHandler(1, $scope.currentFilters);
    });

  	$scope.pageChangeHandler = function(num, filters) {
        var cat = filters.categoryFilterRadio,
                town = filters.townFilterRadio,
                status = filters.adStatus || null,
                catId = cat != 'all-cat' ? cat.substring(1, cat.length) : '',
                townId = town != 'all-town' ? town.substring(1, town.length) : '';
        getPageContent(num, townId, catId, status);
  	};

    $scope.deactivateAd = function (id) {
        adsFactory.deactivateAd(id).$promise
            .then(function (data) {
                adsNoty(true, 'Ad deactivated successfuly');
                $scope.pageChangeHandler(1, $scope.currentFilters);
            }, function (error) {
                adsNoty(false, 'Lost connection to server. Can\'t deactivate ad');
            });
    }

    $scope.publishAd = function (id) {
        adsFactory.activateAd(id).$promise
            .then(function (data) {
                adsNoty(true, 'Ad activated successfuly');
                $scope.pageChangeHandler(1, $scope.currentFilters);
            }, function (error) {
                adsNoty(false, 'Lost connection to server. Can\'t activate ad');
            });
    }

    $scope.deleteAd = function (id) {
        var username = $routeParams.user;
        $location.path('/' + username + '/ads/delete/' + id);
    }

    $scope.editAd = function (id) {
        var username = $routeParams.user;
        $location.path('/' + username + '/ads/edit/' + id);
    }

    $scope.approveAd = function (id) {
        adsFactory.approveAd(id).$promise
            .then(function (data) {
                adsNoty(true, 'Ad approved successfuly');
                $scope.pageChangeHandler(1, $scope.currentFilters);
            }, function (error) {
                adsNoty(false, 'Lost connection to server. Can\'t activate ad');
            });
    }

     $scope.rejectAd = function (id) {
        adsFactory.rejectAd(id).$promise
            .then(function (data) {
                adsNoty(true, 'Ad rejected successfuly');
                $scope.pageChangeHandler(1, $scope.currentFilters);
            }, function (error) {
                adsNoty(false, 'Lost connection to server. Can\'t activate ad');
            });
    }

     $scope.editAdAdmin = function (id) {
        $location.path('/admin/ads/edit/' + id);
    }

     $scope.deleteAdAdmin = function (id) {
        adsFactory.adminDeleteAd(id).$promise
            .then(function (data) {
                adsNoty(true, 'Ad deleted successfuly');
                $scope.pageChangeHandler(1, $scope.currentFilters);
            }, function (error) {
                adsNoty(false, 'Lost connection to server. Can\'t activate ad');
            });
    }

    function getPageContent (pageNumber, townId, catId, adStatus) {
                $scope.ads = [];
                $scope.noAds = false;
                $scope.startSpin();
                
                if ($scope.inUserAds) {
                    adsFactory.getUserAds(pageNumber, adStatus).$promise
                        .then(function (data) {
                            handleData(data);
                        }, function (error) {
                            handleError();
                        });
                } else if($scope.inAdminAds) {
                    adsFactory.getAdminAds(pageNumber, townId, catId, adStatus).$promise
                        .then(function (data) {
                            handleData(data);
                        }, function (error) {
                            handleError();
                        });
                } else {
                    adsFactory.getAdsFromPage(pageNumber, townId, catId).$promise
                    .then(function (data) {
                        handleData(data);
                    }, function (error) {
                        handleError();
                    });

                    function handleData (data) {
                            $scope.ads = data.ads;
                            checkNumberOfAds(data.ads.length);
                            $scope.adsCount = data.numItems;
                            $scope.stopSpin();
                            $('html, body').animate({scrollTop : 0},100);
                    }

                    function handleError () {
                        adsNoty(false, 'Connection to server lost. Please try again later');
                    }
    }

        function checkNumberOfAds (num) {
            if (num == 0) {
                $scope.noAds = true;
            } else {
                $scope.noAds = false;
            }
        }
  	}
}])