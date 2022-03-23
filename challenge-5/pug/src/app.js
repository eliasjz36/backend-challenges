const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('views', 'views');
app.set('view engine', 'pug');

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

app.listen(8080, () => console.log('ready'));
