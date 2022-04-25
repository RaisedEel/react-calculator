import classes from './CalculatorBody.module.css';
import CalculatorButton from './CalculatorButton';

//[7, 8, 9, 4, 5, 6, 1, 2, 3, 0, '.', '+/-'];
const NUMBER_PAD = [
  { content: '7', type: 'number'},
  { content: '8', type: 'number'},
  { content: '9', type: 'number'},
  { content: '4', type: 'number'},
  { content: '5', type: 'number'},
  { content: '6', type: 'number'},
  { content: '1', type: 'number'},
  { content: '2', type: 'number'},
  { content: '3', type: 'number'},
  { content: '0', type: 'number'},
  { content: '.', type: 'dot'},
  { content: '+/-', type: 'negator'},
];

//['DEL', 'CLEAR', '*', '/', '+', '-', '='];
const OPERATOR_PAD = [
  { content: 'DEL', type: 'delete'},
  { content: 'CLEAR', type: 'clear'},
  { content: '*', type: 'operator'},
  { content: '/', type: 'operator'},
  { content: '+', type: 'operator'},
  { content: '-', type: 'operator'},
  { content: '=', type: 'equals'},
];

function CalculatorBody() {
  return (
    <div className={classes['calculator-body']}>
      <div className={classes['number-pad']}>
        {NUMBER_PAD.map((buttonConf) => (
          <CalculatorButton key={buttonConf.content} {...buttonConf} />
        ))}
      </div>
      <div className={classes['operator-pad']}>
        {OPERATOR_PAD.map((buttonConf) => (
          <CalculatorButton key={buttonConf.content} {...buttonConf} />
        ))}
      </div>
    </div>
  );
}

export default CalculatorBody;
