"use strict";
export default app => {
	require('./main-controller.js')(app);
	require('./add-edit-controller.js')(app);
	require('./login-controller.js')(app);
	console.log("comes from controllers");
};