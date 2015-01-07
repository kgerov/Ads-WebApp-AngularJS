adsApp.controller('mainController', ['$scope', '$rootScope', 'usSpinnerService', function($scope, $rootScope, usSpinnerService){
	$scope.spinneractive = false;

    $scope.startSpin = function () {
      if (!$scope.spinneractive) {
        usSpinnerService.spin('spinner-1');
      }
    };

    $scope.stopSpin = function () {
      if ($scope.spinneractive) {
        usSpinnerService.stop('spinner-1');
      }
    };

    $rootScope.$on('us-spinner:spin', function(event, key) {
      $scope.spinneractive = true;
    });

    $rootScope.$on('us-spinner:stop', function(event, key) {
      $scope.spinneractive = false;
    });
}])