const nearley = require("nearley");
const grammar = require("./grammar.js");
const helper = require("./helpers");

// Create a Parser object from our grammar.
const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

// Parse something!
parser.feed(
  `customer.a > 3 AND ((customer.a > 10 AND customer.b > 40) AND 
  (customer.c like "andi" and customer.d < 40) and 
  (customer.e like "danang" or customer.f > 40) )`
);

// parser.results is an array of possible parsings.
console.log(JSON.stringify(helper.parseQuery(parser.results[0]), null, 2));
