adsApp.controller('userProfileEditorController', ['$scope', 'townFactory', 'authService', '$http', 'modifyUserProfileService', '$location',
	function($scope, townFactory, authService, $http, modifyUserProfileService, $location) {

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
			var jsonPass = {
				oldPassword: pass.OldPass,
				newPassword: pass.Pass,
				confirmPassword: pass.PassConfirm
			};

			modifyUserProfileService.changePass(jsonPass).$promise
				.then(function (data) {
					adsNoty(true, 'Your password is changed');
					$location.path('/' + authService.getCurrUserName() + '/home');
				}, function (error) {
					var message = 'Unable to update password: ';
					for (item in error.data.modelState) {
					    message += error.data.modelState[item].join(', ');
					}
					adsNoty(false, message);
				});
		}
	}

	$scope.editUser = function (user, valid) {
		$scope.formSubmitted = true;

		if (valid) {
			var jsonUser = {
				name: user.Name,
				email: user.Email,
				phoneNumber: user.Phone,
				townId: user.Town
			};

			modifyUserProfileService.updateUserProfile(jsonUser).$promise
				.then(function (data) {
					adsNoty(true, 'User profile updated successfully');
					$location.path('/' + authService.getCurrUserName() + '/home');
				}, function (error) {
					adsNoty(false, 'An error occured while updating your profile, please try again.');	
				});
		}
	}

	function init () {
		townFactory.getAllTowns().$promise
					.then(function (data) {
						$scope.towns = data;
					}, function (error) {
						adsNoty(false, 'Couln\'t retrieve towns, Sorry for the inconvenience' );
					})
					.then(function () {
						modifyUserProfileService.getUserData().$promise
							.then(function (data) {
								var _userInfo = data;
								if (_userInfo.townId) {
									$scope.user = {
										Name: _userInfo.name,
										Email: _userInfo.email,
										Phone: _userInfo.phoneNumber,
										Town: _userInfo.townId
									};
								} else {
									$scope.user = {
										Name: _userInfo.name,
										Email: _userInfo.email,
										Phone: _userInfo.phoneNumber
									};
								}
							}, function () {
								adsNoty(false, 'Couln\'t retrieve user information, Sorry for the inconvenience');
							});
					}, function () {
						
					});
	}
}])