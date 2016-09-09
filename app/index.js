var app = angular.module('myApp', ["ngRoute"]);

app.config(function($routeProvider) {
	$routeProvider
	.when("/", {
		templateUrl: "templates/main.html"
	})
	.when("/items/add", {
		templateUrl: "templates/add.html"
	})
	.when("/items/edit/:param", {
		templateUrl: "templates/edit.html"
	})
	.when("/login", {
		templateUrl: "templates/login.html"
	})
});

app.controller('mainController', function($scope, $http, $location) {
	$scope.sortType = 'name';
	$scope.sortReverse= false;
	$scope.searchQuery = '';

	$http.get("https://api.myjson.com/bins/4fv94")
		.then(function(response) {
			$scope.mainArray = response.data;
		});

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
		var index = $scope.mainArray.indexOf(x);
		$scope.mainArray.splice(index, 1);     
	};

	$scope.currentEdited = undefined;

	$scope.edit = function (item) {
		$scope.currentEdited = item;  
	};

	$scope.shownElements = 5;

	$scope.paginationLimit = function() {
		return $scope.shownElements;
	};

	$scope.showMore = function() {
		$scope.shownElements += 3;
	};


});