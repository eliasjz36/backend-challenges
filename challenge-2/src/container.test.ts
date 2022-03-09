import { Container } from './classes/container';

const container = new Container('./src/files/products.txt');

container
  .save({ title: 'elias2', price: 12, thumbnail: 'elais2' })
  .then((id) => console.log(id));
// // console.log(container.getById(2));
// // container.deleteById(6);
// container.deleteAll();
