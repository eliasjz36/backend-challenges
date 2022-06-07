import 'dotenv/config';

export default {
	database: {
		dbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/challenge-11',
		dbName: process.env.MONGODB_DB_NAME || 'challenge-11',
		dbUser: process.env.MONGODB_USER || '',
		dbPassword: process.env.MONGODB_PASSWORD || '',
	},
};
