

var app = angular.module('myApp', ["ngRoute"]);

app.config(function($routeProvider) {
	$routeProvider
	.when("/", {
		templateUrl: "templates/main.html",
		controller: function($scope, $http, API) {
			
		}
	})
	.when("/items/add", {
		templateUrl: "templates/add.html",
		controller: function($scope, $http, API) {
			$scope.item = {archived:false};
			$scope.add = function () {
				$http.post(API + 'items/', $scope.item);
			};
		}
	})
	.when("/items/edit/:id", {
		templateUrl: "templates/edit.html",
		controller: function($scope, $routeParams, $http, API, itemsSvc) {
			itemsSvc.get($routeParams.id).then(function(response) {
				$scope.item = response.data;
			});
			$scope.save = function () {
				var currentId = $scope.item.id;
				var index = ($scope.mainArray.findIndex(function(x){
					return x.id === currentId;
				}));
				$scope.mainArray[index] = angular.copy($scope.item, $scope.mainArray[index]);
				console.log($scope.mainArray[index]);
				$http.put(API + 'items/' + $routeParams.id, $scope.item);
			};	
		}
	})
	.when("/login", {
		templateUrl: "templates/login.html"
	})
});

app.constant('API', 'http://localhost:3000/');

app.factory('itemsSvc', function($http, API) {
	return {
		getAll: function() {
			return $http.get(API + 'items/');
		},
		get: function(id) {
			return $http.get(API + 'items/' + id);
		}
	}
});

app.controller('mainController', function($scope, $http, $location, itemsSvc) {
	$scope.sortType = 'name';
	$scope.sortReverse= false;
	$scope.searchQuery = '';

	itemsSvc.getAll().then(function(response) {
		$scope.mainArray = response.data;
	});

	// $http.get("https://api.myjson.com/bins/4fv94")
	// 	.then(function(response) {
	// 		$scope.mainArray = response.data;
	// 	});

	$scope.go = function(path) {
		$location.path(path);
	};

	$scope.save = function() {
		console.log("save");
	};

	$scope.cancel = function() {
		console.log("cancel");
	};

	$scope.selected = false;

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
			};
		});
		$scope.archivable = false;
	}

	$scope.unarchive = function(item) {
		var index = $scope.mainArray.indexOf(item);
		$scope.mainArray[index].archived = false;
		$scope.archivable = true;
	}

	$scope.delete = function (x) {
		var answer = confirm("Are you sure you want to delete the selected item?")
		if (answer) {var index = $scope.mainArray.indexOf(x);
		$scope.mainArray.splice(index, 1)};     
	};

	// $scope.currentEdited = undefined;

	// $scope.edit = function (x) {
	// 	$scope.currentEdited = angular.copy(x, $scope.currentEdited);
	// };



	$scope.shownElements = 5;

	$scope.paginationLimit = function() {
		return $scope.shownElements;
	};

	$scope.showMore = function() {
		$scope.shownElements += 3;
	};


});

app.directive('myDirective', function() {

});