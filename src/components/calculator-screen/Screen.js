import classes from './Screen.module.css';

function Screen() {
  return (
    <div className={classes['calculator-screen']}>
      <p className={classes['upper-screen']}></p>
      <p className={classes['lower-screen']}>0</p>
    </div>
  );
}

export default Screen;