import { Request, Response } from 'express';

import logger from '../utils/logger';

// login
export const getLogin = (req: Request, res: Response) => {
	if (req.isAuthenticated()) {
		const user = req.user;

		logger.info('user logged');

		res.render('form', { name: user.email });
	} else {
		logger.info('user not logged');

		res.render('login');
	}
};

export const postLogin = (req: Request, res: Response) => {
	const user = req.user;

	res.render('form', { name: user.email });
};

// signup
export const getSignup = (req: Request, res: Response) => {
	res.render('signup');
};

export const postSignup = (req: Request, res: Response) => {
	const user = req.user;

	res.render('form', { name: user.email });
};

// logout
export const logout = (req: Request, res: Response) => {
	if (!req.session.user) return res.redirect('/auth/login');

	const name = req.session.user;

	req.session.destroy((error) => {
		if (!error) {
			res.render('logout', { name });
		} else res.send({ status: 'Logout error', body: error.message });
	});
};
