import { IProduct } from './product.interface';

export interface ICart {
	id?: string;
	timestamp?: number;
	products: IProduct[];
}
