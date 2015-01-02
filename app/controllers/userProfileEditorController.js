adsApp.controller('userProfileEditorController', ['$scope', 'townFactory', 'authService', '$http', function($scope, townFactory, authService, $http){
	//$scope.user.Name = 'Get this';

	$scope.touchOldPass = false;
	$scope.touchPass = false;
	$scope.touchPassConfirm = false;
	$scope.touchPhone = false;
	$scope.touchEmail = false;
	$scope.touchName = false;
	$scope.touchTown = false;

	$scope.formSubmitted = false;
	$scope.formPassSubmitted = false;
	$scope.towns = [];

	init();

	$scope.changePass = function (pass, valid) {
		$scope.formPassSubmitted = true;

		if (valid) {
			console.log(pass);
		}
	}

	$scope.editUser = function (user, valid) {
		$scope.formSubmitted = true;

		if (valid) {

		}
	}

	function init () {
		townFactory.getAllTowns().$promise
			.then(function (data) {
				$scope.towns = data;
			}, function (error) {
				adsNoty(false, 'Couln\'t retrieve towns, Sorry for the inconvenience' );
			});
	}
}])