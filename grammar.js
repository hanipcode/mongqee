// Generated automatically by nearley, version 2.19.0
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }
 
  function handleRule(d) { return { word: d[0], operand: d[2], number: d[4] }}

 
  function handleFilterRootRule(d) {
	  const result =  { f: d[2] }
	  if (d[0].rule || d[0].prev) {
		 result.prev = d[0]; 
	  } else {
		  result.rule = d[0]
	  }
	  if (d[4].rule || d[4].prev) {
		 result.prev2 = d[4]; 
	  } else {
		  result.rule2 = d[4]
	  }
	  return result;
  }
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "Main", "symbols": ["Q"], "postprocess": id},
    {"name": "Q", "symbols": ["Rule"]},
    {"name": "Q", "symbols": ["withFilter"]},
    {"name": "Q", "symbols": ["GroupedQuery"], "postprocess": id},
    {"name": "GroupedQuery", "symbols": [{"literal":"("}, "_", "expr", "_", {"literal":")"}], "postprocess": d => d[2]},
    {"name": "expr", "symbols": ["Rule"], "postprocess": d => d[0]},
    {"name": "expr", "symbols": ["withFilter"], "postprocess": d => d[0]},
    {"name": "expr", "symbols": ["GroupedQuery"], "postprocess": d => d[0]},
    {"name": "expr", "symbols": ["Rule", "_", "Filter", "_", "GroupedQuery", "_", "Filter", "_", "Rule"], "postprocess": d=> ({ duar: d })},
    {"name": "withFilter", "symbols": ["expr", "_", "Filter", "_", "expr"], "postprocess": d => handleFilterRootRule(d)},
    {"name": "Rule", "symbols": ["Word", "_", "Operand", "_", "Text"], "postprocess": d => handleRule(d)},
    {"name": "Text", "symbols": ["number"]},
    {"name": "Text", "symbols": ["WordString"], "postprocess": id},
    {"name": "Filter$subexpression$1", "symbols": [/[aA]/, /[nN]/, /[dD]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "Filter", "symbols": ["Filter$subexpression$1"]},
    {"name": "Filter$subexpression$2", "symbols": [/[oO]/, /[rR]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "Filter", "symbols": ["Filter$subexpression$2"], "postprocess": function (d) { return d[0].toLowerCase() }},
    {"name": "Operand", "symbols": [{"literal":"="}], "postprocess": d => d[0]},
    {"name": "Operand$string$1", "symbols": [{"literal":"<"}, {"literal":"="}, {"literal":">"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "Operand", "symbols": ["Operand$string$1"], "postprocess": d => d[0]},
    {"name": "Operand$string$2", "symbols": [{"literal":"<"}, {"literal":">"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "Operand", "symbols": ["Operand$string$2"], "postprocess": d => d[0]},
    {"name": "Operand", "symbols": [{"literal":"<"}], "postprocess": d => d[0]},
    {"name": "Operand$string$3", "symbols": [{"literal":"<"}, {"literal":"="}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "Operand", "symbols": ["Operand$string$3"], "postprocess": d => d[0]},
    {"name": "Operand", "symbols": [{"literal":">"}], "postprocess": d => d[0]},
    {"name": "Operand$string$4", "symbols": [{"literal":">"}, {"literal":"="}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "Operand", "symbols": ["Operand$string$4"], "postprocess": d => d[0]},
    {"name": "Operand$string$5", "symbols": [{"literal":"!"}, {"literal":"="}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "Operand", "symbols": ["Operand$string$5"], "postprocess": d => d[0]},
    {"name": "Operand$subexpression$1", "symbols": [/[lL]/, /[iI]/, /[kK]/, /[eE]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "Operand", "symbols": ["Operand$subexpression$1"], "postprocess": d => d[0]},
    {"name": "WordString", "symbols": ["WSE", "_", "char", "_", "WSE", "_"], "postprocess": d => d[2]},
    {"name": "WSE", "symbols": [{"literal":"'"}]},
    {"name": "WSE", "symbols": [{"literal":"\""}]},
    {"name": "WSE", "symbols": [{"literal":"`"}], "postprocess": id},
    {"name": "number$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "number$ebnf$1", "symbols": ["number$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "number", "symbols": ["number$ebnf$1"], "postprocess": function (d) { return parseInt(d.join(" ").replace(/,/gi, '') ) }},
    {"name": "Word", "symbols": ["char"]},
    {"name": "Word", "symbols": ["subItem"]},
    {"name": "Word", "symbols": ["subSubItem"], "postprocess": id},
    {"name": "subSubItem", "symbols": ["char", {"literal":"."}, "char", {"literal":"."}, "char"], "postprocess": function (d) { return `${d[0]}.${d[2]}.${d[4]}`}},
    {"name": "subItem", "symbols": ["char", {"literal":"."}, "char"], "postprocess": function (d) { return `${d[0]}.${d[2]}`}},
    {"name": "char$ebnf$1", "symbols": []},
    {"name": "char$ebnf$1", "symbols": ["char$ebnf$1", /[a-zA-Z]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "char", "symbols": ["char$ebnf$1"], "postprocess": function(d) {return d.join(" ").replace(/,/gi, '') }},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", /[\s]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": function(d) {return null }}
]
  , ParserStart: "Main"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
