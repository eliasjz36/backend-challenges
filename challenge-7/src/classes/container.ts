import knexFunc, { Knex } from 'knex';

import type { Message, Product, Config } from '../global/interfaces';

type Obj = Message | Product;

interface IContainer<T extends Obj> {
	save(data: T[]): void;
	update(updRow: T, rowId: number): void;
	getById(rowId: number): void;
	getAll(): Promise<T[]>;
	deleteById(rowId: number): void;
	deleteAll(): void;
}

/** A base class for handling tables in our application. */
export class Container<T extends Obj> implements IContainer<T> {
	readonly knex: Knex;

	/**
	 * The constructor of the `Container` class
	 *
	 * @param knexConfig The knex configuration object
	 * @param tableName The table name
	 */
	constructor(public knexConfig: Config, public tableName: string) {
		this.knex = knexFunc(knexConfig);
	}

	/**
	 * A public method that receives an object and stores it in the table.
	 *
	 * @param data New data
	 */

	save(data: T[]): void {
		this.knex(this.tableName)
			.insert(data)
			.then(() => console.log('data inserted'))
			.catch((error) => console.log(error.sqlMessage))
			.finally(() => {
				this.knex.destroy();
			});
	}

	/**
	 * A public method that receives an object and an object id and update the object with that id.
	 *
	 * @param updRow Updated row
	 * @param rowId Row Id
	 */
	update(updRow: T, rowId: number): void {
		this.knex(this.tableName)
			.where({ id: rowId })
			.update(updRow)
			.then(() => {
				console.log('row updated');
			})
			.catch((error) => {
				console.log(error.sqlMessage);
			})
			.finally(() => {
				this.knex.destroy();
			});
	}

	/**
	 * A public method that receives a row id and print the object with that id.
	 *
	 * @param rowId The row id
	 */
	getById(rowId: number): void {
		this.knex
			.from(this.tableName)
			.where({ id: rowId })
			.then((row) => {
				console.log(row);
			})
			.catch((error) => {
				console.log(error.sqlMessage);
			})
			.finally(() => {
				this.knex.destroy();
			});
	}

	/** A public method that get all rows from the table and print them to the console. */
	async getAll(): Promise<T[]> {
		const rows = await this.knex.from(this.tableName).select('*');
		return rows;
	}

	/**
	 * A public method that receives a row id and removes it from the table.
	 *
	 * @param rowId The row id
	 */
	deleteById(rowId: number): void {
		this.knex(this.tableName)
			.where({ id: rowId })
			.del()
			.then(() => {
				console.log('row deleted');
			})
			.catch((error) => {
				console.log(error.sqlMessage);
			})
			.finally(() => {
				this.knex.destroy();
			});
	}

	/** A public method that removes all rows from the table. */
	deleteAll(): void {
		this.knex(this.tableName)
			.del()
			.then(() => {
				console.log('rows deleted');
			})
			.catch((error) => {
				console.log(error.sqlMessage);
			})
			.finally(() => {
				this.knex.destroy();
			});
	}
}
