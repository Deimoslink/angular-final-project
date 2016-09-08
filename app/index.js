var app = angular.module('myApp', ["ngRoute"]);

app.config(function($routeProvider) {
	$routeProvider
	.when("/", {
		templateUrl: "templates/main.html"
	})
	.when("/addition", {
		templateUrl: "templates/addition.html"
	})
});

app.controller('mainController', function($scope,$http) {
	$scope.sortType = 'name';
	$scope.sortReverse= false;
	$scope.searchQuery = '';

	$http.get("https://api.myjson.com/bins/4fv94")
		.then(function(response) {
			$scope.mainArray = response.data;
		});

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
	}

	$scope.unarchive = function(item) {
		var index = $scope.mainArray.indexOf(item);
		$scope.mainArray[index].archived = false;
	}

	$scope.delete = function (x) {
		var index = $scope.mainArray.indexOf(x);
		$scope.mainArray.splice(index, 1);     
	};



	$scope.shownElements = 5;

	$scope.paginationLimit = function() {
		return $scope.shownElements;
	};

	$scope.showMore = function() {
		$scope.shownElements += 3;
	};


});