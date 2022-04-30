import admin from 'firebase-admin';
import { ICart } from '@/interfaces/cart.interface';
import { IProduct } from '@/interfaces/product.interface';
import logger from '@/utils/logger';

type Data = ICart | IProduct;

interface IFirebaseContainer<T extends Data> {
	getAll(): void;
	getById(id: string): void;
	save(data: T): void;
	updateById(field: string, value: string, id: string): void;
	updateAll(field: string, value: string): void;
	deleteById(id: string): void;
	deleteAll(): void;
}

class FirebaseContainer<T extends Data> implements IFirebaseContainer<T> {
	private _db: admin.firestore.Firestore;
	public query: admin.firestore.CollectionReference<admin.firestore.DocumentData>;

	constructor(db: admin.firestore.Firestore, collectionName: string) {
		this._db = db;
		this.query = this._db.collection(collectionName);
	}

	async getAll() {
		this.query
			.get()
			.then((snapshot) => {
				snapshot.forEach((doc) => {
					logger.info(doc.id, '=>', doc.data());
				});
			})
			.catch((error) => {
				logger.error('Error getting documents', error);
			});
	}

	async getById(id: string) {
		this.query
			.doc(id)
			.get()
			.then((doc) => {
				logger.info(doc.id, '=>', doc.data());
			})
			.catch((error) => {
				logger.error('Error getting document', error);
			});
	}

	async save(data: T) {
		try {
			let doc = this.query.doc();

			await doc.create(data);

			logger.info('Document created successfully');
		} catch (error) {
			logger.error(error);
		}
	}

	async updateById(field: string, value: string, id: string) {
		this.query
			.doc(id)
			.get()
			.then((doc) => {
				doc.ref.update({ [field]: value });

				logger.info('Document updated successfully');
			})
			.catch((error) => {
				logger.error('Error getting document', error);
			});
	}

	async updateAll(field: string, value: string) {
		this.query
			.get()
			.then((snapshot) => {
				snapshot.forEach((doc) => {
					doc.ref.update({ [field]: value });

					logger.info('Documents updated successfully');
				});
			})
			.catch((error) => {
				console.log('Error getting documents', error);
			});
	}

	async deleteById(id: string) {
		this.query
			.doc(id)
			.get()
			.then((doc) => {
				doc.ref.delete();

				logger.info('Document deleted successfully');
			})
			.catch((error) => {
				console.log('Error getting document', error);
			});
	}

	async deleteAll() {
		this.query
			.get()
			.then((snapshot) => {
				snapshot.forEach((doc) => {
					doc.ref.delete();
				});

				logger.info('Documents deleted successfully');
			})
			.catch((error) => {
				console.log('Error getting documents', error);
			});
	}
}

export default FirebaseContainer;
