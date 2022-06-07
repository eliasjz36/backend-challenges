import { ReturnModelType } from '@typegoose/typegoose';
import { BeAnObject } from '@typegoose/typegoose/lib/types';

import MongoDBContainer from '../services/mongodb.service';
import { IMessage } from '../interfaces/mesage.interfaces';
import { Message } from '../models/message.model';

class MessageDao extends MongoDBContainer<IMessage> {
	constructor(public model: ReturnModelType<typeof Message, BeAnObject>) {
		super(model);
	}
}

export default MessageDao;
