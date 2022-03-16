import express from 'express';
import fs from 'fs';
import { Container } from './classes';

const { Router } = express;

const app = express();
const router = Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const container = new Container(__dirname + '/files/products.json');

app.get('/', (req, res) => {
	res.sendFile(
		'C:/Users/sebuc/OneDrive/Documentos/Elias/CoderHouse/backend/backend-challenges/challenge-4/public/index.html'
	);
});

router.get('/products', (req, res) => {
	const products = container.getAll();

	res.json(products);
});

router.get('/products/:id', (req, res) => {
	const product = container.getById(+req.params.id);

	if (!product) res.json({ error: 'product not found' });

	res.json(product);
});

router.post('/products', (req, res) => {
	container.save(req.body).then((id) => res.json({ ...req.body, id }));
});

router.put('/products/:id', (req, res) => {
	const product = container.getById(+req.params.id);

	if (!product) res.json({ error: 'product not found' });

	const products = container.getAll();

	fs.promises.writeFile(
		'./src/files/products.json',
		JSON.stringify(
			products.map((product, index) => {
				if (product.id === +req.params.id) {
					product = { ...req.body, id: product.id };
				}

				return product;
			})
		)
	);

	res.json(req.body);
});

router.delete('/products/:id', (req, res) => {
	const product = container.getById(+req.params.id);

	if (!product) res.json({ error: 'product not found' });

	const products = container.getAll();

	fs.promises.writeFile(
		'./src/db.json',
		JSON.stringify(products.filter((product) => product.id !== +req.params.id))
	);
	container.deleteById(+req.params.id);

	res.json(req.body);
});

app.use('/api', router);

app.listen(8080, () => {
	console.log('Listening on port 8080...');
});
