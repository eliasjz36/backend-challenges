import admin from 'firebase-admin';

import FirebaseContainer from '@/containers/firebase.container';
import { IProduct } from '@/interfaces/product.interface';

class ProductDaoFirebase extends FirebaseContainer<IProduct> {
	constructor(db: admin.firestore.Firestore, collectionName: string) {
		super(db, collectionName);
	}
}

export default ProductDaoFirebase;
