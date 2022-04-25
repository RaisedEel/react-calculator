import { useContext } from 'react';

import ScreenContext from '../../context/screen-context';
import classes from './CalculatorButton.module.css';

function CalculatorButton(props) {
  const screenCtx = useContext(ScreenContext);

  let buttonAction;
  // Assigning different actions depending of the type of button
  switch (props.type) {
    case 'operator':
      buttonAction = () =>
        screenCtx.dispatchAction({
          type: 'USE_OPERATOR',
          operator: ` ${props.content} `,
        });
      break;
    case 'delete':
      buttonAction = () =>
        screenCtx.dispatchAction({
          type: 'REMOVE_DIGIT',
        });
      break;
    case 'clear':
      buttonAction = () => screenCtx.clear();
      break;
    case 'negator':
      buttonAction = () =>
        screenCtx.dispatchAction({
          type: 'USE_NEGATION',
        });
      break;
    case 'dot':
      buttonAction = () =>
        screenCtx.dispatchAction({
          type: 'USE_DECIMALS',
        });
      break;
    case 'equals':
      buttonAction = () =>
        screenCtx.dispatchAction({
          type: 'USE_EQUALS',
        });
      break;
    default:
      // For numbers or unknown button inputs
      buttonAction = () =>
        screenCtx.dispatchAction({
          type: 'ADD_DIGIT',
          value: props.content,
        });
      break;
  }

  return (
    <button className={classes[props.type]} onClick={buttonAction}>
      {props.content}
    </button>
  );
}

export default CalculatorButton;
