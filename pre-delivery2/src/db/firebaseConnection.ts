import admin from 'firebase-admin';

import logger from '@/utils/logger';

const connectToFirestore = () => {
	const serviceAccount = require('../db/clase-20-287f3-firebase-adminsdk-iopxw-ccff719cdc.json');

	admin.initializeApp({
		credential: admin.credential.cert(serviceAccount),
	});

	logger.info('Firebase database connected');
};

export default connectToFirestore;
