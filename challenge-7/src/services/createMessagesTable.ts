import config from '../config';
import knexFunc from 'knex';

const knex = knexFunc(config);

export default knex.schema
	.createTable('messages', (table) => {
		table.string('email');
		table.string('msg');
		table.date('date');
		table.increments('id');
	})
	.then(() => console.log('table created'))
	.catch((error) => {
		console.log(error);
	})
	.finally(() => {
		knex.destroy();
	});
