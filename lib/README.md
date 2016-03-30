# Database Format

### Users
```js
{
  username: String,
  password: String,
  email: String,
  address: String,
  reviews: [{
    username: String,
    comment: String,
    datemade: DateObject
  ],
  listings:[
    productId:int
  ]
}
```

### Listings
```js
{
  listingId: int,
  username: String,
  pictures[
    pictureName:String,
    ...
  ],
  price: float,
}
```
