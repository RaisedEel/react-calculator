import Calculator from './components/Calculator';
import CalculatorBody from './components/calculator-body/CalculatorBody';
import Screen from './components/calculator-screen/Screen';

function App() {
  return (
    <div className='main'>
      <Calculator>
        <Screen />
        <CalculatorBody />
      </Calculator>
    </div>
  );
}

export default App;
