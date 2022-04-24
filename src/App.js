import Calculator from './components/Calculator';
import CalculatorBody from './components/Calculator-body/CalculatorBody';
import Screen from './components/Calculator-screen/Screen';

function App() {
  return (
    <div className='main'>
      <Calculator>
        <Screen/>
        <CalculatorBody/>
      </Calculator>
    </div>
  );
}

export default App;
