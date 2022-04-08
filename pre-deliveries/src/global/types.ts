export interface Product {
	id?: string;
	timestamp?: number;
	name: string;
	description: string;
	code: string;
	photo: string;
	price: number;
	stock: number;
}

export interface Cart {
	id?: string;
	timestamp?: number;
	products: Product[];
}
