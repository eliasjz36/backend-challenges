import Logger from 'pino';

const logger = Logger({
	transport: {
		target: 'pino-pretty',
	},
});

export default logger;
