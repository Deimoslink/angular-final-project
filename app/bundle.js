/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	var app = angular.module('myApp', ["ngRoute"]);

	app.config(function($routeProvider) {
		$routeProvider
		.when("/test", {
			templateUrl: "test.html"
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
		$scope.render = "table";

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

		$scope.addNew = function () {
			$scope.render = "addition";
		};

		$scope.cancel = function () {
			$scope.render = "table";
		};

		$scope.shownElements = 5;

		$scope.paginationLimit = function() {
			return $scope.shownElements;
		};

		$scope.showMore = function() {
			$scope.shownElements += 3;
		};


	});

/***/ }
/******/ ]);