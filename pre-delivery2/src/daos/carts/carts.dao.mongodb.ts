import { ReturnModelType } from '@typegoose/typegoose';
import { BeAnObject } from '@typegoose/typegoose/lib/types';

import MongoDBContainer from '@/containers/mongodb.container';
import { ICart } from '@/interfaces/cart.interface';
import { Cart } from '@/models/cart.model';

class CartDaoMongoDB extends MongoDBContainer<ICart> {
	constructor(public model: ReturnModelType<typeof Cart, BeAnObject>) {
		super(model);
	}
}

export default CartDaoMongoDB;
