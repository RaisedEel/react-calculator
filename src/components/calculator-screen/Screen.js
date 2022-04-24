import { useContext } from 'react';

import ScreenContext from '../../context/screen-context';
import classes from './Screen.module.css';

function Screen(props) {
  const screenCtx = useContext(ScreenContext);

  return (
    <div className={classes['calculator-screen']}>
      <p className={classes['upper-screen']}>{screenCtx.upperScreen}</p>
      <p className={classes['lower-screen']}>{screenCtx.lowerScreen}</p>
    </div>
  );
}

export default Screen;
