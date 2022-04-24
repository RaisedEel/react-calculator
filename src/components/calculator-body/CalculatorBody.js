import ButtonPad from './ButtonPad';
import classes from './CalculatorBody.module.css';

const NUMBER_PAD = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0, '.', '+/-'];
const OPERATOR_PAD = ['DEL', 'CLEAR', '*', '/', '+', '-', '='];

function CalculatorBody() {
  return (
    <div className={classes['calculator-body']}>
      <div className={classes['number-pad']}>
        <ButtonPad buttons = {NUMBER_PAD} width = '31%'/>
      </div>
      <div className={classes['operator-pad']}>
        <ButtonPad buttons = {OPERATOR_PAD} width = '48%'/>
      </div>
    </div>
  );
}

export default CalculatorBody;
