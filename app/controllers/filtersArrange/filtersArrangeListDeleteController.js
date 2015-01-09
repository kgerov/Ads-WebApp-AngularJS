adsApp.controller('filtersArrangeListDeleteController',  ['$scope', 'categoryFactory', '$location', '$routeParams',
	function($scope, categoryFactory, $location, $routeParams) {
		$scope.filterName = $routeParams.name;
		$scope.filterId = $routeParams.id;

		$scope.backToCategories = function () {
			$location.path('/admin/categories/list');
		}

		$scope.deleteFilter = function (id) {
			categoryFactory.deleteCategory(id).$promise
				.then(function () {
					adsNoty(true, 'Category successfully Deleted.');
					$location.path('/admin/categories/list');
				}, function () {
					adsNoty(false, 'Failed. Connection problem.');
				});
		}
}])