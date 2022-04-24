import { Fragment, useContext } from 'react';

import ScreenContext from '../../context/screen-context';

function ButtonPad(props) {
  const screenCtx = useContext(ScreenContext);

  const buttonPad = props.buttons.map((button) => {
    if (Number.isInteger(button)) {
      return (
        <button
          key={button}
          onClick={() =>
            screenCtx.dispatchAction({ type: 'ADD_DIGIT', value: button })
          }
          style={{ width: props.width }}
        >
          {button}
        </button>
      );
    } else if (button === '=') {
      return (
        <button
          key={button}
          onClick={() => screenCtx.dispatchAction({ type: 'USE_EQUALS' })}
          style={{ width: props.width }}
        >
          {button}
        </button>
      );
    } else if (button === 'DEL') {
      return (
        <button
          key={button}
          onClick={() => screenCtx.dispatchAction({ type: 'REMOVE_DIGIT' })}
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
    } else if (button === '+/-') {
      return (
        <button
          key={button}
          onClick={() => screenCtx.dispatchAction({ type: 'USE_NEGATION' })}
          style={{ width: props.width }}
        >
          {button}
        </button>
      );
    } else if (button === '.') {
      return (
        <button
          key={button}
          onClick={() => screenCtx.dispatchAction({ type: 'USE_DECIMALS' })}
          style={{ width: props.width }}
        >
          {button}
        </button>
      );
    }

    return (
      <button
        key={button}
        onClick={() =>
          screenCtx.dispatchAction({
            type: 'USE_OPERATOR',
            operator: ` ${button} `,
          })
        }
        style={{ width: props.width }}
      >
        {button}
      </button>
    );
  });

  return <Fragment>{buttonPad}</Fragment>;
}

export default ButtonPad;
