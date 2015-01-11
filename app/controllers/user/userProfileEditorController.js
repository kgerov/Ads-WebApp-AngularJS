adsApp.controller('userProfileEditorController', ['$scope', 'townFactory', 'authService', '$http', 'modifyUserProfileService', '$location', '$localStorage', 'userFactory',
	function($scope, townFactory, authService, $http, modifyUserProfileService, $location, $localStorage, userFactory) {

	$scope.touchOldPass = false;
	$scope.touchPass = false;
	$scope.touchPassConfirm = false;
	$scope.touchPhone = false;
	$scope.touchEmail = false;
	$scope.touchName = false;
	$scope.touchTown = false;

	$scope.inAdminEditMode = ($location.path().match(/\/admin\/users\/edit/g) != null ? true : false);

	$scope.formSubmitted = false;
	$scope.formPassSubmitted = false;
	$scope.towns = [];

	init();

	$scope.changePass = function (pass, valid, form) {
		$scope.formPassSubmitted = true;
		if (valid || ($scope.inAdminEditMode && form.inputPass.$valid && form.inputPassConfirm.$valid)) {
			if ($scope.inAdminEditMode) {
				var jsonPass = {
					username: $scope.user.username,
					newPassword: pass.Pass,
					confirmPassword: pass.PassConfirm
				};

				userFactory.setPassword(jsonPass).$promise
					.then(function () {
						adsNoty(true, 'The password is changed');
						$location.path('/admin/users/list');
					}, function () {
						var message = 'Unable to update password: ';
						for (item in error.data.modelState) {
						    message += error.data.modelState[item].join(', ');
						}
						adsNoty(false, message);
					});
			} else {
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

			if ($scope.inAdminEditMode) {
				jsonUser.username = user.username;
				jsonUser.isAdmin = user.isAdmin;

				userFactory.editUser(user.username, jsonUser).$promise
					.then(function () {
						adsNoty(true, 'User profile updated successfully');
						$location.path('/admin/home');
					}, function () {
						adsNoty(false, 'An error occured while updating the profile, please try again.');	
					})
			} else {
				modifyUserProfileService.updateUserProfile(jsonUser).$promise
					.then(function (data) {
						adsNoty(true, 'User profile updated successfully');
						$location.path('/' + authService.getCurrUserName() + '/home');
					}, function (error) {
						adsNoty(false, 'An error occured while updating your profile, please try again.');	
					});
			}
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
						if ($scope.inAdminEditMode) {
							handleData($localStorage.userToEdit);
							delete $localStorage.userToEdit;
						} else {
							modifyUserProfileService.getUserData().$promise
								.then(function (data) {
									handleData(data);
								}, function () {
									handleError();
								});
						}
					}, function () {
						
					});

		function handleData (data) {
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

			if ($scope.inAdminEditMode) {
				$scope.user.isAdmin = _userInfo.isAdmin;
				$scope.user.username = _userInfo.username;
			}
		}

		function handleError () {
			adsNoty(false, 'Couln\'t retrieve user information, Sorry for the inconvenience');
		}
	}
}])