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
	 * @param name An string
	 * @returns The object id
	 */
	async save(name: string): Promise<number> {
		try {
			const users = fs.existsSync(this.filePath) ? this.getAll() : [];
			const id = users.length + 1;

			if (users) users.push({ name, id });

			await fs.promises.writeFile(this.filePath, JSON.stringify(users));

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
		}
	}
}
