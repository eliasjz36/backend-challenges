import { Request, Response, NextFunction } from 'express';

import { RequestWithSession } from '../interfaces/auth.interface';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
	if (req.session.user) return next();

	return res.redirect('/auth/login');
};

export default authMiddleware;
