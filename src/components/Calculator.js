import classes from ''; 

function Calculator(props) {
  return(
    <div className={classes.calculator}>
      {props.children}
    </div>
  );
}

export default Calculator;