import { ReturnModelType } from '@typegoose/typegoose';
import { BeAnObject } from '@typegoose/typegoose/lib/types';

import MongoDBContainer from '../services/mongodb.service';
import { IUser } from '../interfaces/user.interfaces';
import { User } from '../models/user.model';

class UserDao extends MongoDBContainer<IUser> {
	constructor(public model: ReturnModelType<typeof User, BeAnObject>) {
		super(model);
	}
}

export default UserDao;
