# Mongqee

Mongqee is a query language that translate into mongodb filter.
What I want to achieve is to be able to parse it directly using mongoose for examle

```javascript
const mongqee = require("mongqee");
//... rest of import

// parse a query
const query = `Customer.age > 40 AND customer.address LIKE "Jakarta"`;
const filter = mongqee.parse(query);
// this would parse into
// {
//   "$and": [
//     {
//       "Customer.age": {
//         "$gt": [
//           40
//         ]
//       }
//     },
//     {
//       "customer.address": {
//         "$eq": new Regexp('Jakarta', 'gim')
//       }
//     }
//   ]
// }
// then you can use it directly inside mongo
const customers = await Customer.find(filter);
```

## Roadmap

- [x] basic query
- [x] combining query with filter:
- - [x] AND filter
- - [x] OR filter
- [x] Add more non-primitive (>, < , >=, etc):
- - [x] LIKE operand
- [x] Grouping Query with parentheses
- [ ] conditional (IF)
- [ ] aggregate function (SUM, AVERAGE) ?
