import { Fragment, useContext } from 'react';

import ScreenContext from '../../context/screen-context';

function ButtonPad(props) {
  const screenCtx = useContext(ScreenContext);

  const buttonPad = props.buttons.map((button) => {
    if (Number.isInteger(button)) {
      return (
        <button
          key={button}
          onClick={screenCtx.addToLowerScreen.bind(null, button)}
          style={{ width: props.width }}
        >
          {button}
        </button>
      );
    } else if (button === '=') {
      return (
        <button
          key={button}
          onClick={screenCtx.operateLowerWithUpper}
          style={{ width: props.width }}
        >
          {button}
        </button>
      );
    } else if (button === 'DEL') {
      return (
        <button
          key={button}
          onClick={screenCtx.removeFromLowerScreen}
          style={{ width: props.width }}
        >
          {button}
        </button>
      );
    } else if (button === 'CLEAR') {
      return (
        <button
          key={button}
          onClick={screenCtx.clear}
          style={{ width: props.width }}
        >
          {button}
        </button>
      );
    }

    return (
      <button
        key={button}
        onClick={screenCtx.moveFromLowerToUpper.bind(null, ` ${button} `)}
        style={{ width: props.width }}
      >
        {button}
      </button>
    );
  });

  return <Fragment>{buttonPad}</Fragment>;
}

export default ButtonPad;
