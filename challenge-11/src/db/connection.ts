import mongoose from 'mongoose';

import config from '../config/config';
import logger from '../utils/logger';

// Initialize connection
const connectToDatabase = async () => {
	try {
		await mongoose.connect(config.database.dbUri, {
			dbName: config.database.dbName,
		});

		logger.info('Connected to MongoDB');
	} catch (error) {
		logger.error((error as Error).message);

		process.exit(1);
	}
};

export default connectToDatabase;
