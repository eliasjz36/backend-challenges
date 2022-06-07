import UserModel from '../models/user.model';
import MessageModel from '../models/message.model';

import UserDao from './user.dao';
import MessageDao from './message.dao';

const mongodbUser = new UserDao(UserModel);
const mongodbMessage = new MessageDao(MessageModel);

export { mongodbUser, mongodbMessage };
