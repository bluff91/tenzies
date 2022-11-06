
import { useState, useEffect } from 'react';
import './App.css';
import Die from './components/Die';
import uniqid from 'uniqid';


function App() {
  const [dice, setDice] = useState(allNewDice)
  const [isWin, setIsWin] = useState(false)
  const [rollCount, setRollCount] = useState(1)

  useEffect(() => {
     
      const allDiceHeld = dice.every((item) => item.isHeld === true)
      const winningValue = dice[4].value
      const allSameValue = dice.every((item) => item.value === winningValue)
      if (allDiceHeld && allSameValue) {
        setIsWin(true)
      }
    
  }, [dice])

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

  function holdDice(id) {
    setDice(dice.map(prevState => {
      if (prevState.id === id) {
        return {
          ...prevState,
          isHeld: !prevState.isHeld
        }
      } else {
        return prevState
      }
    }))    
  }

  function rollDice() {
    setRollCount(prevState => prevState+1)
    setDice(dice.map(prevState => {
      if (!prevState.isHeld) {
        return {
          value: Math.ceil(Math.random() * 6), 
          isHeld: false,
          id: uniqid()
        }
      } else {
        return prevState
      }
    }))
    if (isWin) {
      setIsWin(false)
      setDice(allNewDice)
      setRollCount(0)
    }
  }

  const diceElements = dice.map(item => 
                                  <Die 
                                    key = {item.id}
                                    value={item.value} 
                                    isHeld={item.isHeld} 
                                    handleClick={() =>holdDice(item.id)}
                                  />
                                )

  return (
    <main className="app">
        {isWin ? <h1 className='winning-title'>You WON in {rollCount} rolls !!!</h1> :
          <>
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
          </>
        }
        <div className='dice-container'>
          {diceElements}   
        </div>
        <p className='roll-turns'>Turns so far: {rollCount}</p>
      <button
        className='roll-dice'
        onClick={rollDice}
      >
      {isWin ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

export default App;
