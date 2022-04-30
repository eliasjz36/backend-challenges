import { ReturnModelType } from '@typegoose/typegoose';
import { BeAnObject } from '@typegoose/typegoose/lib/types';

import MongoDBContainer from '@/containers/mongodb.container';
import { IProduct } from '@/interfaces/product.interface';
import { Product } from '@/models/product.model';

class ProductDaoMongoDB extends MongoDBContainer<IProduct> {
	constructor(public model: ReturnModelType<typeof Product, BeAnObject>) {
		super(model);
	}
}

export default ProductDaoMongoDB;
