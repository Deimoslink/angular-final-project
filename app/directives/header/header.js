"use strict";
// module.exports = function(ngModule) {
export default app => {
	app.directive('appHeader', function(AuthService, $window){
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
};