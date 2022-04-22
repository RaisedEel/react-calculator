import classes from './Calculator.module.css';

function Calculator(props) {
  return (
    <div className={classes.calculator}>
      <div className={classes.title}>
        <strong>Calculator: 12 Digits</strong> <em>by Raised Eel 🐍</em>
      </div>
      {props.children}
    </div>
  );
}

export default Calculator;
