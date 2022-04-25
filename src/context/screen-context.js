import React, { useReducer } from 'react';

import screenContextReducer from './screen-context-reducer';

const ScreenContext = React.createContext({
  upperScreen: '',
  lowerScreen: '0',
  shouldClearScreen: true,
  dispatchAction: (action) => {},
  clear: () => {},
});

export function ScreenContextProvider(props) {
  const [screensContent, dispatch] = useReducer(screenContextReducer, {
    upperScreen: '',
    lowerScreen: '0',
    shouldClearScreen: true,
  });

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
