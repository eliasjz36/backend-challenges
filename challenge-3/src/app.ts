import { Container } from './../../challenge-2/src/classes/container';
import express from 'express';

const app = express();
const PORT = 8080;

const container = new Container(__dirname + '/files/products.txt');
const products = container.getAll();

app.get('/products', (req, res) => {
  res.send(products);
});

app.get('/randomProduct', (req, res) => {
  const randomNumber = Math.floor(Math.random() * products.length - 1);
  res.send(products[randomNumber]);
});

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
