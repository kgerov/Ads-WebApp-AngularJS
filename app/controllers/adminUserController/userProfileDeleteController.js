adsApp.controller('userProfileDeleteController', ['$scope', '$localStorage', '$location', 'userFactory',
	function($scope, $localStorage, $location, userFactory) {
		$scope.user = $localStorage.userToDelete;
		delete $localStorage.userToDelete;

		$scope.deleteUser = function (username) {
			userFactory.deleteUser(username).$promise
				.then(function () {
					adsNoty(true, 'User deleted successfully');
					$location.path('/admin/users/list');
				}, function () {
					adsNoty(false, 'Connection to server lost. Please try again');
				});
		}

		$scope.returnToListUsers = function () {
			$location.path('/admin/users/list');
		}
}])