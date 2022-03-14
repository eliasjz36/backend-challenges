import express from 'express';
import fs from 'fs';
import products from './db.json';

const { Router } = express;

const app = express();
const router = Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router.get('/products', (req, res) => {
	res.json(products);
});

router.get('/products/:id', (req, res) => {
	if (!products.find((product) => product.id === +req.params.id))
		res.json({ error: 'product not found' });

	res.json(products.find((product) => product.id === +req.params.id));
});

router.post('/products/:id', (req, res) => {
	products.push({ ...req.body, id: req.params.id });

	fs.promises.writeFile('./src/db.json', JSON.stringify(products));

	if (!products.find((product) => product.id === +req.params.id))
		res.json({ error: 'product not found' });

	res.json(req.body);
});

router.put('/products/:id', (req, res) => {
	fs.promises.writeFile(
		'./src/db.json',
		JSON.stringify(
			products.map((product, index) => {
				if (product.id === +req.params.id) {
					product = { ...req.body, id: product.id };
				}

				return product;
			})
		)
	);

	if (!products.find((product) => product.id === +req.params.id))
		res.json({ error: 'product not found' });

	res.json(req.body);
});

router.delete('/products/:id', (req, res) => {
	fs.promises.writeFile(
		'./src/db.json',
		JSON.stringify(products.filter((product) => product.id !== +req.params.id))
	);

	if (!products.find((product) => product.id === +req.params.id))
		res.json({ error: 'product not found' });

	res.json(req.body);
});

app.use('/api', router);

app.listen(8080, () => {
	console.log('Listening on port 8080...');
});
