import { Message } from '../interfaces/user.interfaces';

const fs = require('fs');

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
	async save(message: Message): Promise<number> {
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

	/** A public method that returns an array with all objects in the file. */
	getAll() {
		try {
			return JSON.parse(fs.readFileSync(this.filePath, 'utf-8') || '[]');
		} catch (error) {
			throw new Error('That location does not contain such a file');

			console.log(error);
		}
	}
}
