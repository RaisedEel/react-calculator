
// In case of wanting to add more complex operations, they can be added
// here but an action will have to be created in the context

function operate(numero1, numero2, operator) {
  const firstNumber = Number(numero1);
  const secondNumber = Number(numero2);
  let result;

  // Not using eval or Function in case of wanting to add more complex operations
  switch (operator) {
    case '+':
      // Math.round, EPSILON and dividing by 100 are being used for rounding numbers to 2 decimals
      result =
        Math.round((firstNumber + secondNumber + Number.EPSILON) * 100) / 100;
      break;
    case '-':
      result =
        Math.round((firstNumber - secondNumber + Number.EPSILON) * 100) / 100;
      break;
    case '*':
      result =
        Math.round((firstNumber * secondNumber + Number.EPSILON) * 100) / 100;
      break;
    case '/':
      result =
        Math.round((firstNumber / secondNumber + Number.EPSILON) * 100) / 100;
      break;
    default:
      result = 'ERROR: Operation Invalid';
  }

  // Return error in case of gotten a not valid result
  if (Number.isNaN(result) || !Number.isFinite(result))
    result = 'ERROR: Operation Invalid';
  return result;
}

export default operate;