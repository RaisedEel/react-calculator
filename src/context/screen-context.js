import React, { useReducer } from 'react';

const ScreenContext = React.createContext({
  upperScreen: '',
  lowerScreen: '',
  isLowerCero: true,
  addToLowerScreen: (value) => {},
  removeFromLowerScreen: () => {},
  moveFromLowerToUpper: (operator) => {},
  operateLowerWithUpper: () => {},
  clear: () => {},
});

initContent = {
  upperScreen: '',
  lowerScreen: '',
  isLowerCero: true,
};

function screenContextReducer(state, action) {
  let lowerValue;
  let upperValue;
  switch (action.type) {
    case 'ADD_LOWER':
      lowerValue = state.lowerScreen.concat(action.value);
      return { ...state, lowerScreen: lowerValue };
    case 'REMOVE_LOWER':
      if (state.lowerScreen.length === 1) {
        lowerValue = '0';
      } else {
        lowerValue = state.lowerScreen.slice(-1);
      }

      return { ...state, lowerScreen: lowerValue };
    case 'MOVE_TO_UPPER':
      upperValue = state.lowerScreen.concat(operator);
      return { lowerScreen: '0', upperScreen: upperValue, isLowerCero: true };
    case 'OPERATE':
      upperValue = state.upperScreen.split(' ');
      lowerValue = state.lowerScreen;

      const firstNumber = Number(upperValue[0]);
      const secondNumber = Number(lowerScreen);
      const operator = upperValue[1];

      switch (operator) {
        case '+':
          lowerValue =
            Math.round((firstNumber + secondNumber + Number.EPSILON) * 100) /
            100;
          break;
        case '-':
          lowerValue =
            Math.round((firstNumber - secondNumber + Number.EPSILON) * 100) /
            100;
          break;
        case '*':
          lowerValue =
            Math.round((firstNumber * secondNumber + Number.EPSILON) * 100) /
            100;
          break;
        case '/':
          lowerValue =
            Math.round((firstNumber / secondNumber + Number.EPSILON) * 100) /
            100;
          break;
      }

      return {
        ...state,
        lowerScreen: lowerValue,
        upperScreen: `${state.upperScreen}${secondNumber}`,
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
    addToLowerScreen: (value) => dispatch({type: 'ADD_LOWER', value}),
    removeFromLowerScreen: () => dispatch({type: 'REMOVE_LOWER'}),
    moveFromLowerToUpper: (operator) => dispatch({type: 'MOVE_TO_UPPER', operator}),
    operateLowerWithUpper: () => dispatch({type: 'OPERATE'}),
    clear: () => dispatch({type: 'CLEAR'}),
  };

  return (
    <ScreenContext.Provider value={contextValue}>
      {props.children}
    </ScreenContext.Provider>
  );
}

export default ScreenContext;
