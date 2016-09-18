"use strict";
// module.exports = function(ngModule) {
export default app => {

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
	
};