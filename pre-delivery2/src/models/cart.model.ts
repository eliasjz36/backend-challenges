import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose';

import { ICart } from '@/interfaces/cart.interface';

@modelOptions({ schemaOptions: { collection: 'carts', timestamp: true } })
export class Cart {
	@prop({ type: String, required: true })
	public carts: ICart[];
}

const CartModel = getModelForClass(Cart);

export default CartModel;
