// module.exports = function(ngModule) {
// 	require('./hello-world/hello-world.js')(ngModule);
// };
"use strict";
export default app => {
	app.config(['$routeProvider', function($routeProvider) {
		$routeProvider
		.when("/main", {
			templateUrl: "templates/main.html",
			controller: "mainCtrl"
		})
		.when("/items/add", {
			templateUrl: "templates/add.html",
			controller: "addEditCtrl"
		})
		.when("/items/edit/:id", {
			templateUrl: "templates/edit.html",
			controller: "addEditCtrl"
		})
		.when("/login", {
			templateUrl: "templates/login.html",
			controller: "loginCtrl"
		})
			.otherwise({redirectTo:'/main'});

	}]);
};
