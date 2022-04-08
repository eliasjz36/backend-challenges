import express, {
	NextFunction,
	Router,
	Express,
	Response,
	Request,
} from 'express';
import { Container } from './classes';
import { Cart, Product } from './global/types';
import cors from 'cors';

interface Error {
	name: string;
	message: string;
	stack?: string;
	status?: number;
	code?: number;
}

const app: Express = express();

const productsRouter = Router();
const cartRouter = Router();

const productsContainer = new Container<Product>('./src/db/products.json');
const cartsContainer = new Container<Cart>('./src/db/carts.json');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// PRODUCT ROUTER

productsRouter.get(
	'/:id?',
	(req: Request, res: Response, next: NextFunction) => {
		const id = req.params.id;

		res.json(id ? productsContainer.getById(id) : productsContainer.getAll());
	}
);

productsRouter.post('/', (req: Request, res: Response) => {
	const isAdmin = req.query.isAdmin;

	if (isAdmin !== 'true') res.send({ message: 'You must be an admin' });
	else {
		const products = productsContainer.getAll();
		const id = Math.floor(Date.now() * Math.random()).toString();
		const timestamp = Date.now();
		const newProduct = { ...req.body, id, timestamp };

		if (products) products.push(newProduct);

		productsContainer.save(products, id).then((product) => {
			res.json(product);
		});
	}
});

productsRouter.put(
	'/:id',
	(req: Request, res: Response, next: NextFunction) => {
		const isAdmin = req.query.isAdmin;

		if (isAdmin !== 'true') res.send({ message: 'You must be an admin' });
		else {
			const id = req.params.id;
			const updProduct = req.body;

			productsContainer.update(updProduct, id).then((product) => {
				res.json(product);
			});
		}
	}
);

productsRouter.delete(
	'/:id',
	(req: Request, res: Response, next: NextFunction) => {
		const isAdmin = req.query.isAdmin;

		if (isAdmin !== 'true') res.send({ message: 'You must be an admin' });
		else {
			const id = req.params.id;
			const products = productsContainer.getAll();

			productsContainer
				.deleteById(id, products)
				.then((products) => {
					res.json({ message: `Product with id ${id} deleted`, products });
				})
				.catch((err) => {
					next(err);
				});
		}
	}
);

// CART ROUTER

cartRouter.post('/', (req: Request, res: Response) => {
	const carts = cartsContainer.getAll();
	const id = Math.floor(Date.now() * Math.random()).toString();
	const timestamp = Date.now();
	const newCart = { ...req.body, id, timestamp };

	if (carts) carts.push(newCart);

	cartsContainer.save(carts, id).then((cart) => {
		res.json({ id: cart.id });
	});
});

cartRouter.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
	const id = req.params.id;
	const carts = cartsContainer.getAll();

	cartsContainer
		.deleteById(id, carts)
		.then((carts) => {
			res.json({ message: `Cart with id ${id} deleted`, carts });
		})
		.catch((err) => {
			next(err);
		});
});

cartRouter
	.route('/:id/products')
	.get((req: Request, res: Response) => {
		const cartProducts = cartsContainer.getById(req.params.id);

		res.json(cartProducts.products);
	})
	.post((req: Request, res: Response, next: NextFunction) => {
		const id = req.params.id;
		const cart = cartsContainer.getById(id);
		const product = productsContainer.getById(req.body.id);
		const carts = cartsContainer.getAll();

		if (cart && !cart.products.includes(product)) {
			cart.products.push(product);

			const index = carts.findIndex((cart) => cart.id === id);

			carts[index] = cart;
		}

		cartsContainer
			.save(carts, id)
			.then((cart) => {
				res.json({ ProductId: product.id, cart });
			})
			.catch((err) => next(err));
	});

cartRouter.delete(
	'/:id/products/:id_prod',
	(req: Request, res: Response, next: NextFunction) => {
		const cartId = req.params.id;
		const cart = cartsContainer.getById(cartId);
		const carts = cartsContainer.getAll();
		const productId = req.params.id_prod;

		cartsContainer
			.deleteCartProductById(productId, carts, cart)
			.then((carts) => {
				res.json(carts);
			})
			.catch((err) => {
				next(err);
			});
	}
);

app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);

app.use((req, res, next) => {
	const error = new Error('Not found');
	(error as Error).status = 404;
	next(error);
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
	res.status(error.status || 500).send({
		error: {
			status: error.status || 500,
			message: error.message || 'Internal Server Error',
		},
	});
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}!`);
});

export default app;
