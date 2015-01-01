adsApp.controller('newAdController', ['$scope', 'categoryFactory', 'townFactory', '$http', 'adsFactory', '$location', function($scope, categoryFactory, townFactory, $http, adsFactory, $location) {
    $scope.formSubmitted = false;
    $scope.touchTitle = false;
    $scope.touchDesciption = false;
    $scope.categories = [];
    $scope.towns = [];

    init();

    function init () {
        categoryFactory.getAllCategories().$promise
            .then(function (data) {
                $scope.categories = data;
            }, function (error) {
                
            });

        townFactory.getAllTowns().$promise
            .then(function (data) {
                $scope.towns = data;
            }, function (error) {
                
            });
    }

    $scope.uploadAd = function (ad, valid) {
        $scope.formSubmitted = true;

        if (valid) {
            var adJson = {
                'title': ad.Title,
                'text': ad.Description,
                'categoryid': ad.Category,
                'townid': ad.Town
            };

            adsFactory.publishNewAd(adJson).$promise
                .then(function (data) {
                    console.log('succcess');
                }, function (error) {
                    
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
        $('#remove-img').css('visibility', 'visible');
        $('#remove-img').css('display', 'inline-block');
    });

    $('#remove-img').on('click', function () {
        $(":file").filestyle('clear');
        $scope.ad.Img = null;

        $('#preview-pic').attr('src', 'http://img4.wikia.nocookie.net/__cb20130819001030/lego/images/a/ac/No-Image-Basic.png');
        $('#remove-img').css('visibility', 'hidden');
        $('#remove-img').css('display', 'none');
    });
}])