import { useState } from 'react'
import { DiceRoller } from '../lib'
import type { DieType } from '../lib'
import './App.css'

function App() {
  const [lastResult, setLastResult] = useState<number | null>(null)
  const [dieType, setDieType] = useState<DieType>('d6')
  const [predeterminedResult, setPredeterminedResult] = useState<number | null>(null)
  const [diceColor, setDiceColor] = useState('#4a90e2')
  const [numberColor, setNumberColor] = useState('#ffffff')
  const [showControls, setShowControls] = useState(true)
  
  return (
    <div className="App">
      <h1>Dice Roller React Demo</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Component Props Demo</h3>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <div>
            <label>Die Type: </label>
            <select value={dieType} onChange={(e) => setDieType(e.target.value as DieType)}>
              <option value="d6">D6</option>
              <option value="d8">D8</option>
              <option value="d20">D20</option>
            </select>
          </div>
          
          <div>
            <label>Dice Color: </label>
            <input 
              type="color" 
              value={diceColor} 
              onChange={(e) => setDiceColor(e.target.value)}
            />
          </div>
          
          <div>
            <label>Number Color: </label>
            <input 
              type="color" 
              value={numberColor} 
              onChange={(e) => setNumberColor(e.target.value)}
            />
          </div>
          
          <div>
            <label>Predetermined Result: </label>
            <select 
              value={predeterminedResult ?? ''} 
              onChange={(e) => setPredeterminedResult(e.target.value ? Number(e.target.value) : null)}
            >
              <option value="">Random</option>
              {Array.from({ length: dieType === 'd6' ? 6 : dieType === 'd8' ? 8 : 20 }, (_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label>
              <input 
                type="checkbox" 
                checked={showControls} 
                onChange={(e) => setShowControls(e.target.checked)}
              />
              Show Controls
            </label>
          </div>
        </div>
        
        {lastResult && (
          <div style={{ marginTop: '10px', fontSize: '20px' }}>
            Last Roll Result: <strong>{lastResult}</strong>
          </div>
        )}
      </div>
      
      <DiceRoller 
        dieType={dieType}
        diceColor={diceColor}
        numberColor={numberColor}
        predeterminedResult={predeterminedResult}
        showControls={showControls}
        onResult={setLastResult}
        onRollStart={() => console.log('Roll started!')}
        onRollEnd={() => console.log('Roll ended!')}
      />
    </div>
  )
}

export default App