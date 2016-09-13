var app = angular.module('myApp', ["ngRoute"]);

app.run(['$rootScope', '$location', 'AuthService', function ($rootScope, $location, AuthService) {
	$rootScope.$on('$routeChangeStart', function () {
		if (!AuthService.isLoggedIn()) {
			$location.path('/login');
		} else {
			if ($location.$$path === '/login') {
				$location.path('/');
			}
		}
	});
}]);

app.factory('AuthService', function($window, $location){
	var storage = $window.localStorage;
	return {
		login: function(name) {
			console.log("welcome, "+ name);
			storage.setItem("user", name);
			$location.path('/');
		},
		logout: function() {
			storage.removeItem("user");
			$location.path('/login');
		},
		isLoggedIn: function() {
			var user = storage.getItem('user');
			return user;
		}
	}
});

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

app.config(function($routeProvider) {
	$routeProvider
	.when("/items/add", {
		templateUrl: "templates/add.html",
		controller: "addCtrl"
	})
	.when("/items/edit/:id", {
		templateUrl: "templates/edit.html",
		controller: "editCtrl"
	})
	.when("/login", {
		templateUrl: "templates/login.html",
		controller: "loginCtrl"
	})
	.otherwise({
		templateUrl: "templates/main.html",
		controller: "mainCtrl"
	});

});

app.constant('API', 'http://localhost:3000/');
app.constant('signInData', {username: 'deimoslink',	password: 'qwerty'});




app.controller('mainController', function($scope, $location, itemsSvc, AuthService) {
	$scope.sortType = 'name';
	$scope.sortReverse= false;
	$scope.searchQuery = '';

	$scope.go = function(path) {
		$location.path(path);
	};

	$scope.logout = function() {AuthService.logout()}

	$scope.selected = false;

	// $scope.shownElements = 5;

	// $scope.paginationLimit = function() {
	// 	return $scope.shownElements;
	// };

	// $scope.showMore = function() {
	// 	$scope.shownElements += 3;
	// };
});

app.controller("mainCtrl", function($scope, $http, API, $window, itemsSvc) {
	$scope.user = $window.localStorage.user;
	$scope.delete = function (x) {
		var answer = confirm("Are you sure you want to delete the selected item?");
		if (answer) {
			$http.delete(API + 'items/' + x.id, $scope.item); //Нормально ли так делать вообще?
			var index = $scope.mainArray.indexOf(x);
			$scope.mainArray.splice(index, 1);
		};     
	};
	itemsSvc.getAll().then(function(response) {
		$scope.mainArray = response.data;
	});
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
		$scope.searchForArchivable();
	}
});

app.controller("addCtrl", function($scope, $http, API) {
	$scope.item = {archived:false};
	$scope.add = function () {
		$http.post(API + 'items/', $scope.item);
		$scope.go('/');
	};
});

app.controller("editCtrl", function($scope, $routeParams, $http, API, itemsSvc) {
	itemsSvc.get($routeParams.id).then(function(response) {
		$scope.item = response.data;
	});
	$scope.save = function () {
		var currentId = $scope.item.id;
		var index = ($scope.mainArray.findIndex(function(x){
			return x.id === currentId;
		}));
		$scope.mainArray[index] = angular.copy($scope.item, $scope.mainArray[index]);
		$http.put(API + 'items/' + $routeParams.id, $scope.item);
	};	
});

app.controller("loginCtrl", function($scope, signInData, AuthService) {

	$scope.userNameTest = function() {
		console.log($scope.username)
	}

	$scope.username;
	$scope.password;
	$scope.showMsg;
	$scope.login = function() {
		if ($scope.username === signInData.username && $scope.password === signInData.password) {
			AuthService.login($scope.username);
		} else {
			$scope.showMsg = true;
		};
	};
});