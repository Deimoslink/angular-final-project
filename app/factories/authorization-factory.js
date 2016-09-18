"use strict";
export default app => {

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

};