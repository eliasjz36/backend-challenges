import express, { Express } from 'express';
import { createServer } from 'http';
import moment from 'moment';
import { Server } from 'socket.io';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';

import MongoDBContainer from './services/mongodb.service';
import authRoute from './routes/auth.routes';
import indexRoute from './routes/index.routes';
import logger from './utils/logger';
import connection from './db/connection';
import passport from 'passport';
import yargs from 'yargs';

const app: Express = express();

const port = yargs.default({ port: 8080 }).argv.port;

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
		resave: true,
		saveUninitialized: false,
		cookie: {
			maxAge: 600000,
		},
	}),
);
app.use(passport.initialize());
app.use(passport.session());

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.use('/', indexRoute);
app.use('/auth', authRoute);

io.on('connection', (socket) => {
	console.log('A client has connected');

	const messagesContainer = new MongoDBContainer('./src/db/messages.json');

	socket.emit('messages', messagesContainer.getAll());

	socket.on('new-message', (msg) => {
		const message = { ...msg, date: moment().format('HH:MM:SS') };

		messagesContainer.saveOne(message);

		io.sockets.emit('messages', messagesContainer.getAll());

		messagesContainer.saveOne(message);
	});
});

httpServer.listen(port, async () => {
	logger.info(`Server running on port ${port}`);

	await connection();
});
