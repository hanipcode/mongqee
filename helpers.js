const enumOperand = {
  "=": "$eq",
  "!=": "$ne",
  ">": "$gt",
  "<": "$lt",
  ">=": "$gte",
  "<=": "$lte"
};

function getFromIfAray(v) {
  if (Array.isArray(v)) {
    return v[0];
  }
  return v;
}

function handleRule(Rule) {
  const { word, operand, number } = Rule;
  if (operand.toString().toLowerCase() === "like") {
    return {
      [getFromIfAray(word)]: {
        $eq: new RegExp(number, "gim")
      }
    };
  }
  return {
    [getFromIfAray(word)]: {
      [enumOperand[operand]]: number
    }
  };
}

function handleRoot(dat) {
  const { rule, f, rule2 } = dat;
  const filterOp = `$${f}`.toLowerCase();
  return {
    [filterOp]: [handleRule(rule), handleRule(rule2)]
  };
}

function handleRecurse(inputData) {
  if (inputData.rule && inputData.rule2) {
    return handleRoot(inputData);
  }
  const { f } = inputData;
  const filterOp = `$${f}`.toLowerCase();
  const args = [];
  if (inputData.prev) {
    args.push(handleRecurse(inputData.prev));
  }
  if (inputData.rule) {
    args.push(handleRule(inputData.rule));
  }
  if (inputData.prev2) {
    args.push(handleRecurse(inputData.prev2));
  }
  if (inputData.rule2) {
    args.push(handleRule(inputData.rule2));
  }
  const result = {
    [filterOp]: args
  };
  return result;
}

function parseQuery(inputData) {
  return handleRecurse(getFromIfAray(inputData));
}

module.exports = {
  parseQuery,
  handleRecurse,
  handleRoot,
  handleRule
};
