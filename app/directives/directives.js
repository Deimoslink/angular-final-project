// module.exports = function(ngModule) {
// 	require('./hello-world/hello-world.js')(ngModule);
// };
"use strict";
export default app => {
	require('./header/header.js')(app);
	console.log("comes from directives");
};
