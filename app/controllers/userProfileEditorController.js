adsApp.controller('userProfileEditorController', ['$scope', 'townFactory', 'authService', '$http', 'modifyUserProfileService', 
	function($scope, townFactory, authService, $http, modifyUserProfileService) {

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
			console.log(user);
		}
	}

	function init () {
		modifyUserProfileService.getUserData().$promise
			.then(function (data) {
				return data;
			}, function (error) {
				adsNoty(false, 'Couln\'t retrieve user information, Sorry for the inconvenience' );
			})
			.then(function (data) {
				var _userInfo = data;
				console.log(_userInfo);
				townFactory.getAllTowns().$promise
					.then(function (data) {
						$scope.towns = data;
						$scope.user = {
							Name: _userInfo.name,
							Email: _userInfo.email,
							Phone: _userInfo.phoneNumber,
						};

						setTimeout(function () {
							$scope.$apply(function () {
								$scope.user.Town = $scope.towns[_userInfo.townId - 1].id;
							});
						}, 150);
						
						
					}, function (error) {
						adsNoty(false, 'Couln\'t retrieve towns, Sorry for the inconvenience' );
					});
			})
		
	}
}])