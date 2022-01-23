import express from 'express';
import helmet from 'helmet';
import http from 'http';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import logger from './helpers/config/logger.js';
import routes from './routes/index.routes.js';
import { SERVER } from './helpers/config/config.js';
import { Server as SocketServer } from 'socket.io';

export default class Server {
	constructor() {
		this.app = express();
		this.app.use(express.urlencoded({ extended: false }));
		this.app.use(express.json({ limit: '50mb' }));
		this.app.use(helmet());
		this.app.use(cookieParser());
		//  TO DO
		this.app.use(cors());
		this.namespace = 'SERVER';

		this.app.use((req, res, next) => {
			res.on('finish', () => {
				logger.info(req.baseUrl, req.baseUrl);
				// logger.info(`${moment().format('DD MMM YYYY HH:MM:ss')}, Method: ${req.method}, ENDPOINT: ${req.baseUrl}`);
			});
			next();
		});

		this.app.use((req, res, next) => {
			// On later stage have specify the domains that are allowed to communicate with the server
			res.header('Content-type', 'application/json');
			res.header('Access-Control-Allow-Origin', '*');
			res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
			// To think for Api name
			res.header('X-Powered-By', 'RestApi');
			if (req.method === 'OPTIONS') {
				res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
				return res.status(200).json({});
			}
			next();
		});
	}

	async applyingRoutes() {
		logger.info('Applying routes');

		this.app.use('/api', routes);
		this.app.use((req, res, next) => {
			const error = new Error('Url not found!');
			return res.status(404).json({
				message: error.message
			});
		});

		logger.info('Routes applied successfully');
	}

	runSockets() {
		const io = new SocketServer();
		logger.info('Applying sockets');

		io.on('connection', (socket) => {
			logger.info('a user connected');
		});
	}

	start() {
		const httpServer = http.createServer(this.app);
		httpServer.listen(SERVER.PORT, () => logger.info(`Server running on port ${SERVER.HOSTNAME}:${SERVER.PORT}`));
	}
}
