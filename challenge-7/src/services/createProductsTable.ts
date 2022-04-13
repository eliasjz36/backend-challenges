import config from '../config';
import knexFunc from 'knex';

const knex = knexFunc(config);

export default knex.schema
	.createTable('products', (table) => {
		table.string('title', 15);
		table.float('price');
		table.string('thumbnail');
		table.increments('id');
	})
	.then(() => console.log('table created'))
	.catch((error) => {
		console.log(error);
	})
	.finally(() => {
		knex.destroy();
	});
