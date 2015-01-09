adsApp.controller('filtersArrangeListEditController', ['$scope', 'categoryFactory', '$location', '$routeParams', 'townFactory',
	function($scope, categoryFactory, $location, $routeParams, townFactory) {
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
					if ($scope.inCategories) {
						categoryFactory.updateCategory(id, filter).$promise
						.then(function () {
							adsNoty(true, 'Category name updated successfully!');
							$location.path('/admin/categories/list');
						}, function () {
							adsNoty(false, 'Couldn\'t update category name, please try again.');
						});
					} else {
						townFactory.updateTown(id, filter).$promise
						.then(function () {
							adsNoty(true, 'Town name updated successfully!');
							$location.path('/admin/towns/list');
						}, function () {
							adsNoty(false, 'Couldn\'t update town name, please try again.');
						});
					}
					
				} else {
					if ($scope.inCategories) {
						categoryFactory.createCategory(filter).$promise
						.then(function () {
							adsNoty(true, 'Category created successfully!');
							$location.path('/admin/categories/list');
						}, function () {
							adsNoty(false, 'Couldn\'t create category, please try again.');
						});
					} else {
						townFactory.createTown(filter).$promise
						.then(function () {
							adsNoty(true, 'Town created successfully!');
							$location.path('/admin/towns/list');
						}, function () {
							adsNoty(false, 'Couldn\'t create town, please try again.');
						});
					}
					
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