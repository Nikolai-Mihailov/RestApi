import Server from './src/server.js';
const server = new Server();

// To do server logs on errors
// process.on("unhandledRejection", (reason, promise) => {
//   console.log("Unhandled Rejection at:", promise, "reason:", reason);
// Application specific logging, throwing an error, or other logic here

process.on('uncaughtExceptionMonitor', (err, origin) => {
	console.log('uncaughtExceptionMonitor:', err);
});

(async () => {
	console.log('Starting the server');
	server.applyingRoutes();
	server.runSockets();
	server.start();
})();
