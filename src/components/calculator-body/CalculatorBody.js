import classes from './CalculatorBody.module.css';

const NUMBER_PAD = [7,8,9,4,5,6,1,2,3,0,".","+/-"];
const OPERATOR_PAD = ["DEL","CLEAR","*","/","+","-","="];

function CalculatorBody() {
  return (
    <div className={classes['calculator-body']}>
      <div className={classes['number-pad']}>
        {NUMBER_PAD.map((button) => <button style={{width: '31%'}}>{button}</button>)}
      </div>
      <div className={classes['operator-pad']}>
        {OPERATOR_PAD.map((button) => <button style={{width: '48%'}}>{button}</button>)}
      </div>
    </div>
  );
}

export default CalculatorBody;