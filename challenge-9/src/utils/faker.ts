import { faker } from '@faker-js/faker';

export const generateProduct = () => {
	const product = {
		id: faker.database.mongodbObjectId(),
		title: faker.commerce.product(),
		price: faker.commerce.price(),
		thumbnail: faker.image.fashion(),
	};

	return product;
};

export const generateProducts = (quant: number) => {
	const products = [];

	for (let i = 0; i < quant; i++) {
		products.push(generateProduct());
	}

	return products;
};
