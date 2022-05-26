import { Request, Response } from 'express';

import { Container } from '../classes';
import { User } from '../interfaces/user.interface';

const usersContainer = new Container('./src/db/users.json');

export const login = (req: Request, res: Response) => {
	if (req.session.user) return res.redirect('/');

	const name = req.query.name;

	if (name && typeof name === 'string') {
		const userExists = usersContainer
			.getAll()
			.find((user: User) => user.name === name);

		if (userExists) {
			req.session.user = name;

			return res.redirect('/');
		} else return res.redirect('/auth/signup');
	}

	res.render('login');
};

export const signup = (req: Request, res: Response) => {
	if (req.session.user) return res.redirect('/');

	const name = req.query.name;

	if (name && typeof name === 'string') {
		const userExists = usersContainer
			.getAll()
			.find((user: User) => user.name === name);

		if (userExists) return res.redirect('/auth/login');
		else {
			req.session.user = name;

			usersContainer.save(name);

			return res.redirect('/');
		}
	}

	res.render('signup');
};

export const logout = (req: Request, res: Response) => {
	if (!req.session.user) return res.redirect('/auth/login');

	const name = req.session.user;

	req.session.destroy((error) => {
		if (!error) {
			res.render('logout', { name });
		} else res.send({ status: 'Logout error', body: error.message });
	});
};
