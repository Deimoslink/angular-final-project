"use strict";
export default app => {

	app.controller("addEditCtrl", function($scope, $routeParams, $http, API, itemsSvc, $window, $location) {
		$scope.go = function(path) {
			$location.path(path);
		};
		$scope.names = ["John", "Abigale", "Chris", "Robert", "Alexander", "Mitchel", "Dimitry"];
		$scope.user = $window.localStorage.user;
		$("[name='courseTitle'], [name='courseAuthor']").inputmask("Regex", {regex: "[0-9,a-z,A-Z_ ]*"});
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

};