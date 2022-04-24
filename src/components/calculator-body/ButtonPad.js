import { useContext } from 'react';

import ScreenContext from '../../context/screen-context';

function ButtonPad(props) {
  const screenCtx = useContext(ScreenContext);

  const buttonPad = props.buttons.map((button) => {
    if (Number.isInteger(button)) {
      return (
        <button
          onClick={screenCtx.addToLowerScreen}
          style={{ width: props.width }}
        ></button>
      );
    } else if (button === '=') {
      return (
        <button
          onClick={screenCtx.operateLowerWithUpper}
          style={{ width: props.width }}
        ></button>
      );
    } else if (button === 'DEL') {
      return (
        <button
          onClick={screenCtx.removeFromLowerScreen}
          style={{ width: props.width }}
        ></button>
      );
    } else if (button === 'CLEAR') {
      return (
        <button
          onClick={screenCtx.clear}
          style={{ width: props.width }}
        ></button>
      );
    }

    return (
      <button
        onClick={screenCtx.moveFromLowerToUpper}
        style={{ width: props.width }}
      ></button>
    );
  });

  return { buttonPad };
}

export default ButtonPad;
