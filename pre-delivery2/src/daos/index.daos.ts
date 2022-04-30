import admin from 'firebase-admin';

import CartModel from '@/models/cart.model';
import ProductModel from '@/models/product.model';

import FirebaseProduct from './products/products.dao.firebase';
import FirebaseCart from './carts/carts.dao.firebase';
import MongoDBProduct from './products/products.dao.mongodb';
import CartDaoMongoDB from './carts/carts.dao.mongodb';

const db = admin.firestore();

const firebaseProduct = new FirebaseProduct(db, 'products');
const firebaseCart = new FirebaseCart(db, 'carts');

const mongodbProduct = new MongoDBProduct(ProductModel);
const mongodbCart = new CartDaoMongoDB(CartModel);

export { firebaseProduct, firebaseCart, mongodbProduct, mongodbCart };
