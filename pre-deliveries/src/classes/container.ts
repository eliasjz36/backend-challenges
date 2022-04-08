import fs from 'fs';
import { Cart, Product } from '../global/types';

type Obj = Cart | Product;

interface IContainer<T extends Obj> {
	save(objs: T[], objId: string): Promise<T>;
	update(updObj: T, objId: string): Promise<T>;
	getById(id: string): T;
	getAll(): T[];
	deleteById(objId: string, objs: T[]): Promise<T[]>;
	deleteCartProductById(
		productId: string,
		carts: Cart[],
		cartToUpdate: Cart
	): Promise<Product[]>;
	deleteAll(): Promise<void>;
}

/** A base class for handling files in our application. */
export class Container<T extends Obj> implements IContainer<T> {
	/** A public property that can be reassigned. */
	filePath: string;

	/**
	 * The constructor of the `Customer` class
	 *
	 * @param filePath The path of the file
	 */
	constructor(filePath: string) {
		this.filePath = filePath;
	}

	/**
	 * A public method that receives an object, stores it in the file and then returns the obj.
	 *
	 * @param objs Objects
	 * @param objId Object Id
	 * @returns The object
	 */

	async save(objs: T[], objId: string): Promise<T> {
		try {
			await fs.promises
				.writeFile(
					this.filePath,
					JSON.stringify(fs.existsSync(this.filePath) ? objs : '[]')
				)
				.then(() => {
					console.log('The file has been successfully saved');
				});

			return this.getById(objId!);
		} catch (error) {
			throw new Error('It was not possible to save the file');
		}
	}

	/**
	 * A public method that receives an object, stores it in the file and then returns the obj.
	 *
	 * @param updObj Updated object
	 * @param objId Object Id
	 * @returns The object
	 */
	async update(updObj: T, objId: string): Promise<T> {
		try {
			const objs = this.getAll();
			const index = objs.findIndex((obj: T) => objId == obj.id);

			objs[index] = { ...objs[index], ...updObj };

			return await fs.promises
				.writeFile(this.filePath, JSON.stringify(objs))
				.then(() => {
					console.log('The file has been successfully saved');

					return objs[index];
				});
		} catch (error) {
			throw new Error('It was not possible to save the file');
		}
	}

	/**
	 * A public method that receives an id and returns the object that has that id if it exists.
	 *
	 * @param id The object id
	 * @returns The object with that id if there is an object with that id
	 */
	getById(id: string): T {
		try {
			const objs: T[] = this.getAll();
			const obj = objs.find((obj: T) => obj.id === id);

			if (obj) return obj;

			throw new Error(`There is no object with the id ${id}`);
		} catch (error) {
			throw new Error((error as Error).message);
		}
	}

	/** A public method that returns an array with all objects in the file. */
	getAll(cart?: Cart): T[] {
		try {
			if (cart)
				return JSON.parse(fs.readFileSync(this.filePath, 'utf-8') || '[]')
					.products;

			return JSON.parse(fs.readFileSync(this.filePath, 'utf-8') || '[]');
		} catch (error) {
			console.log((error as Error).message);

			throw new Error('That location does not contain such a file');
		}
	}

	/**
	 * A public method that receives an id and an objects array and removes of the file the object that has that id if it exists
	 *
	 * @param objId The object id
	 * @param objId The objects array
	 */
	async deleteById(objId: string, objs: T[]): Promise<T[]> {
		try {
			if (objs.find((obj: T) => obj.id === objId)) {
				const nObjs: T[] = objs.filter((obj) => obj.id !== objId);

				return await fs.promises
					.writeFile(this.filePath, JSON.stringify(nObjs))
					.then(() => {
						console.log('The object has been deleted successfully');

						return nObjs;
					});
			} else throw new Error(`There is no object with the id ${objId}`);
		} catch (error) {
			throw new Error((error as Error).message);
		}
	}

	async deleteCartProductById(
		productId: string,
		carts: Cart[],
		cartToUpdate: Cart
	): Promise<Product[]> {
		try {
			if (
				cartToUpdate.products.find(
					(product: Product) => product.id === productId
				)
			) {
				const newProducts: Product[] = cartToUpdate.products.filter(
					(product) => product.id !== productId
				);
				const cartIndex = carts.findIndex(
					(cart) => cart.id === cartToUpdate.id
				);

				cartToUpdate.products = newProducts;
				carts[cartIndex] = cartToUpdate;

				return await fs.promises
					.writeFile(this.filePath, JSON.stringify(carts))
					.then(() => {
						console.log('The object has been deleted successfully');

						return newProducts;
					});
			} else throw new Error(`There is no object with the id ${productId}`);
		} catch (error) {
			throw new Error((error as Error).message);
		}
	}

	/** A public method that removes all objects in the file. */
	async deleteAll(): Promise<void> {
		try {
			if (fs.existsSync(this.filePath)) {
				await fs.promises.writeFile(this.filePath, '[]').then(() => {
					console.log('The products has been deleted successfully');
				});
			} else {
				throw new Error(
					'It was not possible to delete the products because the file does not exist'
				);
			}
		} catch (error) {
			console.log((error as Error).message);
		}
	}
}
