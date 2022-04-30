import { connect } from 'mongoose';

import config from '@config/mongodb.config';
import logger from '@/utils/logger';

// Initialize connection
const connectToDatabase = async () => {
	try {
		await connect(config.dbUri, { dbName: config.dbName });

		logger.info('Connected to MongoDB');
	} catch (error) {
		logger.error((error as Error).message);

		process.exit(1);
	}
};

export default connectToDatabase;
