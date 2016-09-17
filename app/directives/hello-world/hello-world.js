"use strict";
// module.exports = function(ngModule) {
export default app => {
	app.directive('helloWorld', helloWorldFn);

	function helloWorldFn() {
		return {
			restrict: 'E',
			scope: {},
			template: require('./hello-world.html'),
			controllerAs: 'vm',
			controller: function() {
				const vm = this;
				vm.greeting = 'ES6 test';
			}
		}
	}
};