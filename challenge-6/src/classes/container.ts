const fs = require('fs');
import { IProduct, IProducts } from '../types/interfaces';

/** A base class for handling files in our application. */
export class Container {
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
	 * A public method that receives an object, stores it in the file and then returns the assigned id.
	 *
	 * @param message A new object
	 * @returns The object id
	 */
	async save(message): Promise<number> {
		try {
			const messages = fs.existsSync(this.filePath) ? this.getAll() : [];
			const id = messages.length + 1;

			if (messages) messages.push({ ...message, id });

			await fs.promises.writeFile(this.filePath, JSON.stringify(messages));

			console.log('The file has been successfully saved');

			return id;
		} catch (error) {
			throw new Error('It was not possible to save the file');
		}
	}

	/**
	 * A public method that receives an id and returns the object that has that id if it exists.
	 *
	 * @param id The object id
	 * @returns The object with that id or null if there is no object with that id
	 */
	getById(id: number): IProducts | null {
		try {
			const products: IProducts[] = this.getAll();

			return products.find((product) => product.id === id) || null;
		} catch (error) {
			throw new Error(
				`We were unable to obtain the product because the file was not available`
			);
		}
	}

	/** A public method that returns an array with all objects in the file. */
	getAll() {
		try {
			return JSON.parse(fs.readFileSync(this.filePath, 'utf-8') || '[]');
		} catch (error) {
			throw new Error('That location does not contain such a file');

			console.log(error);
		}
	}

	/**
	 * A public method that receives an id and removes of the file the object that has that id if it exists
	 *
	 * @param id The object id
	 */
	async deleteById(id: number): Promise<void> {
		try {
			const products: IProducts[] = this.getAll();
			if (products.find((product: IProducts) => product.id === id)) {
				const newProducts: IProducts[] = products.filter(
					(product) => product.id !== id
				);

				await fs.promises.writeFile(this.filePath, JSON.stringify(newProducts));

				console.log('The product has been deleted successfully');
			} else console.log(`There is no product with the id ${id}`);
		} catch (error) {
			throw new Error(
				'It was not possible to delete the product because the file does not exist'
			);

			console.log(error);
		}
	}

	/** A public method that removes all objects in the file. */
	async deleteAll(): Promise<void> {
		try {
			if (fs.existsSync(this.filePath)) {
				await fs.promises.writeFile(this.filePath, '');

				console.log('The products has been deleted successfully');
			} else {
				throw new Error('¡Ups!');
			}
		} catch (error) {
			throw new Error(
				'It was not possible to delete the products because the file does not exist'
			);

			console.log(error);
		}
	}
}
