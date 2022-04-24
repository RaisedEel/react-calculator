import React, { useReducer } from 'react';

const ScreenContext = React.createContext({
  upperScreen: '',
  lowerScreen: '0',
  shouldClearScreen: true,
  dispatchAction: (action) => {},
  clear: () => {},
});

const initContent = {
  upperScreen: '',
  lowerScreen: '0',
  shouldClearScreen: true,
};

function operate(numero1, numero2, operator) {
  const firstNumber = Number(numero1);
  const secondNumber = Number(numero2);
  let result;

  switch (operator) {
    case '+':
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

  if (Number.isNaN(result) || !Number.isFinite(result))
    result = 'ERROR: Operation Invalid';
  return result;
}

function screenContextReducer(state, action) {
  let lowerValue;
  let upperValue;
  switch (action.type) {
    case 'ADD_DIGIT':
      if (
        state.shouldClearScreen ||
        state.lowerScreen === '0' ||
        state.lowerScreen.includes('E')
      ) {
        return {
          ...state,
          lowerScreen: action.value.toString(),
          shouldClearScreen: false,
        };
      } else if (state.lowerScreen.length >= 12) {
        return { ...state };
      } else {
        lowerValue = state.lowerScreen.concat(action.value);
        return { ...state, lowerScreen: lowerValue };
      }
    case 'REMOVE_DIGIT':
      if (state.lowerScreen.length === 1) {
        lowerValue = '0';
        return { ...state, lowerScreen: lowerValue, shouldClearScreen: true };
      } else {
        lowerValue = state.lowerScreen.slice(0, -1);
        return { ...state, lowerScreen: lowerValue };
      }
    case 'USE_OPERATOR':
      if (!state.lowerScreen.includes('E')) {
        if (state.upperScreen === '' || state.upperScreen.includes('=')) {
          upperValue = state.lowerScreen.concat(action.operator);
          return {
            lowerScreen: '0',
            upperScreen: upperValue,
            shouldClearScreen: true,
          };
        } else {
          upperValue = state.upperScreen.split(' ');
          lowerValue = state.lowerScreen;

          const result = operate(upperValue[0], lowerValue, upperValue[1]);
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
      if (state.upperScreen.includes('=')) {
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
      if(state.lowerScreen.includes('-')){
        lowerValue = state.lowerScreen.slice(1);
      }else{
        lowerValue = `-${state.lowerScreen}`;
      }
      return {...state, lowerScreen: lowerValue};
    default:
      return initContent;
  }
}

export function ScreenContextProvider(props) {
  const [screensContent, dispatch] = useReducer(
    screenContextReducer,
    initContent
  );

  const contextValue = {
    upperScreen: screensContent.upperScreen,
    lowerScreen: screensContent.lowerScreen,
    dispatchAction: dispatch,
    clear: () => dispatch({ type: 'CLEAR' }),
  };

  return (
    <ScreenContext.Provider value={contextValue}>
      {props.children}
    </ScreenContext.Provider>
  );
}

export default ScreenContext;
