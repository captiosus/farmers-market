# Database Format

### Users
```js
{
  username: String,
  password: String,
  email: String,
  reviews: [{
    username: String,
    comment: String,
    datemade: DateObject
  }],
  listings:[
    listingId:int,
    ...
  ],
  messages:[
    {
      recipient:String,
      messages:[String, ...]
    }
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
  bidprice: float,
  buyprice: float,
  title: String,
  description: String,
}
```
