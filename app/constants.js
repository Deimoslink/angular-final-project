// module.exports = function(ngModule) {
// 	require('./hello-world/hello-world.js')(ngModule);
// };
"use strict";
export default app => {
	app.constant('API', 'http://localhost:3000/');
	app.constant('signInData', {username: 'deimoslink',	password: 'qwerty'});
};
