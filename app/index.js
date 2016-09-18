'use strict!';

const angular = require('angular');
require('angular-route');

const app = angular.module('myApp', ["ngRoute"]);

require('./constants.js')(app);
require('./config.js')(app);
require('./directives/directives.js')(app);
require('./controllers/controllers.js')(app);
require('./factories/factories.js')(app);

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