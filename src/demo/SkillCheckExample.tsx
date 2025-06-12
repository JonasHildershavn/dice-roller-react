import { useRef, useState } from 'react'
import { DiceRoller } from '../lib'
import type { DiceRollerHandle } from '../lib'

// Mock API call - in real app this would call your backend
async function attemptSkillCheck(skillCheckGroup: string, modifier: number) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  
  // Simulate backend returning a dice roll result
  const diceRoll = Math.floor(Math.random() * 20) + 1
  const total = diceRoll + modifier
  
  return {
    result: {
      diceRoll,
      modifier,
      total,
      success: total >= 15 // Example DC of 15
    }
  }
}

function SkillCheckExample() {
  const diceRef = useRef<DiceRollerHandle>(null)
  const [isRolling, setIsRolling] = useState(false)
  const [lastCheck, setLastCheck] = useState<{
    diceRoll: number
    modifier: number
    total: number
    success: boolean
  } | null>(null)
  
  const handleAttemptSkillCheck = async () => {
    // Get modifier from user
    const modifierStr = prompt('Enter your modifier:')
    if (!modifierStr) return
    
    const modifier = parseInt(modifierStr, 10)
    if (isNaN(modifier)) {
      alert('Please enter a valid number')
      return
    }
    
    setIsRolling(true)
    
    try {
      // Call backend API
      const response = await attemptSkillCheck('perception', modifier)
      
      // Pass the result directly to the roll method
      diceRef.current?.roll(response.result.diceRoll)
      
      // Store the full result
      setLastCheck(response.result)
    } catch (error) {
      console.error('Failed to attempt skill check:', error)
      alert('Failed to attempt skill check')
    } finally {
      setIsRolling(false)
    }
  }
  
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Skill Check Example</h2>
      <p>This example demonstrates the ideal API usage from the user feedback.</p>
      
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={handleAttemptSkillCheck}
          disabled={isRolling}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: isRolling ? '#ccc' : '#4a90e2',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: isRolling ? 'not-allowed' : 'pointer'
          }}
        >
          {isRolling ? 'Rolling...' : 'Attempt Skill Check'}
        </button>
      </div>
      
      <DiceRoller
        ref={diceRef}
        dieType="d20"
        onRollComplete={(result) => {
          if (lastCheck) {
            alert(`You rolled ${result} + ${lastCheck.modifier} = ${lastCheck.total}!\n${lastCheck.success ? 'Success!' : 'Failed!'}`)
          }
        }}
      />
      
      {lastCheck && (
        <div style={{ 
          marginTop: '20px', 
          padding: '15px', 
          backgroundColor: '#f0f0f0', 
          borderRadius: '5px' 
        }}>
          <h3>Last Skill Check Result:</h3>
          <p>Dice Roll: {lastCheck.diceRoll}</p>
          <p>Modifier: {lastCheck.modifier >= 0 ? '+' : ''}{lastCheck.modifier}</p>
          <p>Total: {lastCheck.total}</p>
          <p>Result: <strong style={{ color: lastCheck.success ? 'green' : 'red' }}>
            {lastCheck.success ? 'SUCCESS' : 'FAILED'}
          </strong></p>
        </div>
      )}
      
      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#e8f4f8', borderRadius: '5px' }}>
        <h3>Key Benefits of This API:</h3>
        <ul>
          <li>No state synchronization issues</li>
          <li>No race conditions with React rendering</li>
          <li>Clean separation: backend determines result, frontend just displays it</li>
          <li>Intuitive usage: <code>diceRef.current.roll(15)</code> rolls and shows 15</li>
        </ul>
      </div>
    </div>
  )
}

export default SkillCheckExample