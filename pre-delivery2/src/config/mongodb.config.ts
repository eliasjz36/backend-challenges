import 'dotenv/config';

const config = {
	dbUri: process.env.DB_URI || 'mongodb://localhost:27017/api',
	dbName: process.env.DB_NAME || 'myFirstDatabase',
};

export default config;
