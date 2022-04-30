import { BeAnObject, ReturnModelType } from '@typegoose/typegoose/lib/types';

import { ICart } from '@/interfaces/cart.interface';
import { IProduct } from '@/interfaces/product.interface';
import logger from '@/utils/logger';

type Data = ICart | IProduct;

interface IMongoDBContainer<T extends Data> {
	getAll(): void;
	getById(id: string): void;
	saveOne(data: T): void;
	saveMany(data: T[]): void;
	updateById(field: string, value: string, id: string): void;
	updateAll(field: string, value: string): void;
	deleteById(id: string): void;
	deleteAll(): void;
}

class MongoDBContainer<T extends Data> implements IMongoDBContainer<T> {
	public model: ReturnModelType<any, BeAnObject>;

	constructor(model: ReturnModelType<any, BeAnObject>) {
		this.model = model;
	}

	async getAll() {
		try {
			const docs = await this.model.find();
			logger.info(docs);
		} catch (error) {
			logger.error('Error getting documents', error);
		}
	}

	async getById(id: string) {
		try {
			const doc = await this.model.find({ id });

			logger.info(doc);
		} catch (error) {
			logger.error('Error getting document', error);
		}
	}

	async saveOne(data: T) {
		try {
			await this.model.create(data);

			logger.info('Document saved successfully');
		} catch (error) {
			logger.error(error);
		}
	}

	async saveMany(data: T[]) {
		try {
			await this.model.create(data);

			logger.info('Documents saved successfully');
		} catch (error) {
			logger.error(error);
		}
	}

	async updateById(field: string, value: string, id: string) {
		try {
			await this.model.updateOne({ id }, { $set: { [field]: value } });

			logger.info('Document updated successfully');
		} catch (error) {
			logger.error('Error updating document', error);
		}
	}

	async updateAll(field: string, value: string) {
		try {
			await this.model.updateMany({}, { $set: { [field]: value } });

			logger.info('Documents updated successfully');
		} catch (error) {
			logger.error('Error updating documents', error);
		}
	}

	async deleteById(id: string) {
		try {
			await this.model.deleteOne({ id });

			logger.info('Document deleted successfully');
		} catch (error) {
			logger.error('Error deleting document', error);
		}
	}

	async deleteAll() {
		try {
			await this.model.deleteMany();

			logger.info('Document deleted successfully');
		} catch (error) {
			logger.error('Error deleting documents', error);
		}
	}
}

export default MongoDBContainer;
