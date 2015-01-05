adsApp.controller('newAdController', ['$scope', 'categoryFactory', 'townFactory', '$http', 'adsFactory', '$location', 'authService', '$routeParams',
    function($scope, categoryFactory, townFactory, $http, adsFactory, $location, authService, $routeParams) {

    $scope.ad = {};
    $scope.formSubmitted = false;
    $scope.touchTitle = false;
    $scope.touchDesciption = false;
    $scope.inEditMode = ($location.path().match(/\/(.+?)\/ads\/edit/g) != null ? true : false);
    $scope.inAdminEditMode = ($location.path().match(/\/admin\/ads\/edit/g) != null ? true : false);
    $scope.changeImage = false;
    $scope.categories = [];
    $scope.towns = [];

    init();

    function init () {
        categoryFactory.getAllCategories().$promise
            .then(function (data) {
                $scope.categories = data;
            }, function (error) {
                adsNoty(false, 'Couldn\'t load categories');
            });

        townFactory.getAllTowns().$promise
            .then(function (data) {
                $scope.towns = data;
            }, function (error) {
                adsNoty(false, 'Couldn\'t load towns');
            });

        if ($scope.inEditMode) {
            var adID = $routeParams.id; 
            if ($scope.inAdminEditMode) {
                adsFactory.adminGetAdById(adID).$promise
                .then(function (data) {
                    handleData(data);
                }, function () {
                    adsNoty(false, 'Poor connection to server. Can\'t retrieve ad data');
                });
            } else {
                adsFactory.getAdById(adID).$promise
                .then(function (data) {
                    handleData(data);
                }, function () {
                    adsNoty(false, 'Poor connection to server. Can\'t retrieve ad data');
                });
            }

            function handleData (data) {
                $scope.ad = {
                        Title: data.title,
                        Description: data.text,
                        Img: data.imageDataUrl,
                        Id: data.id
                    };

                    if (data.imageDataUrl) {
                        $('#preview-pic').attr('src', data.imageDataUrl);
                        $('#remove-img').css('visibility', 'visible');
                        $('#remove-img').css('display', 'inline-block');
                    }

                    setTimeout(function () {
                            $scope.$apply(function () {
                                for(x in $scope.towns) {
                                    if ($scope.towns[x].id = data.townId) {
                                        $scope.ad.Town = $scope.towns[x].id;
                                        break;
                                    }
                                }

                                for(x in $scope.categories) {
                                    if ($scope.categories[x].id = data.categoryId) {
                                        $scope.ad.Category = $scope.categories[x].id;
                                        break;
                                    }
                                }
                            });
                        }, 150);
            }
        }
    }

    $scope.editAd = function (ad, valid) {
        $scope.formSubmitted = true;

        if (valid) {
            var adJson = {
                'title': ad.Title,
                'text': ad.Description,
                'categoryid': ad.Category,
                'townid': ad.Town
            };

            if ($scope.changeImage) {
                adJson.changeimage = true;
                adJson.imageDataUrl = ad.Img;
            }

            adsFactory.updateAdById(ad.Id, adJson).$promise
                .then(function () {
                    adsNoty(true, 'Ad edited. Don\'t forget to submit for approval');
                    $location.path('/' + authService.getCurrUserName() + '/ads');
                }, function () {
                    adsNoty(false, 'Error occured, please try again');
                });
        }
    }

    $scope.goToMyAds = function () {
        var username = $routeParams.user;
        $location.path('/' + username + '/ads');
    }

    $scope.uploadAd = function (ad, valid) {
        $scope.formSubmitted = true;

        if (valid) {
            var adJson = {
                'title': ad.Title,
                'text': ad.Description,
                'categoryid': ad.Category,
                'townid': ad.Town,
                'imageDataUrl': ad.Img
            };

            adsFactory.publishNewAd(adJson).$promise
                .then(function (data) {
                    adsNoty(true, 'Ad submitted for approval. When approved, it will become public');
                    $location.path('/' + authService.getCurrUserName() + '/ads');
                }, function (error) {
                    adsNoty(false, 'Error occured, please try again');
                });
        }
    }

    $(":file").filestyle({buttonText: "Browse...", buttonName: "btn-primary"});

	 function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            
            reader.onload = function (e) {
                $('#preview-pic').attr('src', e.target.result);
            }
            
            reader.readAsDataURL(input.files[0]);
        }
    }
    
    $("#ad-pic-upload").change(function() {
        readURL(this);
        $scope.changeImage = true;
        $('#remove-img').css('visibility', 'visible');
        $('#remove-img').css('display', 'inline-block');
    });

    $('#remove-img').on('click', function () {
        $(":file").filestyle('clear');
        $scope.ad.Img = null;
        $scope.changeImage = true;

        $('#preview-pic').attr('src', 'http://img4.wikia.nocookie.net/__cb20130819001030/lego/images/a/ac/No-Image-Basic.png');
        $('#remove-img').css('visibility', 'hidden');
        $('#remove-img').css('display', 'none');
    });
}])