import { useState, useRef } from 'react'
import { DiceRoller } from '../lib'
import type { DieType, DiceRollerHandle } from '../lib'
import SkillCheckExample from './SkillCheckExample'
import './App.css'

function App() {
  const [lastResult, setLastResult] = useState<number | null>(null)
  const [dieType, setDieType] = useState<DieType>('d6')
  const [predeterminedResult, setPredeterminedResult] = useState<number | null>(null)
  const [diceColor, setDiceColor] = useState('#4a90e2')
  const [numberColor, setNumberColor] = useState('#ffffff')
  const [showControls, setShowControls] = useState(true)
  const [showSkillCheckExample, setShowSkillCheckExample] = useState(false)
  const diceRef = useRef<DiceRollerHandle>(null)
  
  const handleRoll = () => {
    diceRef.current?.roll(predeterminedResult ?? undefined)
  }
  
  if (showSkillCheckExample) {
    return (
      <div className="App">
        <button 
          onClick={() => setShowSkillCheckExample(false)}
          style={{ marginBottom: '20px' }}
        >
          ← Back to Demo
        </button>
        <SkillCheckExample />
      </div>
    )
  }
  
  return (
    <div className="App">
      <h1>Dice Roller React Demo</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={() => setShowSkillCheckExample(true)}
          style={{
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          View Skill Check Example (Ideal API Usage)
        </button>
      </div>
      
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
      
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={handleRoll}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#4a90e2',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Roll Dice{predeterminedResult ? ` (${predeterminedResult})` : ' (Random)'}
        </button>
      </div>
      
      <DiceRoller 
        ref={diceRef}
        dieType={dieType}
        diceColor={diceColor}
        numberColor={numberColor}
        showControls={showControls}
        onRollComplete={setLastResult}
        onRollStart={() => console.log('Roll started!')}
      />
    </div>
  )
}

export default App