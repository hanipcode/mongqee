const nearley = require("nearley");
const grammar = require("./grammar.js");
const helper = require("./helpers");

// Create a Parser object from our grammar.
const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

function parse(query) {
  parser.feed(query);
  return helper.parseQuery(parser.results[0]);
}

module.exports = {
  parse
};
