import express from 'express';

import authMiddleware from '../middlewares/auth.middleware';

const indexRoute = express.Router();

indexRoute.get('/', authMiddleware, (req, res) => {
	res.render('form', { name: req.session.user });
});

export default indexRoute;
