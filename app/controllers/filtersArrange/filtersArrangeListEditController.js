adsApp.controller('filtersArrangeListEditController', ['$scope', 'categoryFactory', '$location', '$routeParams',
	function($scope, categoryFactory, $location, $routeParams) {
		$scope.touchName = false;
		$scope.formSubmitted = false;
		$scope.inEditMode = ($location.path().match(/\/(.+?)\/(.+?)\/edit/g) != null ? true : false);
		$scope.inCategories = ($location.path().match(/\/(.+?)\/categories/g) != null ? true : false);
		$scope.filter = {};

		if ($scope.inEditMode) {
			$scope.filter.name = $routeParams.name;
		}

		$scope.crudFilter = function (filter, valid) {
			$scope.formSubmitted = true;
			if (valid) {
				var id = $routeParams.id;

				if ($scope.inEditMode) {
					categoryFactory.updateCategory(id, filter).$promise
						.then(function () {
							adsNoty(true, 'Category name updated successfully!');
							$location.path('/admin/categories/list');
						}, function () {
							adsNoty(false, 'Couldn\'t update category name, please try again.');
						});
				} else {
					categoryFactory.createCategory(filter).$promise
						.then(function () {
							adsNoty(true, 'Category created successfully!');
							$location.path('/admin/categories/list');
						}, function () {
							adsNoty(false, 'Couldn\'t create category, please try again.');
						});
				}
			}
		}

		$scope.backToCategories = function () {
			if ($scope.inCategories) {
				$location.path('/admin/categories/list');
			} else {
				$location.path('/admin/towns/list');
			}
		}
}])