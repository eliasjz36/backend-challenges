import express, { Express } from 'express';
import { createServer } from 'http';
import moment from 'moment';
import { Server } from 'socket.io';
import cookieParser from 'cookie-parser';
import session from 'express-session';

import { Container } from './classes/container';
import authRoute from './routes/auth.route';
import indexRoute from './routes/index.route';
import MongoStore from 'connect-mongo';

const app: Express = express();

const port = process.env.PORT || 8080;

const httpServer = createServer(app);

const io = new Server(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
	session({
		store: MongoStore.create({
			mongoUrl:
				'mongodb+srv://crud:crud@cluster0.7wry7.mongodb.net/crud?retryWrites=true&w=majority',
		}),
		secret: 'secret',
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 600000,
		},
	}),
);

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.use('/', indexRoute);
app.use('/auth', authRoute);

io.on('connection', (socket) => {
	console.log('A client has connected');

	const messagesContainer = new Container('./src/db/messages.json');
	const messages = messagesContainer.getAll();

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
