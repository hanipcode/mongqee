@{% 
  function handleRule(d) { return { word: d[0], operand: d[2], number: d[4] }}
%}

@{% 
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
%}

Main -> Q {% id %}


Q -> Rule | withFilter | GroupedQuery {% id %} 
GroupedQuery -> "(" _ expr _ ")"  {% d => d[2] %}

expr -> Rule {% d => d[0] %}
		| withFilter{% d => d[0] %}
		| GroupedQuery{% d => d[0] %}
		| Rule _ Filter _ GroupedQuery _ Filter _ Rule {%  d=> ({ duar: d }) %}
				 
withFilter -> expr _ Filter _ expr  {% d => handleFilterRootRule(d) %}
			 
Rule -> Word _ Operand _ Text  {% d => handleRule(d) %}
Text -> number | WordString {% id %}
Filter -> "AND"i | "OR"i {% function (d) { return d[0].toLowerCase() } %}
Operand ->
    "=" {% d => d[0] %}
	| "<=>" {% d => d[0] %}
  | "<>" {% d => d[0] %}
  | "<" {% d => d[0] %}
  | "<=" {% d => d[0] %}
  | ">" {% d => d[0] %}
  | ">=" {% d => d[0] %}
  | "!=" {% d => d[0] %}
  | "LIKE"i {% d => d[0] %}
WordString -> WSE _ char _ WSE _ {% d => d[2] %}
WSE -> "'" | "\"" | "`" {% id %}
number -> [0-9]:+ {% function (d) { return parseInt(d.join(" ").replace(/,/gi, '') ) } %}
Word -> char | subItem | subSubItem {% id %}
subSubItem -> char "." char "." char {% function (d) { return `${d[0]}.${d[2]}.${d[4]}`} %}
subItem -> char "." char {% function (d) { return `${d[0]}.${d[2]}`} %}
char -> [a-zA-Z]:* {% function(d) {return d.join(" ").replace(/,/gi, '') } %}
# Whitespace. The important thing here is that the postprocessor
# is a null-returning function. This is a memory efficiency trick.



_ -> [\s]:*     {% function(d) {return null } %}