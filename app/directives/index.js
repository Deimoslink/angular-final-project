// module.exports = function(ngModule) {
// 	require('./hello-world/hello-world.js')(ngModule);
// };
"use strict";
export default app => {
	require('./hello-world/hello-world.js')(app);
};