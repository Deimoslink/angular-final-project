"use strict";
export default app => {

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
	
};