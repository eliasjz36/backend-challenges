import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose';

@modelOptions({ schemaOptions: { collection: 'products', timestamp: true } })
export class Product {
	@prop({ type: String, required: true })
	public name: string;

	@prop({ type: String, required: true })
	public description: string;

	@prop({ type: String, required: true, unique: true })
	public code: string;

	@prop({ type: String, required: true })
	public photo: string;

	@prop({ type: Number, required: true })
	public price: number;

	@prop({ type: Number, required: true })
	public stock: number;
}

const ProductModel = getModelForClass(Product);

export default ProductModel;
