import { normalize, schema, denormalize } from 'normalizr';
import util from 'util';

import { Container } from '../classes';

const holding = new Container('./src/db/holding.json');
const originalData = holding.getAll();

export const normalizeHolding = () => {
	const persona = new schema.Entity('personas');

	const gerente = new schema.Entity('gerentes', {
		gerente: persona,
	});

	const encargado = new schema.Entity('encargados', {
		encargado: persona,
	});

	const empleado = new schema.Entity('empleados', {
		empleados: [persona],
	});

	const empresa = new schema.Entity('empresas', {
		gerente: gerente,
		encargado: encargado,
		empleados: [empleado],
	});

	const empresasSchema = new schema.Entity('empresasTotales', {
		empresas: [empresa],
	});

	const normalizedData = normalize(originalData, empresasSchema);
	const denormalizedData = denormalize(
		normalizedData.result,
		empresasSchema,
		normalizedData.entities,
	);
	console.log(util.inspect(normalizedData, true, 7, true), denormalizedData);

	return normalizedData;
};

export const getHoldingCompression = () => {
	const holdingStringfied = JSON.stringify(normalizeHolding());
	const originalDataStringied = JSON.stringify(originalData);
	const compressionRate = Math.round(
		((originalDataStringied.length - holdingStringfied.length) * 100) /
			originalDataStringied.length,
	);

	return compressionRate;
};
