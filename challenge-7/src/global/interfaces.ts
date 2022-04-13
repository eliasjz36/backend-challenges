export interface Product {
	title: string;
	price: number;
	thumbnail: string;
	id?: number;
}

export interface Message {
	email: string;
	msg: string;
	date?: Date;
	id?: number;
}

export interface Config {
	client: string;
	connection: {
		host: string;
		user: string;
		password: string;
		database: string;
	};
}
