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

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider
	.when("/main", {
		templateUrl: "templates/main.html",
		controller: "mainCtrl"
	})
	.when("/items/add", {
		templateUrl: "templates/add.html",
		controller: "newCtrl"
	})
	.when("/items/edit/:id", {
		templateUrl: "templates/edit.html",
		controller: "newCtrl"
	})
	.when("/login", {
		templateUrl: "templates/login.html",
		controller: "loginCtrl"
	})
		.otherwise({redirectTo:'/main'});

}]);

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
});

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

app.controller("newCtrl", function($scope, $routeParams, $http, API, itemsSvc, $window, $location) {
	$scope.go = function(path) {
		$location.path(path);
	};
	$scope.names = ["John", "Abigale", "Chris", "Robert", "Alexander", "Mitchel", "Dimitry"];
	$scope.user = $window.localStorage.user;
	$("[name='courseTitle'], [name='courseAuthor']").inputmask("Regex", {regex: "[0-9,a-z,A-Z_]*"});
	$("[name='courseDuration']").inputmask("hh:mm:ss", { alias: "date", "placeholder": " "});
	
	if(window.location.href.indexOf("edit") > -1) {
		console.log("editing mode");
		itemsSvc.get($routeParams.id).then(function(response) {
			$scope.item = response.data;
		});
	} else {
		console.log("adding mode");
		$scope.item = {archived:false};
	}
	$scope.add = function () {
		$http.post(API + 'items/', $scope.item).then(function() {
			$scope.go('/');
		});
	};
	$scope.save = function () {
		$http.put(API + 'items/' + $routeParams.id, $scope.item).then(function() {
			$scope.go('/');
		});
	};
});

app.controller("loginCtrl", function($scope, signInData, AuthService) {
	$("[name='username'], [name='password']").inputmask("Regex", {regex: "[0-9,a-z,A-Z_]*"});
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

app.directive("appHeader", function(AuthService, $window){
	var headerDir = {
		restrict: "E",
		templateUrl: "templates/header.html",
		replace: true,
		scope: {},
		link: function($scope){
			$scope.user = $window.localStorage.user;
			$scope.logout = function() {
				AuthService.logout();
			}
		}
	}
	return headerDir;
});
