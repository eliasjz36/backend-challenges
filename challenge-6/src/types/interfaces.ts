/** A simple product interface */
export interface IProduct {
  /** The product name */
  title: string;

  /** The product price */
  price: number;

  /** The product image url */
  thumbnail: string;
}

/** An interfaces that extends [[`IProduct`]] and adds a property */
export interface IProducts extends IProduct {
  /** The product id */
  id: number;
}
