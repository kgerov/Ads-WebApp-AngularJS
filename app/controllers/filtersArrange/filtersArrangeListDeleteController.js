adsApp.controller('filtersArrangeListDeleteController',  ['$scope', 'categoryFactory', '$location', '$routeParams', 'townFactory',
	function($scope, categoryFactory, $location, $routeParams, townFactory) {
		$scope.inCategories = ($location.path().match(/\/(.+?)\/categories/g) != null ? true : false);
		$scope.filterName = $routeParams.name;
		$scope.filterId = $routeParams.id;

		$scope.backToCategories = function () {
			if ($scope.inCategories) {
				$location.path('/admin/categories/list');
			} else {
				$location.path('/admin/towns/list');
			}
		}

		$scope.deleteFilter = function (id) {
			if ($scope.inCategories) {
				categoryFactory.deleteCategory(id).$promise
				.then(function () {
					adsNoty(true, 'Category successfully Deleted.');
					$location.path('/admin/categories/list');
				}, function () {
					adsNoty(false, 'Failed. Connection problem.');
				});
			} else {
				townFactory.deleteTown(id).$promise
				.then(function () {
					adsNoty(true, 'Town successfully Deleted.');
					$location.path('/admin/towns/list');
				}, function () {
					adsNoty(false, 'Failed. Connection problem.');
				});
			}
			
		}
}])