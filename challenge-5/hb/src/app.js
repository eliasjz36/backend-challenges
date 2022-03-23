const express = require('express');
const handlebars = require('express-handlebars');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine(
	'hbs',
	handlebars.engine({
		extname: '.hbs',
		defaultLayout: 'index.hbs',
		layoutsDir: __dirname + '/views/layouts',
		partialsDir: __dirname + '/views/partials',
	})
);

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

const data = [];

app.get('/', (req, res) => {
	res.render('form', { data });
});

app.get('/products', (req, res) => {
	res.render('products', { data });
});

app.post('/products', (req, res) => {
	data.push(req.body);
	res.render('form', { data });
});

app.listen(8080, () => {
	console.log('Server running on port 8080...');
});
