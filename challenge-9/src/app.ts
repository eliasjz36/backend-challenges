import express, { Express } from 'express';
import { createServer } from 'http';

import moment from 'moment';
import { Server } from 'socket.io';

import { Container } from './classes/container';
import { Product } from './interfaces/product.interface';
import { generateProducts } from './utils/faker';
import { getHoldingCompression } from './utils/normalize';

const port = process.env.PORT || 8080;

const app: Express = express();

const httpServer = createServer(app);

const io = new Server(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

const messagesContainer = new Container('./src/db/messages.json');

const fakeProducts: Product[] = generateProducts(5);
const messages = messagesContainer.getAll();
const holdingCompressionRate = getHoldingCompression();

app.get('/', (req, res) => {
	res.render('form', { holdingCompressionRate });
});

app.get('/api/products-test', (req, res) => {
	res.render('fakeProducts', { fakeProducts });
});

io.on('connection', (socket) => {
	console.log('A client has connected');

	socket.emit('fakeProducts', fakeProducts);

	socket.emit('compression');

	socket.emit('messages', messages);

	socket.on('new-message', (msg) => {
		const message = { ...msg, date: moment().format('HH:MM:SS') };

		messages.push(message);

		io.sockets.emit('messages', messages);

		messagesContainer.save(message);
	});
});

httpServer.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
