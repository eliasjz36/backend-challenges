const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');

const port = process.env.PORT || 8080;

const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

const data = [];

app.get('/', (req, res) => {
	res.render('form', { data });
});

app.get('/products', (req, res) => {
	res.render('products', { data });
});

io.on('connection', (socket) => {
	console.log('A client has connected');
	socket.emit('products', data);

	socket.on('new-product', (product) => {
		data.push(product);
		io.sockets.emit('products', data);
	});
});

httpServer.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
