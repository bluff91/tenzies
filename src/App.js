
import { useState } from 'react';
import './App.css';
import Die from './components/Die';
import uniqid from 'uniqid';


function App() {
  const [dice, setDice] = useState(allNewDice)

  function allNewDice() {
    const dieArr = []
    for (let i=0; i<10; i++) {
      dieArr.push({value: Math.ceil(Math.random() * 6), 
                  isHeld: false,
                  id: uniqid()
                  })
    }
    return dieArr;
  }

  const diceElements = dice.map(item => <Die value={item.value} isHeld={item.isHeld}/>)

  return (
    <main className="App">
      <div className='dice-container'>
        {diceElements}
      </div>
      <button
        className='roll-dice'
        onClick={() => setDice(allNewDice)}
      >Roll</button>
      
      
    </main>
  );
}

export default App;
