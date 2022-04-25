// Importing the operation evaluator function
import operate from './operations';

// Context for all posible types of actions for the buttons
// If some new type of button is added a new actions will have
// to be created here
function screenContextReducer(state, action) {
  let lowerValue;
  let upperValue;
  switch (action.type) {
    case 'ADD_DIGIT':
      if (
        state.shouldClearScreen ||
        state.lowerScreen === '0' ||
        state.lowerScreen.includes('E') //Checks for Error
      ) {
        // This state is returned if the value on screen should be
        // replaced, only triggered in cases of error or if value is zero
        return {
          ...state,
          lowerScreen: action.value.toString(),
          shouldClearScreen: false,
        };
      } else if (state.lowerScreen.length >= 12) { // Limit of digits
        return { ...state };
      } else {
        lowerValue = state.lowerScreen.concat(action.value);
        return { ...state, lowerScreen: lowerValue };
      }
    case 'REMOVE_DIGIT':
      // Must check if the digit on screen is the last
      if (state.lowerScreen.length === 1) {
        lowerValue = '0';
        return { ...state, lowerScreen: lowerValue, shouldClearScreen: true };
      } else {
        lowerValue = state.lowerScreen.slice(0, -1);
        return { ...state, lowerScreen: lowerValue };
      }
    case 'USE_OPERATOR':
      if (!state.lowerScreen.includes('E')) { // Checking for errors 
        if (state.upperScreen === '' || state.upperScreen.includes('=')) {
          upperValue = state.lowerScreen.concat(action.operator);
          // Return when no operator or equals just have been used
          return {
            lowerScreen: '0',
            upperScreen: upperValue,
            shouldClearScreen: true,
          };
        } else {
          // Can concatenate quick operations with no need of using equals
          upperValue = state.upperScreen.split(' '); // Separate operator from number
          lowerValue = state.lowerScreen;

          const result = operate(upperValue[0], lowerValue, upperValue[1]);
          // Check for error to stop a bug when the error message appears in
          // the upper screen
          if (typeof result === 'string')
            return { ...state, lowerScreen: result, shouldClearScreen: true };

          return {
            lowerScreen: result.toString(),
            upperScreen: `${result}${action.operator}`,
            shouldClearScreen: true,
          };
        }
      } else {
        return { ...state };
      }

    case 'USE_EQUALS':
      if (state.upperScreen.includes('=')) { // Prevent using multiple equals
        return { ...state };
      }
      upperValue = state.upperScreen.split(' ');
      lowerValue = state.lowerScreen;

      const result = operate(upperValue[0], lowerValue, upperValue[1]);

      return {
        ...state,
        lowerScreen: result.toString(),
        upperScreen: `${state.upperScreen}${lowerValue} = `,
      };
    case 'USE_NEGATION':
      if (state.lowerScreen.includes('-')) {
        lowerValue = state.lowerScreen.slice(1); // Slices minus at the front
      } else {
        lowerValue = `-${state.lowerScreen}`;
      }
      return { ...state, lowerScreen: lowerValue };
    case 'USE_DECIMALS':
      if (!state.lowerScreen.includes('.')) {
        return { ...state, lowerScreen: state.lowerScreen.concat('.') };
      } else {
        return { ...state };
      }
    default:
      return {
        upperScreen: '',
        lowerScreen: '0',
        shouldClearScreen: true,
      };
  }
}

export default screenContextReducer;
