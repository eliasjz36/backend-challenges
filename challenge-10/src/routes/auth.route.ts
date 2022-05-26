import express from 'express';

import { login, signup, logout } from '../controllers/auth.controller';

const authRoute = express.Router();

authRoute.get('/login', login);

authRoute.get('/signup', signup);

authRoute.get('/logout', logout);

export default authRoute;
