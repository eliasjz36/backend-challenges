import express from 'express';
import bcrypt from 'bcrypt';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import {
	getLogin,
	postLogin,
	getSignup,
	postSignup,
	logout,
} from '../controllers/auth.controller';
import logger from '../utils/logger';
import UserModel from '../models/user.model';

const isValidPassword = (user, password) =>
	bcrypt.compareSync(password, user.password);

const createHash = (password) =>
	bcrypt.hashSync(password, bcrypt.genSaltSync(10));

passport.use(
	'login',
	new LocalStrategy((email, password, done) => {
		UserModel.findOne({ email }, (err, user) => {
			if (err) return done(err);

			if (!user) {
				console.log('User not found with email ' + email);

				return done(null, false);
			}

			if (!isValidPassword(user, password)) {
				console.log('Invalid password');

				return done(null, false);
			}

			return done(null, user);
		});
	}),
);

passport.use(
	'signup',
	new LocalStrategy(
		{ passReqToCallback: true },
		(req, email, password, done) => {
			UserModel.findOne({ email: email }, (err, user) => {
				if (err) {
					logger.error(`Error in SignUp: ${err}`);

					return done(err);
				}

				if (user) {
					console.log('User already exists with email: ' + email);

					return done(null, false);
				}

				const newUser = {
					email: req.body.email,
					password: createHash(password),
				};

				UserModel.create(newUser, (err, userWithId) => {
					if (err) {
						logger.error(`Error in saving user: ${err}`);

						return done(err);
					}

					logger.info(user);
					logger.info('User registration successful');

					return done(null, userWithId);
				});
			});
		},
	),
);

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	UserModel.findById(id, done);
});

const authRoute = express.Router();

// login
authRoute.get('/login', getLogin);
authRoute.post(
	'/login',
	passport.authenticate('login', { failureRedirect: '/faillogin' }),
	postLogin,
);

// signup
authRoute.get('/login', getLogin);
authRoute.post(
	'/signup',
	passport.authenticate('signup', { failureRedirect: '/failsignup' }),
	postSignup,
);

authRoute.get('/logout', logout);

export default authRoute;
