import winston from 'winston';

const { format, transports } = winston;

const logger = winston.createLogger({
	format: format.combine(
		format.simple(),
		format.timestamp({
			format: 'DD MMM YYYY HH:mm:ss'
		}),
		format.printf((info) => `[${info.timestamp}] ${info.level}, ${info.message}`)
	),
	transports: [
		new transports.File({ filename: 'src/helpers/files/info.log', level: 'info', handleExceptions: true, json: true }),
		new transports.File({ filename: 'src/helpers/files/error.log', level: 'error', handleExceptions: true }),
		new transports.File({ filename: 'src/helpers/files/warn.log', level: 'warn', handleExceptions: true })
	]
});

if (process.env.NODE_ENV !== 'production') {
	logger.add(
		new winston.transports.Console({
			format: format.combine(
				format.simple(),
				format.timestamp({
					format: 'DD MMM YYYY HH:mm:ss'
				}),
				format.printf((info) => `[${info.timestamp}] ${info.level}, ${info.message}`)
			)
		})
	);
}

export default logger;
