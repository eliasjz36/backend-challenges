// export * from './services/createProductsTable';
// export * from './services/createMessagesTable';

import express, { Express } from 'express';
import { createServer } from 'http';
import moment from 'moment';
import { Server } from 'socket.io';

import { Container } from './classes/container';
import config from './config';
import { Message, Product } from './global/interfaces';

const port = process.env.PORT || 8080;

const app: Express = express();

const httpServer = createServer(app);

const io = new Server(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

const productsContainer = new Container<Product>(config, 'products');
const messagesContainer = new Container<Message>(config, 'messages');

const products = productsContainer.getAll();
const messages = messagesContainer.getAll();

app.get('/', (req, res) => {
	res.render('form');
});

app.get('/products', (req, res) => {
	res.render('products', { products });
});

io.on('connection', (socket) => {
	console.log('A client has connected');

	products.then((products) => {
		socket.emit('products', products);

		socket.on('new-product', (product) => {
			products.push(product);

			io.sockets.emit('products', products);

			productsContainer.save(product);
		});
	});

	messages.then((messages) => {
		socket.emit('messages', messages);

		socket.on('new-message', (msg) => {
			const message = { ...msg, date: moment().format('HH:MM:SS') };

			messages.push(message);

			io.sockets.emit('messages', messages);

			messagesContainer.save(message);
		});
	});
});

httpServer.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
