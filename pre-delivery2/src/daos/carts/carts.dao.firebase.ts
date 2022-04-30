import admin from 'firebase-admin';

import FirebaseContainer from '@/containers/firebase.container';
import { ICart } from '@/interfaces/cart.interface';

class CartDaoFirebase extends FirebaseContainer<ICart> {
	constructor(db: admin.firestore.Firestore, collectionName: string) {
		super(db, collectionName);
	}
}

export default CartDaoFirebase;
