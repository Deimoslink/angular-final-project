"use strict";
export default app => {
	require('./authorization-factory.js')(app);
	require('./items-service-factory.js')(app);
	console.log("comes from factories");
};