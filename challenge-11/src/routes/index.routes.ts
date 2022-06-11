import { fork } from 'child_process';
import express from 'express';
import yargs from 'yargs';

import authMiddleware from '../middlewares/auth.middleware';

const indexRoute = express.Router();

indexRoute.get('/', authMiddleware, (req, res) => {
	res.render('form', { name: req.session.user });
});

indexRoute.get('/faillogin', (req, res) => {
	res.render('faillogin', { text: 'User error login ' });
});

indexRoute.get('/failsignup', (req, res) => {
	res.render('failsignup', { text: 'User error sign up ' });
});

indexRoute.get('/info', (req, res) => {
	const info = {
		inputArgs: yargs.argv,
		os: process.platform,
		nodeVersion: process.version,
		rss: process.memoryUsage().rss,
		execPath: process.execPath,
		processId: process.pid,
		projectFolder: process.cwd(),
	};

	res.render('info', { info });
});

indexRoute.get('/api/randoms', (req, res) => {
	const genRandomNumbers = fork('./src/utils/genRandomNumbers.js');

	const cant = req.query.cant || 100000000;

	genRandomNumbers.send(cant);

	genRandomNumbers.on('message', (data) => {
		res.json(data);
	});
});
export default indexRoute;
