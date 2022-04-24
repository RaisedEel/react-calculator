import React, { useReducer } from 'react';

const ScreenContext = React.createContext({
  upperScreen: '',
  lowerScreen: '0',
  isLowerCero: true,
  addToLowerScreen: (value) => {},
  removeFromLowerScreen: () => {},
  moveFromLowerToUpper: (operator) => {},
  operateLowerWithUpper: () => {},
  clear: () => {},
});

const initContent = {
  upperScreen: '',
  lowerScreen: '0',
  isLowerCero: true,
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

  return result;
}

function screenContextReducer(state, action) {
  let lowerValue;
  let upperValue;
  switch (action.type) {
    case 'ADD_LOWER':
      if (state.isLowerCero || state.lowerScreen === '0') {
        return {
          ...state,
          lowerScreen: action.value.toString(),
          isLowerCero: false,
        };
      } else {
        lowerValue = state.lowerScreen.concat(action.value);
        return { ...state, lowerScreen: lowerValue };
      }
    case 'REMOVE_LOWER':
      if (state.lowerScreen.length === 1) {
        lowerValue = '0';
        return { ...state, lowerScreen: lowerValue, isLowerCero: true };
      } else {
        lowerValue = state.lowerScreen.slice(0, -1);
        return { ...state, lowerScreen: lowerValue };
      }
    case 'MOVE_TO_UPPER':
      if (state.upperScreen === '') {
        upperValue = state.lowerScreen.concat(action.operator);
        return { lowerScreen: '0', upperScreen: upperValue, isLowerCero: true };
      } else {
        upperValue = state.upperScreen.split(' ');
        lowerValue = state.lowerScreen;

        const result = operate(upperValue[0], lowerValue, upperValue[1]);

        return {
          lowerScreen: result.toString(),
          upperScreen: `${result}${action.operator}`,
          isLowerCero: true,
        };
      }
    case 'OPERATE':
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
    addToLowerScreen: (value) => dispatch({ type: 'ADD_LOWER', value }),
    removeFromLowerScreen: () => dispatch({ type: 'REMOVE_LOWER' }),
    moveFromLowerToUpper: (operator) =>
      dispatch({ type: 'MOVE_TO_UPPER', operator }),
    operateLowerWithUpper: () => dispatch({ type: 'OPERATE' }),
    clear: () => dispatch({ type: 'CLEAR' }),
  };

  return (
    <ScreenContext.Provider value={contextValue}>
      {props.children}
    </ScreenContext.Provider>
  );
}

export default ScreenContext;
