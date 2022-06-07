import express from 'express';

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

export default indexRoute;
