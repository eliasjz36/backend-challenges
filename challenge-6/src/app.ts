const express = require('express');
const { createServer } = require('http');
const moment = require('moment');
const { Server } = require('socket.io');
const { Container } = require('./classes/container');

const port = process.env.PORT || 8080;

const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

const data = [];
const container = new Container('./messages.json');
const messages = container.getAll();

app.get('/', (req, res) => {
	res.render('form');
});

app.get('/products', (req, res) => {
	res.render('products', { data });
});

io.on('connection', (socket) => {
	console.log('A client has connected');

	socket.emit('products', data);
	socket.emit('messages', messages);

	socket.on('new-product', (product) => {
		data.push(product);
		io.sockets.emit('products', data);
	});

	socket.on('new-message', (msg) => {
		const message = { ...msg, date: moment().format('HH:MM:SS') };

		messages.push(message);
		io.sockets.emit('messages', messages);

		container.save(message);
	});
});

httpServer.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
