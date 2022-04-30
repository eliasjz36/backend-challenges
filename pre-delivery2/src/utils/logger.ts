import Logger from 'pino';

const logger = Logger({
	prettyPrint: true,
	base: {
		paid: false,
	},
});

export default logger;
