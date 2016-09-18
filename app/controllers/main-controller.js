"use strict";
export default app => {

	app.controller("mainCtrl", function($scope, $http, API, $window, itemsSvc, $location, AuthService) {
		$scope.sortType = 'name';
		$scope.sortReverse= false;
		$scope.searchQuery = '';

		$scope.go = function(path) {
			$location.path(path);
		};

		$scope.logout = function() {AuthService.logout()}

		$scope.selected = false;

		$scope.user = $window.localStorage.user;

		itemsSvc.getAll().then(function(response) {
			$scope.mainArray = response.data;
			$scope.mainArray.forEach(function(item) {
				item.selected = false;
			});
		});
		$scope.delete = function (x) {
			var answer = confirm("Are you sure you want to delete the selected item?");
			if (answer) {
				$http.delete(API + 'items/' + x.id, $scope.item); //Нормально ли так делать вообще?
				var index = $scope.mainArray.indexOf(x);
				$scope.mainArray.splice(index, 1);
			};     
		};
		$scope.toggleAll = function() {
			if (!$scope.selected) {
				$scope.mainArray.forEach(function(item) {
					item.selected = true;
				});
				$scope.selected = true;		
			} else {
				$scope.mainArray.forEach(function(item) {
					item.selected = false;
				});
			$scope.selected = false;
			}
		}
		$scope.archivable = false;
		$scope.searchForArchivable = function () {
			$scope.archivable = $scope.mainArray.some(function(item) {
				return item.selected && !item.archived;
			});
		};
		$scope.archive = function() {
			$scope.mainArray.forEach(function(item) {
				if (item.selected) {
					item.archived = true;
					$http.put(API + 'items/' + item.id, item);
				};
			});
			$scope.archivable = false;
		}

		$scope.unarchive = function(item) {
			var index = $scope.mainArray.indexOf(item);
			$http.put(API + 'items/' + item.id, item);
			$scope.mainArray[index].archived = false;
			$scope.searchForArchivable();
		}
	});

};