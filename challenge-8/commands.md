# Challenge-9

## Part 1 - Create database, collections and initial documents

---

### Create database "ecommerce"

` use ecommerce`

### Create two collections "messages" and "products"

```
  db.createCollection("messages")
  db.createCollection("products")
```

### Add 10 documents with different values to "messages" and "products" collections

```
  db.products.insertMany([
    {
      title: "car1",
      price: 100,
      thumbnail: "http://www.example1.com"
    },
    {
      title: "car2",
      price: 200,
      thumbnail: "http://www.example2.com"
    },
    {
      title: "car3",
      price: 300,
      thumbnail: "http://www.example3.com"
    },
    {
      title: "car4",
      price: 400,
      thumbnail: "http://www.example4.com"
    },
    {
      title: "car5",
      price: 800,
      thumbnail: "http://www.example5.com"
    },
    {
      title: "car6",
      price: 1200,
      thumbnail: "http://www.example6.com"
    },
    {
      title: "car7",
      price: 1800,
      thumbnail: "http://www.example7.com"
    },
    {
      title: "car8",
      price: 3200,
      thumbnail: "http://www.example8.com"
    },
    {
      title: "car9",
      price: 4000,
      thumbnail: "http://www.example9.com"
    },
    {
      title: "car10",
      price: 5000,
      thumbnail: "http://www.example10.com"
    }
  ])

  db.messages.insertMany([
    {
      email: "elias1@gmail.com",
      msg: "test1",
      date: new Date()
    },
    {
      email: "elias2@gmail.com",
      msg: "test2",
      date: new Date()
    },
    {
      email: "elias3@gmail.com",
      msg: "test3",
      date: new Date()
    },
    {
      email: "elias4@gmail.com",
      msg: "test4",
      date: new Date()
    },
    {
      email: "elias5@gmail.com",
      msg: "test5",
      date: new Date()
    },
    {
      email: "elias6@gmail.com",
      msg: "test6",
      date: new Date()
    },
    {
      email: "elias7@gmail.com",
      msg: "test7",
      date: new Date()
    },
    {
      email: "elias8@gmail.com",
      msg: "test8",
      date: new Date()
    },
    {
      email: "elias9@gmail.com",
      msg: "test9",
      date: new Date()
    },
    {
      email: "elias10@gmail.com",
      msg: "test10",
      date: new Date()
    },
  ])
```

### Show documents of each collection

```
  db.messages.find()
  db.products.find()
```

### Show number of documents of each collection

```
  db.messages.countDocuments()
  db.products.countDocuments()
```

## Part 2 - CRUD operations on the "products" collection

---

### Create

#### Add a product to the "products" collection

```
  db.products.insert(
    {
      title: "New Product",
      price: 2000,
      thumbnail: "http://www.example.com"
    }
  )
```

### Read

#### Show products with "price" < $1000

```
  db.products.find(
    {
      price: { $lt: 1000 }
    }
  )
```

#### Show products with $1000 ≤ "price" ≤ $3000

```
  db.products.find(
    {
      $and: [
        { price: { $gte: 1000 }},
        { price: { $lte: 3000 }}
      ]
    }
  )
```

#### Show products with "price" > $3000

```
  db.products.find(
    {
      price: { $gt: 3000 }
    }
  )
```

### Update

#### Add "stock" field to all documents with a value of 100

```
  db.products.updateMany(
    {},
    { $set: { stock: 100 } },
  )
```

#### Set "stock" field to 0 to documents with "price" > 4000

```
  db.products.updateMany(
    { price: { $gt: 4000 }},
    { $set: { stock: 0 }}
  )
```

### Delete

#### Delete documents with "price" > 1000

```
  db.products.deleteMany(
    { price: { $lt: 1000 }}
  )
```

## Part 3 - Create user with permissions

---

### Create a user called 'newUser' with password 'newUserPwd' who can only read the ecommerce database

```
  db.createUser(
    {
      "user": "newUser",
      "pwd": "newUserPwd",
      "roles": [
        { role: "read", db: "ecommerce" }
      ]
    })
```
